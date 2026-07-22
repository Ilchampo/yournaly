import type { GoogleProfile, GoogleUserInfo, GoogleOAuthServiceArgs } from '@/lib/interfaces/auth.interface';
import type { AuthResultWithContext } from '@/lib/interfaces/organization.interface';
import type { Users, Prisma } from '@/generated/prisma';

import { findOrganizationByCodeService, getOrganizationContextService } from '@/services/organization.service';
import { generateToken, generateRefreshToken } from '@/lib/utils/jwtUtils';
import { findUserByEmailService, getUserContextService } from '@/services/user.service';
import { DEFAULT_USER_INKS, ORGANIZATION_CODE } from '@/lib/constants/defaultValues';
import { authConfig } from '@/configs/auth.config';
import { prisma } from '@/database';

interface GoogleTokenInfo {
  aud?: string;
  azp?: string;
  expires_in?: string;
  error?: string;
  error_description?: string;
}

const assertTokenAudience = async (accessToken: string): Promise<void> => {
  const tokenInfoUrl = `${authConfig.google.tokenInfoUrl}?access_token=${encodeURIComponent(accessToken)}`;
  const response = await fetch(tokenInfoUrl);

  if (!response.ok) {
    throw new Error('Invalid Google access token');
  }

  const tokenInfo = (await response.json()) as GoogleTokenInfo;

  if (tokenInfo.error) {
    throw new Error(tokenInfo.error_description ?? tokenInfo.error);
  }

  const audience = tokenInfo.aud ?? tokenInfo.azp;
  const expectedClientId = authConfig.google.clientId;

  if (tokenInfo.aud !== expectedClientId && tokenInfo.azp !== expectedClientId) {
    throw new Error(`Token audience mismatch (got ${audience ?? 'unknown'})`);
  }
};

export const verifyGoogleTokenService = async (token: string): Promise<GoogleProfile> => {
  try {
    await assertTokenAudience(token);

    const response = await fetch(`${authConfig.google.userInfoUrl}?access_token=${encodeURIComponent(token)}`);

    if (!response.ok) {
      throw new Error('Invalid Google access token');
    }

    const userData = (await response.json()) as GoogleUserInfo;

    if (!userData.id || !userData.email) {
      throw new Error('Invalid user data from Google');
    }

    return {
      id: userData.id,
      displayName: userData.name ?? '',
      name: {
        givenName: userData.given_name ?? '',
        familyName: userData.family_name ?? '',
      },
      emails: [{ value: userData.email, verified: userData.verified_email ?? false }],
      photos: [{ value: userData.picture ?? '' }],
      provider: 'google',
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Google token verification failed: ${error.message}`);
    }

    throw new Error('Google token verification failed');
  }
};

export const googleOAuthService = async (args: GoogleOAuthServiceArgs): Promise<AuthResultWithContext> => {
  const { profile, organizationCode } = args;

  const email = profile.emails[0]?.value;
  const firstName = profile.name.givenName ?? '';
  const lastName = profile.name.familyName ?? '';
  const displayName = profile.displayName ?? `${firstName} ${lastName}`.trim();
  const avatarUrl = profile.photos[0]?.value ?? null;
  const providerUserId = profile.id;

  if (!email) {
    throw new Error('Email is required from Google profile');
  }

  const resolvedOrgCode = organizationCode ?? ORGANIZATION_CODE;

  const organization = await findOrganizationByCodeService({
    organizationCode: resolvedOrgCode,
  });

  return await prisma
    .$transaction(async (tx: Prisma.TransactionClient) => {
      let user: Users;

      try {
        user = await findUserByEmailService(email);

        const existingProvider = await tx.userProviders.findFirst({
          where: {
            userId: user.id,
            provider: 'google',
          },
        });

        if (!existingProvider) {
          await tx.userProviders.create({
            data: {
              userId: user.id,
              provider: 'google',
              providerUserId,
              email,
            },
          });
        }

        const updateData: Prisma.UsersUpdateInput = {};

        if (avatarUrl && !user.avatarUrl) {
          updateData.avatarUrl = avatarUrl;
        }

        if (firstName && !user.firstName) {
          updateData.firstName = firstName;
        }

        if (lastName && !user.lastName) {
          updateData.lastName = lastName;
        }

        if (Object.keys(updateData).length > 0) {
          user = await tx.users.update({
            where: { id: user.id },
            data: updateData,
          });
        }
      } catch (error) {
        if (error instanceof Error && error.message === 'User not found') {
          user = await tx.users.create({
            data: {
              email,
              firstName,
              lastName,
              avatarUrl,
              onboardingComplete: true,
              isEmailVerified: true,
              isActive: true,
              userProviders: {
                create: {
                  provider: 'google',
                  providerUserId,
                  email,
                },
              },
              userPreferences: {
                create: {
                  defaultLanguage: 'en',
                  defaultTone: 'original',
                  defaultTargetLanguage: 'en',
                  uiTheme: 'default',
                },
              },
              userWallet: {
                create: {
                  currentInks: DEFAULT_USER_INKS,
                  totalAcquiredInks: DEFAULT_USER_INKS,
                  totalSpentInks: 0,
                },
              },
            },
          });
        } else {
          throw error;
        }
      }

      const existingOrgLink = await tx.organizationUsers.findFirst({
        where: {
          userId: user.id,
          organizationId: organization.id,
          deletedAt: null,
        },
      });

      if (!existingOrgLink) {
        await tx.organizationUsers.create({
          data: {
            userId: user.id,
            organizationId: organization.id,
            userRole: 'learner',
            isActive: true,
          },
        });
      } else if (!existingOrgLink.isActive) {
        await tx.organizationUsers.update({
          where: { id: existingOrgLink.id },
          data: { isActive: true },
        });
      }

      return user;
    })
    .then(async (user: Users) => {
      const [organizationContext, userContext] = await Promise.all([
        getOrganizationContextService({ organizationId: organization.id }),
        getUserContextService({ userId: user.id, organizationId: organization.id }),
      ]);

      const tokenPayload = {
        userId: user.id,
        email: user.email,
        name: displayName ?? `${user.firstName} ${user.lastName}`.trim(),
      };

      const token = generateToken(tokenPayload);
      const refreshToken = generateRefreshToken(tokenPayload);

      return {
        token,
        refreshToken,
        organization: organizationContext,
        user: userContext,
      };
    });
};

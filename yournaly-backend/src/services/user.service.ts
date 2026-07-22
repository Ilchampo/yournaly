import type { Users, UserWallets, Prisma } from '@/generated/prisma';
import type {
  UpdateUserInkBalanceArgs,
  DeductUserInksArgs,
  CreateUserWalletArgs,
  UpdateUserPreferencesArgs,
  UpdateUserPreferencesResponse,
} from '@/lib/interfaces/user.interface';
import type { UserContextResponse, GetUserContextArgs } from '@/lib/interfaces/organization.interface';
import type { OrganizationUserRole, JournalLanguage, JournalTone, UITheme } from '@/lib/_types';

import { DEFAULT_USER_PREFERENCES } from '@/lib/constants/defaultValues';
import { prisma } from '@/database';

export const findUserByEmailService = async (email: string): Promise<Users> => {
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const createUserWalletService = async (args: CreateUserWalletArgs): Promise<UserWallets> => {
  const { userId, initialInks = 0 } = args;

  return prisma.userWallets.create({
    data: {
      userId,
      currentInks: initialInks,
      totalAcquiredInks: initialInks,
      totalSpentInks: 0,
    },
  });
};

export const updateUserInkBalanceService = async (args: UpdateUserInkBalanceArgs): Promise<UserWallets> => {
  const { userId, inkAmount } = args;

  let wallet = await prisma.userWallets.findUnique({
    where: { userId },
  });

  if (!wallet) {
    wallet = await createUserWalletService({ userId, initialInks: 0 });
  }

  const updateData: Prisma.UserWalletsUpdateInput = {
    currentInks: {
      increment: inkAmount,
    },
  };

  if (inkAmount > 0) {
    updateData.totalAcquiredInks = {
      increment: inkAmount,
    };
  } else {
    updateData.totalSpentInks = {
      increment: Math.abs(inkAmount),
    };
  }

  const updatedWallet = await prisma.userWallets.update({
    where: { userId },
    data: updateData,
  });

  if (!updatedWallet) {
    throw new Error('User wallet not found');
  }

  return updatedWallet;
};

/**
 * Atomically deduct inks when the wallet has enough balance.
 * Throws if the wallet is missing or balance is insufficient.
 */
export const deductUserInksService = async (args: DeductUserInksArgs): Promise<UserWallets> => {
  const { userId, inkAmount } = args;

  if (inkAmount <= 0) {
    throw new Error('Ink amount to deduct must be positive');
  }

  const result = await prisma.userWallets.updateMany({
    where: {
      userId,
      currentInks: { gte: inkAmount },
      deletedAt: null,
    },
    data: {
      currentInks: { decrement: inkAmount },
      totalSpentInks: { increment: inkAmount },
    },
  });

  if (result.count === 0) {
    const wallet = await prisma.userWallets.findUnique({ where: { userId } });

    if (!wallet) {
      throw new Error('User wallet not found');
    }

    throw new Error(`Insufficient inks: required ${inkAmount}, available ${wallet.currentInks}`);
  }

  return prisma.userWallets.findUniqueOrThrow({ where: { userId } });
};

/**
 * Refund previously deducted inks (e.g. after a failed AI review).
 */
export const refundUserInksService = async (args: DeductUserInksArgs): Promise<UserWallets> => {
  const { userId, inkAmount } = args;

  if (inkAmount <= 0) {
    throw new Error('Ink amount to refund must be positive');
  }

  const wallet = await prisma.userWallets.findUnique({ where: { userId } });

  if (!wallet) {
    throw new Error('User wallet not found');
  }

  return prisma.userWallets.update({
    where: { userId },
    data: {
      currentInks: { increment: inkAmount },
      totalSpentInks: { decrement: Math.min(inkAmount, wallet.totalSpentInks) },
    },
  });
};

export const updateUserPreferencesService = async (
  args: UpdateUserPreferencesArgs & { userId: string }
): Promise<UpdateUserPreferencesResponse> => {
  const { userId, organizationId, defaultLanguage, defaultTone, defaultTarget, theme } = args;

  const organizationUser = await prisma.organizationUsers.findFirst({
    where: {
      userId,
      organizationId,
      isActive: true,
      deletedAt: null,
    },
  });

  if (!organizationUser) {
    throw new Error('User is not a member of this organization');
  }

  const preferences = await prisma.userPreferences.upsert({
    where: { userId },
    update: {
      defaultLanguage,
      defaultTone,
      defaultTargetLanguage: defaultTarget,
      uiTheme: theme,
    },
    create: {
      userId,
      defaultLanguage,
      defaultTone,
      defaultTargetLanguage: defaultTarget,
      uiTheme: theme,
    },
  });

  return {
    defaultLanguage: preferences.defaultLanguage as JournalLanguage,
    defaultTone: preferences.defaultTone as JournalTone,
    defaultTarget: preferences.defaultTargetLanguage as JournalLanguage,
    theme: preferences.uiTheme as UITheme,
  };
};

export const getUserContextService = async (args: GetUserContextArgs): Promise<UserContextResponse> => {
  const { userId, organizationId } = args;

  const user = await prisma.users.findUnique({
    where: { id: userId },
    include: {
      userWallet: true,
      userPreferences: true,
      organizationUsers: {
        where: {
          organizationId,
          isActive: true,
          deletedAt: null,
        },
        select: {
          userRole: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const organizationUser = user.organizationUsers[0];

  if (!organizationUser) {
    throw new Error('User is not a member of this organization');
  }

  let wallet = user.userWallet;

  if (!wallet) {
    wallet = await createUserWalletService({ userId, initialInks: 0 });
  }

  let preferences = user.userPreferences;

  if (!preferences) {
    preferences = await prisma.userPreferences.create({
      data: {
        userId,
        defaultLanguage: DEFAULT_USER_PREFERENCES.defaultLanguage,
        defaultTone: DEFAULT_USER_PREFERENCES.defaultTone,
        defaultTargetLanguage: DEFAULT_USER_PREFERENCES.defaultTargetLanguage,
        uiTheme: DEFAULT_USER_PREFERENCES.uiTheme,
      },
    });
  }

  const response: UserContextResponse = {
    id: user.id,
    role: organizationUser.userRole as OrganizationUserRole,
    firstName: user.firstName,
    lastName: user.lastName,
    onboardingComplete: user.onboardingComplete,
    inksBalance: wallet.currentInks,
    preferences: {
      defaultLanguage: preferences.defaultLanguage,
      defaultTone: preferences.defaultTone,
      defaultTarget: preferences.defaultTargetLanguage,
      theme: preferences.uiTheme,
    },
  };

  if (user.avatarUrl) {
    response.avatarUrl = user.avatarUrl;
  }

  return response;
};

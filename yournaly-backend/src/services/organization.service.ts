import type { Organization } from '@/generated/prisma';
import type {
  FindOrganizationByCodeArgs,
  OrganizationContextResponse,
  GetOrganizationContextArgs,
} from '@/lib/interfaces/organization.interface';
import type { OrganizationBusinessPlan } from '@/lib/_types';

import { prisma } from '@/database';

export const findOrganizationByCodeService = async (args: FindOrganizationByCodeArgs): Promise<Organization> => {
  const { organizationCode } = args;

  const organization = await prisma.organization.findFirst({
    where: {
      organizationCode,
      isActive: true,
      deletedAt: null,
    },
  });

  if (!organization) {
    throw new Error(`Organization with code '${organizationCode}' not found or inactive`);
  }

  return organization;
};

export const getOrganizationContextService = async (
  args: GetOrganizationContextArgs
): Promise<OrganizationContextResponse> => {
  const { organizationId } = args;

  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
    include: {
      organizationSettings: true,
      organizationTones: {
        where: { deletedAt: null },
        select: { toneCode: true },
      },
      organizationLanguages: {
        where: { deletedAt: null },
        select: { languageCode: true },
      },
    },
  });

  if (!organization) {
    throw new Error('Organization not found');
  }

  if (!organization.organizationSettings) {
    throw new Error('Organization settings not found');
  }

  const response: OrganizationContextResponse = {
    id: organization.id,
    name: organization.name,
    contactEmail: organization.contactEmail,
    businessPlan: organization.organizationSettings.businessPlan as OrganizationBusinessPlan,
    maxCharacters: organization.organizationSettings.maxCharacters,
    tones: organization.organizationTones.map(tone => tone.toneCode),
    languages: organization.organizationLanguages.map(lang => lang.languageCode),
  };

  if (organization.logoUrl) {
    response.logoUrl = organization.logoUrl;
  }

  return response;
};

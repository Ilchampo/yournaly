import type { OrganizationBusinessPlan, OrganizationUserRole } from '@/lib/_types';

export interface FindOrganizationByCodeArgs {
  organizationCode: string;
}

export interface OrganizationContextResponse {
  id: string;
  name: string;
  contactEmail: string;
  logoUrl?: string;
  businessPlan: OrganizationBusinessPlan;
  maxCharacters: number;
  tones: string[];
  languages: string[];
}

export interface UserContextResponse {
  id: string;
  role: OrganizationUserRole;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  onboardingComplete: boolean;
  inksBalance: number;
  preferences: {
    defaultLanguage: string;
    defaultTone: string;
    defaultTarget: string;
    theme: string;
  };
}

export interface AuthResultWithContext {
  token: string;
  refreshToken: string;
  organization: OrganizationContextResponse;
  user: UserContextResponse;
}

export interface GetOrganizationContextArgs {
  organizationId: string;
}

export interface GetUserContextArgs {
  userId: string;
  organizationId: string;
}

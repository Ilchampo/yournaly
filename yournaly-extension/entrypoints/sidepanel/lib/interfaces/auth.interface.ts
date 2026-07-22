import type { Organization } from '@interfaces/organization.interface';
import type { Response } from '@interfaces/response.interface';
import type { User } from '@interfaces/user.interface';

export interface AuthResponse extends Response {
	data: {
		user: User;
		token: string;
		refreshToken: string;
		organization: Organization;
	};
}

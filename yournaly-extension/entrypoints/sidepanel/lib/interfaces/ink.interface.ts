import type { Response } from '@interfaces/response.interface';

export interface InkPackage {
	id: string;
	stripeProductId: string;
	title: string;
	description: string;
	inksToAdd: number;
	price: number;
	currency: string;
	isRecommended: boolean;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface GetInkPackagesServiceResponse extends Response {
	packages: InkPackage[];
}

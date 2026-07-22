export interface Package {
	id: string;
	stripeId: string;
	name: string;
	description: string;
	price: number;
	inks: number;
	recommended: boolean;
	createdAt: Date;
	updatedAt: Date;
}

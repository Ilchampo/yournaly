import type { GetInkPackagesResponse } from '@/lib/interfaces/inks.interface';

import { prisma } from '@/database';

export const getInkPackagesService = async (): Promise<GetInkPackagesResponse> => {
  const packages = await prisma.inksPackages.findMany({
    where: {
      isActive: true,
      deletedAt: null,
    },
    orderBy: { price: 'asc' },
  });

  return {
    packages: packages.map(pkg => ({
      id: pkg.id,
      stripeProductId: pkg.stripeProductId,
      title: pkg.title,
      description: pkg.description,
      inksToAdd: pkg.inksToAdd,
      price: Number(pkg.price),
      currency: pkg.currency,
      isRecommended: pkg.isRecommended,
      isActive: pkg.isActive,
      createdAt: pkg.createdAt,
      updatedAt: pkg.updatedAt,
    })),
  };
};

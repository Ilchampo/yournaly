import { MetadataRoute } from 'next';

import { SITE_URL } from '@constants/site.constant';

export default function sitemap(): MetadataRoute.Sitemap {
	const currentDate = new Date().toISOString();

	return [
		{
			url: SITE_URL,
			lastModified: currentDate,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${SITE_URL}/privacy`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 0.5,
		},
		{
			url: `${SITE_URL}/terms`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 0.5,
		},
	];
}

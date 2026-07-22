import React from 'react';

import { SEGMENT_CONFIG } from '@lib/constants/breadcrumb.constant';
import { formatSegment } from '@lib/utils/string.utils';
import { FileTextIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumbs: React.FC = () => {
	const { t } = useTranslation();
	const location = useLocation();

	const isIdPath = (path: string) => path.includes('/journals/');

	const crumbs = useMemo(() => {
		const segments = location.pathname.replace(/^\//, '').split('/').filter(Boolean);
		const allSegments = segments[0] === 'home' ? segments : ['home', ...segments];

		return allSegments.map((segment, idx) => {
			const path = idx === 0 ? '/home' : `/${allSegments.slice(1, idx + 1).join('/')}`;

			const config = SEGMENT_CONFIG[segment] ?? {
				label: isIdPath(path) ? t('components.navbar.yournalSummary') : formatSegment(segment),
				Icon: FileTextIcon,
			};

			const label = t(config.label);

			return {
				...config,
				label,
				path,
			};
		});
	}, [location.pathname, t]);

	if (location.pathname.startsWith('/auth')) {
		return null;
	}

	return (
		<nav
			aria-label="Breadcrumb"
			className="border-x border-b border-primary-700 bg-surface-50/50 px-4 py-2 lg:px-8 font-medium"
		>
			<ol className="flex items-center text-sm space-x-1">
				{crumbs.map((crumb, idx) => {
					const { Icon, label, path } = crumb;

					const isLast = idx === crumbs.length - 1;

					return (
						<li key={path} className="flex items-center">
							{!isLast ? (
								<Link
									to={path}
									className="flex items-center hover:underline focus:outline-none focus:ring-2 focus:ring-primary-700/50 rounded-sm"
								>
									<Icon className="w-4 h-4 mr-1" />
									{label}
								</Link>
							) : (
								<span className="flex items-center" aria-current="page">
									<Icon className="w-4 h-4 mr-1" />
									{label}
								</span>
							)}
							{idx < crumbs.length - 1 && <span className="mx-1 select-none">/</span>}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default BreadCrumbs;

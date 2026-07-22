import React from 'react';

import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
	const { t } = useTranslation();

	return (
		<footer className="p-4 text-center text-xs border-t border-primary-700 relative z-10 mt-auto">
			<p>
				{t('components.footer.description')}{' '}
				<a href="https://goastrobit.com" target="_blank" rel="noopener noreferrer" className="text-primary-500">
					Astrobit 🚀
				</a>
			</p>
		</footer>
	);
};

export default Footer;

import React from 'react';

const Footer: React.FC = () => {
	return (
		<footer className="relative bg-surface-100 border-t border-primary-700">
			<div className="container mx-auto px-4 py-8">
				<p className="text-center text-sm">&copy; {new Date().getFullYear()} Yournaly. All rights reserved.</p>
				<p className="text-center text-xs">
					Developed with ❤️ by{' '}
					<a href="https://www.goastrobit.com" target="_blank" rel="noopener noreferrer">
						Astrobit 🚀
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;

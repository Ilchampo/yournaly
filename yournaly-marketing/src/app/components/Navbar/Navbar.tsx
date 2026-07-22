'use client';

import React from 'react';

import { useIsMobile } from '@hooks/useIsMobile';
import { ASSETS } from '@lib/assets';
import { MenuSquareIcon } from 'lucide-react';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const { isMobile } = useIsMobile();

	return (
		<header className="fixed top-0 left-0 right-0 z-20">
			<div className="shadow-md p-4 bg-surface-100 border border-primary-700 flex justify-between items-center">
				<Link href="/" className="flex items-center" aria-label="Yournaly home">
					<Image
						src={isMobile ? ASSETS.ICON_SMALL : ASSETS.ICON_LARGE}
						alt="Yournaly Logo"
						width={32}
						height={32}
					/>
					<span className="text-2xl text-primary-700 capitalize ml-2">Yournaly</span>
				</Link>
				<div className="hidden md:flex items-center gap-4">
					<Link href="/">Home</Link>
					<Link href="/privacy">Privacy Policy</Link>
					<Link href="/terms">Terms of Service</Link>
				</div>
				<button
					className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-700"
					onClick={() => setMenuOpen(v => !v)}
					aria-label="Open menu"
				>
					<MenuSquareIcon className="w-7 h-7 text-primary-700" />
				</button>
			</div>
			{menuOpen && (
				<div className="md:hidden absolute top-full left-0 w-full bg-surface-100 border-b border-primary-700 shadow-lg animate-fade-in z-30">
					<div className="flex flex-col py-2 px-4 gap-2">
						<Link href="/" onClick={() => setMenuOpen(false)} className="py-2">
							Home
						</Link>
						<Link href="/privacy" onClick={() => setMenuOpen(false)} className="py-2">
							Privacy Policy
						</Link>
						<Link href="/terms" onClick={() => setMenuOpen(false)} className="py-2">
							Terms of Service
						</Link>
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;

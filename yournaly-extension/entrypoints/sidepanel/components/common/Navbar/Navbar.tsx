import React from 'react';

import type { RefObject } from 'react';

import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { useOrganizationInfo } from '@stores/organization.store';
import { useUserStore } from '@stores/user.store';
import {
	AlertTriangleIcon,
	BookIcon,
	ChevronDownIcon,
	HomeIcon,
	InfoIcon,
	LogOutIcon,
	SettingsIcon,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Avatar from '@components/common/Avatar/Avatar';
import BreadCrumbs from '@components/common/BreadCrumbs/BreadCrumbs';
import InkBalance from '@components/common/InkBalance/InkBalance';
import Modal from '@components/common/Modal/Modal';

const Navbar: React.FC = () => {
	const { user, logout } = useUserStore();
	const { name } = useOrganizationInfo();
	const { t } = useTranslation();

	const [showDropdown, setShowDropdown] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);

	const dropdownRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(dropdownRef as RefObject<HTMLElement>, () => setShowDropdown(false));

	const handleConfirmLogout = () => {
		logout();
	};

	return (
		<>
			<header className="relative z-20">
				<div className="shadow-md  p-4 bg-surface-100 border border-primary-700 flex justify-between items-center">
					<div className="flex items-center">
						<h1 className="text-2xl text-primary-700 capitalize">{name}</h1>
					</div>
					<div className="flex items-center space-x-3">
						<InkBalance />
						<div className="relative" ref={dropdownRef}>
							<button
								onClick={() => setShowDropdown(!showDropdown)}
								className="text-primary-700 opacity-80 hover:opacity-100 transition-opacity flex items-center"
							>
								<Avatar
									url={user?.avatarUrl ?? undefined}
									name={user ? `${user.firstName} ${user.lastName}` : undefined}
									size="sm"
								/>
								<ChevronDownIcon size={16} className="ml-1" />
							</button>
							{showDropdown && (
								<div className="absolute right-0 mt-2 w-48 bg-primary-50 border border-primary-700 rounded-lg shadow-lg py-1 z-10">
									<Link to="/home">
										<button className="flex items-center w-full px-4 py-2 text-sm  hover:bg-primary-100">
											<HomeIcon size={16} className="mr-2" />
											{t('components.navbar.home')}
										</button>
									</Link>
									<Link to="/journals">
										<button className="flex items-center w-full px-4 py-2 text-sm  hover:bg-primary-100">
											<BookIcon size={16} className="mr-2" />
											{t('components.navbar.myYournals')}
										</button>
									</Link>
									<Link to="/preferences">
										<button className="flex items-center w-full px-4 py-2 text-sm  hover:bg-primary-100">
											<SettingsIcon size={16} className="mr-2" />
											{t('components.navbar.preferences')}
										</button>
									</Link>
									<Link to="/about">
										<button className="flex items-center w-full px-4 py-2 text-sm  hover:bg-primary-100">
											<InfoIcon size={16} className="mr-2" />
											{t('components.navbar.about')}
										</button>
									</Link>
									<button
										onClick={() => setShowModal(true)}
										className="flex items-center w-full px-4 py-2 text-sm  hover:bg-primary-100"
										aria-label="Logout"
										type="button"
									>
										<LogOutIcon size={16} className="mr-2" />
										{t('components.navbar.logOut')}
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
				<BreadCrumbs />
			</header>
			<Modal title={t('components.logOut.title')} isOpen={showModal} onClose={() => setShowModal(false)}>
				<div className="space-y-5">
					<div className="text-center">
						<div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
							<AlertTriangleIcon className="h-6 w-6 text-primary-700" />
						</div>
						<h2 className="text-xl font-semibold  mb-2">{t('components.logOut.title')}</h2>
						<p className=" text-sm">{t('components.logOut.description')}</p>
					</div>
					<div className="flex space-x-3">
						<ActionButton onClick={handleConfirmLogout} ariaLabel="Confirm Logout" primary>
							{t('common.actions.confirm')}
						</ActionButton>
						<ActionButton onClick={() => setShowModal(false)} ariaLabel="Cancel Logout">
							{t('common.actions.cancel')}
						</ActionButton>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Navbar;

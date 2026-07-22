import React from 'react';

import type { UserPreferences as UserPreferencesType } from '@interfaces/user.interface';
import type { JournalTone, Language, UITheme } from '@lib/types';

import { useDropdown } from '@hooks/useDropdown';
import { useReactiveTranslations } from '@lib/hooks/useLanguageSync';
import { useOrganizationLanguages, useOrganizationTones } from '@stores/organization.store';
import { useUserStore } from '@stores/user.store';
import { ChevronDownIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UserPreferencesProps {
	onPreferencesChange: (preferences: UserPreferencesType) => void;
}

const UserPreferences: React.FC<UserPreferencesProps> = props => {
	const { onPreferencesChange } = props;
	const { t } = useTranslation();
	const { getLanguageName, getToneName } = useReactiveTranslations();

	const { user } = useUserStore();
	const availableLanguages = useOrganizationLanguages();
	const availableTones = useOrganizationTones();

	const [defaultLanguage, setDefaultLanguage] = useState<Language>(user?.preferences?.defaultLanguage ?? 'en');
	const [defaultTone, setDefaultTone] = useState<JournalTone>(user?.preferences?.defaultTone ?? 'original');
	const [defaultTarget, setDefaultTarget] = useState<Language>(user?.preferences?.defaultTarget ?? 'en');
	const [theme] = useState<UITheme>(user?.preferences?.theme ?? 'default');

	const {
		isOpen: isLanguageOpen,
		dropdownRef: languageDropdownRef,
		buttonRef: languageButtonRef,
		optionRefs: languageOptionRefs,
		handleToggle: handleLanguageToggle,
		handleKeyDown: handleLanguageDropdownKeyDown,
		closeDropdown: closeLanguageDropdown,
	} = useDropdown({});

	const {
		isOpen: isToneOpen,
		dropdownRef: toneDropdownRef,
		buttonRef: toneButtonRef,
		optionRefs: toneOptionRefs,
		handleToggle: handleToneToggle,
		handleKeyDown: handleToneDropdownKeyDown,
		closeDropdown: closeToneDropdown,
	} = useDropdown({});

	const {
		isOpen: isTargetOpen,
		dropdownRef: targetDropdownRef,
		buttonRef: targetButtonRef,
		optionRefs: targetOptionRefs,
		handleToggle: handleTargetToggle,
		handleKeyDown: handleTargetDropdownKeyDown,
		closeDropdown: closeTargetDropdown,
	} = useDropdown({});

	useEffect(() => {
		languageOptionRefs.current = languageOptionRefs.current.slice(0, availableLanguages.length);
	}, [languageOptionRefs, availableLanguages.length]);

	useEffect(() => {
		toneOptionRefs.current = toneOptionRefs.current.slice(0, availableTones.length);
	}, [toneOptionRefs, availableTones.length]);

	useEffect(() => {
		targetOptionRefs.current = targetOptionRefs.current.slice(0, availableLanguages.length);
	}, [targetOptionRefs, availableLanguages.length]);

	useEffect(() => {
		onPreferencesChange({
			defaultLanguage,
			defaultTone,
			defaultTarget,
			theme,
		});
	}, [defaultLanguage, defaultTone, defaultTarget, theme, onPreferencesChange]);

	const handleLanguageSelect = useCallback(
		(language: Language) => {
			if (availableLanguages.includes(language)) {
				setDefaultLanguage(language);
				closeLanguageDropdown();
			}
		},
		[availableLanguages, closeLanguageDropdown],
	);

	const handleToneSelect = useCallback(
		(tone: JournalTone) => {
			if (availableTones.includes(tone)) {
				setDefaultTone(tone);
				closeToneDropdown();
			}
		},
		[availableTones, closeToneDropdown],
	);

	const handleTargetSelect = useCallback(
		(language: Language) => {
			if (availableLanguages.includes(language)) {
				setDefaultTarget(language);
				closeTargetDropdown();
			}
		},
		[availableLanguages, closeTargetDropdown],
	);

	const handleLanguageOptionKeyDown = useCallback(
		(e: React.KeyboardEvent, index: number) => {
			if (e.key === 'Enter' || e.key === ' ') {
				if (availableLanguages[index]) {
					handleLanguageSelect(availableLanguages[index]);
					e.preventDefault();
				}
			} else {
				handleLanguageDropdownKeyDown(e, index);
			}
		},
		[availableLanguages, handleLanguageSelect, handleLanguageDropdownKeyDown],
	);

	const handleToneOptionKeyDown = useCallback(
		(e: React.KeyboardEvent, index: number) => {
			if (e.key === 'Enter' || e.key === ' ') {
				if (availableTones[index]) {
					handleToneSelect(availableTones[index]);
					e.preventDefault();
				}
			} else {
				handleToneDropdownKeyDown(e, index);
			}
		},
		[availableTones, handleToneSelect, handleToneDropdownKeyDown],
	);

	const handleTargetOptionKeyDown = useCallback(
		(e: React.KeyboardEvent, index: number) => {
			if (e.key === 'Enter' || e.key === ' ') {
				if (availableLanguages[index]) {
					handleTargetSelect(availableLanguages[index]);
					e.preventDefault();
				}
			} else {
				handleTargetDropdownKeyDown(e, index);
			}
		},
		[availableLanguages, handleTargetSelect, handleTargetDropdownKeyDown],
	);

	const selectedLanguageIndex = availableLanguages.findIndex(lang => lang === defaultLanguage);
	const selectedToneIndex = availableTones.findIndex(tone => tone === defaultTone);
	const selectedTargetIndex = availableLanguages.findIndex(lang => lang === defaultTarget);

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="w-full">
					<label id="language-label" className="block text-sm font-medium mb-3">
						{t('common.params.language')}
					</label>
					<div className="relative" ref={languageDropdownRef}>
						<button
							ref={languageButtonRef}
							className="w-full flex items-center justify-between p-2.5 border rounded-lg bg-primary-50/50 transition duration-150 border-primary-700 hover:bg-primary-100 focus:border-primary-900"
							onClick={handleLanguageToggle}
							onKeyDown={e => handleLanguageDropdownKeyDown(e, -1)}
							aria-haspopup="listbox"
							aria-expanded={isLanguageOpen}
							aria-labelledby="language-label"
							aria-controls="language-options"
						>
							<span>{getLanguageName(defaultLanguage)}</span>
							<ChevronDownIcon size={18} />
						</button>

						{isLanguageOpen && (
							<ul
								id="language-options"
								className="absolute z-10 w-full mt-1 bg-primary-50 border border-primary-700 rounded-lg shadow-lg max-h-32 overflow-y-auto"
								role="listbox"
								aria-labelledby="language-label"
								aria-activedescendant={
									selectedLanguageIndex >= 0 ? `language-option-${selectedLanguageIndex}` : undefined
								}
							>
								{availableLanguages.map((language, index) => (
									<li
										ref={el => {
											languageOptionRefs.current[index] = el;
										}}
										id={`language-option-${index}`}
										key={language}
										className={`p-2.5 hover:bg-primary-100 cursor-pointer ${defaultLanguage === language ? 'bg-primary-100 text-primary-700' : ''}`}
										onClick={() => handleLanguageSelect(language)}
										onKeyDown={e => handleLanguageOptionKeyDown(e, index)}
										role="option"
										aria-selected={defaultLanguage === language}
										tabIndex={0}
									>
										{getLanguageName(language)}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>

				<div className="w-full">
					<label id="target-label" className="block text-sm font-medium mb-3">
						{t('common.params.targetLanguage')}
					</label>
					<div className="relative" ref={targetDropdownRef}>
						<button
							ref={targetButtonRef}
							className="w-full flex items-center justify-between p-2.5 border rounded-lg bg-primary-50/50 transition duration-150 border-primary-700 hover:bg-primary-100 focus:border-primary-900"
							onClick={handleTargetToggle}
							onKeyDown={e => handleTargetDropdownKeyDown(e, -1)}
							aria-haspopup="listbox"
							aria-expanded={isTargetOpen}
							aria-labelledby="target-label"
							aria-controls="target-options"
						>
							<span>{getLanguageName(defaultTarget)}</span>
							<ChevronDownIcon size={18} />
						</button>
						{isTargetOpen && (
							<ul
								id="target-options"
								className="absolute z-10 w-full mt-1 bg-primary-50 border border-primary-700 rounded-lg shadow-lg max-h-32 overflow-y-auto"
								role="listbox"
								aria-labelledby="target-label"
								aria-activedescendant={
									selectedTargetIndex >= 0 ? `target-option-${selectedTargetIndex}` : undefined
								}
							>
								{availableLanguages.map((language, index) => (
									<li
										ref={el => {
											targetOptionRefs.current[index] = el;
										}}
										id={`target-option-${index}`}
										key={language}
										className={`p-2.5 hover:bg-primary-100 cursor-pointer ${defaultTarget === language ? 'bg-primary-100 text-primary-700' : ''}`}
										onClick={() => handleTargetSelect(language)}
										onKeyDown={e => handleTargetOptionKeyDown(e, index)}
										role="option"
										aria-selected={defaultTarget === language}
										tabIndex={0}
									>
										{getLanguageName(language)}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>

			<div className="w-full">
				<label id="tone-label" className="block text-sm font-medium mb-3">
					{t('common.params.tone')}
				</label>
				<div className="relative" ref={toneDropdownRef}>
					<button
						ref={toneButtonRef}
						className="w-full flex items-center justify-between p-2.5 border rounded-lg bg-primary-50/50 transition duration-150 border-primary-700 hover:bg-primary-100 focus:border-primary-900"
						onClick={handleToneToggle}
						onKeyDown={e => handleToneDropdownKeyDown(e, -1)}
						aria-haspopup="listbox"
						aria-expanded={isToneOpen}
						aria-labelledby="tone-label"
						aria-controls="tone-options"
					>
						<span>{getToneName(defaultTone)}</span>
						<ChevronDownIcon size={18} />
					</button>
					{isToneOpen && (
						<ul
							id="tone-options"
							className="absolute z-10 w-full mt-1 bg-primary-50 border border-primary-700 rounded-lg shadow-lg max-h-32 overflow-y-auto"
							role="listbox"
							aria-labelledby="tone-label"
							aria-activedescendant={
								selectedToneIndex >= 0 ? `tone-option-${selectedToneIndex}` : undefined
							}
						>
							{availableTones.map((tone, index) => (
								<li
									ref={el => {
										toneOptionRefs.current[index] = el;
									}}
									id={`tone-option-${index}`}
									key={tone}
									className={`p-2.5 hover:bg-primary-100 cursor-pointer ${defaultTone === tone ? 'bg-primary-100 text-primary-700' : ''}`}
									onClick={() => handleToneSelect(tone)}
									onKeyDown={e => handleToneOptionKeyDown(e, index)}
									role="option"
									aria-selected={defaultTone === tone}
									tabIndex={0}
								>
									{getToneName(tone)}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			<div className="w-full">
				<label className="block text-sm font-medium mb-3">{t('common.params.theme')}</label>
				<div className="relative">
					<button
						className="w-full flex items-center justify-between p-2.5 border rounded-lg bg-primary-50/50 transition duration-150 border-primary-700 opacity-50 cursor-not-allowed"
						disabled
						aria-disabled="true"
					>
						<span>{t('constants.themes.default')}</span>
						<ChevronDownIcon size={18} />
					</button>
				</div>
				<p className="text-xs text-primary-600 mt-1 italic">{t('pages.preferencesPage.guides.themeSoon')}</p>
			</div>
		</div>
	);
};

export default UserPreferences;

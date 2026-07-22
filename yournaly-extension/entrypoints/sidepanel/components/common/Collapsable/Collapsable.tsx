import React from 'react';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CollapsableProps {
	title: string;
	defaultOpen?: boolean;
	children: React.ReactNode;
}

const Collapsable: React.FC<CollapsableProps> = props => {
	const { title, defaultOpen = false, children } = props;

	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		setIsOpen(defaultOpen);
	}, [defaultOpen]);

	return (
		<div className="p-3 bg-surface-50 rounded-lg border border-primary-700">
			<button
				className="flex items-center justify-between w-full text-sm font-medium text-amber-700"
				onClick={() => setIsOpen(!isOpen)}
				type="button"
				aria-label={`Toggle ${title}`}
				aria-expanded={isOpen}
				aria-controls={`collapsable-${title}`}
			>
				<span>{title}</span>
				{isOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
			</button>
			{isOpen && <div className="mt-2">{children}</div>}
		</div>
	);
};

export default Collapsable;

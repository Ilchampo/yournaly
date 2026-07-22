export const cn = (...classes: (string | undefined | null | false)[]): string => classes.filter(Boolean).join(' ');

export const formatSegment = (segment: string): string =>
	segment
		.split('-')
		.map(part => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');

export const formatDateToReadable = (date: string): string => {
	try {
		const today = new Date();
		const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
		const dateObj = new Date(date);

		if (dateObj.toDateString() === today.toDateString()) {
			return `common.dates.today, ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
		}

		if (dateObj.toDateString() === yesterday.toDateString()) {
			return 'common.dates.yesterday';
		}

		const diffTime = Math.abs(today.getTime() - dateObj.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		return `${diffDays} common.dates.daysAgo`;
	} catch (error) {
		console.error('Error formatting date to readable:', error);
		return date;
	}
};

export const wordCount = (text: string): number => text.split(/\s+/).filter(Boolean).length;

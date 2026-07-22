import { useCallback, useEffect, useRef, useState } from 'react';

export const useDebouncedValue = <T>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};

export const useDebouncedCallback = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
	const timeoutRef = useRef<NodeJS.Timeout>(null);

	const debouncedCallback = useCallback(
		(...args: T) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay],
	);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return debouncedCallback;
};

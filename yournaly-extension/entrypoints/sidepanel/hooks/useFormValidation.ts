import { useCallback, useState } from 'react';

interface ValidationRule {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	pattern?: RegExp;
	custom?: (value: string) => string | null;
}

interface ValidationRules {
	[key: string]: ValidationRule;
}

interface ValidationErrors {
	[key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
	const [errors, setErrors] = useState<ValidationErrors>({});

	const validateField = useCallback(
		(name: string, value: string): string | null => {
			const rule = rules[name];

			if (!rule) {
				return null;
			}

			if (rule.required && (!value || value.trim() === '')) {
				return 'This field is required';
			}

			if (rule.minLength && value.length < rule.minLength) {
				return `Minimum length is ${rule.minLength} characters`;
			}

			if (rule.maxLength && value.length > rule.maxLength) {
				return `Maximum length is ${rule.maxLength} characters`;
			}

			if (rule.pattern && !rule.pattern.test(value)) {
				return 'Invalid format';
			}

			if (rule.custom) {
				return rule.custom(value);
			}

			return null;
		},
		[rules],
	);

	const validateForm = useCallback(
		(values: Record<string, string>): boolean => {
			const newErrors: ValidationErrors = {};

			let isValid = true;

			Object.keys(rules).forEach(fieldName => {
				const error = validateField(fieldName, values[fieldName] ?? '');

				if (error) {
					newErrors[fieldName] = error;
					isValid = false;
				}
			});

			setErrors(newErrors);

			return isValid;
		},
		[rules, validateField],
	);

	const setFieldError = useCallback((fieldName: string, error: string | null) => {
		setErrors(prev => {
			const newErrors = { ...prev };

			if (error) {
				newErrors[fieldName] = error;
			} else {
				delete newErrors[fieldName];
			}

			return newErrors;
		});
	}, []);

	const clearErrors = useCallback(() => {
		setErrors({});
	}, []);

	return {
		errors,
		validateField,
		validateForm,
		setFieldError,
		clearErrors,
	};
};

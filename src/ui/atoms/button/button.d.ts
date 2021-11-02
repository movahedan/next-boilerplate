import type { ReactNode, ButtonHTMLAttributes } from 'react';

type OriginalButtonProps = Partial<ButtonHTMLAttributes<HTMLButtonElement>>;

export interface GButtonProps {
	type?: OriginalButtonProps['type'];
	role?: OriginalButtonProps['role'];
	'data-testid'?: string;
	'aria-label'?: string;

	size?: 'small' | 'medium' | 'large';
	iconStart?: ReactNode;
	iconEnd?: ReactNode;
	disabled?: boolean;
	loading?: boolean;

	onClick?: OriginalButtonProps['onClick'];

	style?: OriginalButtonProps['style'];
	className?: OriginalButtonProps['className'];
}

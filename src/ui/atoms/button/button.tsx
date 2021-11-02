import styles from './button.module.scss';

import type { ButtonProps } from './button.d';
import type { FC } from 'react';

export const Button: FC<ButtonProps> = ({
	type = 'button',
	role = 'button',
	'data-testid': dataTestId = 'button',
	'aria-label': ariaLabel = 'button',

	size = 'medium',
	iconStart,
	iconEnd,
	loading = false,
	disabled = false,

	onClick,

	style,
	className,
	children,
}) => {
	return (
		<button
			role={role}
			type={type}
			disabled={disabled}
			data-testid={dataTestId}
			aria-label={ariaLabel}
			aria-disabled={disabled}
			onClick={onClick}
			style={style}
			className={[styles.button, size, className].join(' ')}
		>
			<span role='img' aria-hidden={true}>
				{iconStart}
			</span>
			{loading ? 'Loading...' : children}
			<span role='img' aria-hidden={true}>
				{iconEnd}
			</span>
		</button>
	);
};

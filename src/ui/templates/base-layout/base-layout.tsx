import type { FC, CSSProperties } from 'react';

interface BaseLayoutProps {
	style?: CSSProperties;
	className?: string;
}

export const BaseLayout: FC<BaseLayoutProps> = ({
	style,
	className,
	children,
}) => (
	<>
		<main style={style} className={className}>
			{children}
		</main>
	</>
);

import type { FC, CSSProperties } from 'react';

declare type LayoutProps<L> = L extends Record<string, unknown>
	? L & {
			style?: CSSProperties;
			className?: string;
	  }
	: {
			style?: CSSProperties;
			className?: string;
	  };

declare type LayoutComponent<L> = FC<LayoutProps<L>>;

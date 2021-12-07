import { css } from '@emotion/css';
import xw from 'xwind';

const wowTitleStyles = xw`inline-block text-center text-transparent opacity-50 prose-wow-xl bg-clip-text bg-gradient-to-r from-blue to-yellow`;

export const wowTitleClassName = css`
	${wowTitleStyles}
`;

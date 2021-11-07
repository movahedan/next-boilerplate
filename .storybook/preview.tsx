import { Global } from '@emotion/react';
import { addDecorator, Parameters } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { globalStyles, xwindGlobalStyles } from '../src/constants/css';

configureActions({
	depth: 5,
});

addDecorator((story) => (
	<>
		<Global styles={globalStyles} />
		<Global styles={xwindGlobalStyles} />
		{story()}
	</>
));

export const parameters: Parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	grid: {
		gridOn: false,
	},
	nextRouter: {
		Provider: RouterContext.Provider,
	},
};

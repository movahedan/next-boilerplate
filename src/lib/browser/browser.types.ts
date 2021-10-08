import type { Screens } from 'ui';

export type BrowserMediaQuery = {
	[key in keyof Screens]: true | false;
};

export interface BrowserObject {
	browser: {
		mediaQuery: BrowserMediaQuery;
	};
}

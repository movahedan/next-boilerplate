import type { Screens } from 'lib/utils';

export type BrowserMediaQuery = {
	[key in keyof Screens]: true | false;
};

export interface BrowserObject {
	browser: {
		mediaQuery: BrowserMediaQuery;
	};
}

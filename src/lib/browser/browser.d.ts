import type { Screens } from 'ui/utils';

export type BrowserMediaQuery = {
	[key in keyof Screens]: true | false;
};

export interface BrowserObject {
	browser: {
		mediaQueries: BrowserMediaQuery;
	};
}

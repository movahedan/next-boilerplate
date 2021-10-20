import { globalCSSList } from './index';

it("globalCSSList should matches it's snapshots", () => {
	expect(globalCSSList).toMatchSnapshot();
});

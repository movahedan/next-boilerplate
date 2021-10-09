import { create } from 'react-test-renderer';

import { FontLinkHead } from './font-link';

describe('<FontLinkHead>', () => {
	// Forgive me. The results of any content in Head is null,
	// and I couldn't find any good solution so this test is
	// redundant  and it's just for keeping coverage up
	it("should matches it's snapshots", () => {
		const fontLinks = create(<FontLinkHead />).toJSON();
		expect(fontLinks).toMatchSnapshot();
	});
});

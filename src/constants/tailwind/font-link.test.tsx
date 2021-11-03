import { fontLinksProps } from './font-link';

describe('fontLinksProps', () => {
	it("should matches it's snapshots", () => {
		expect(fontLinksProps).toMatchSnapshot();
	});
});

import { withMediaQueriesServerSideData } from './media-queries';

describe('media-queries', () => {
	describe('withMediaQueriesServerSideData', () => {
		const cases = [
			[false, ''],
			[true, 'Mobile'],
			[false, 'Firefox'],
		];

		test.each(cases)(
			'it should return isMobile = %p for "%p" as user-agent',
			(expectedValue, userAgent) => {
				const result = withMediaQueriesServerSideData(
					{},
					{ 'user-agent': userAgent as string }
				);
				expect(result).toStrictEqual({
					mediaQueries: {
						isMobile: expectedValue,
					},
				});
			}
		);
	});
});

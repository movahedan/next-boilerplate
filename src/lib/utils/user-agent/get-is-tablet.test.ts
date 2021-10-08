import { getIsTablet } from '.';

it('get-is-tablet should return isTablet boolean', () => {
	expect(
		// @ts-expect-error It's just for mocking purpose
		getIsTablet({ ua: '', device: { type: 'tablet' } })
	).toBeTruthy();

	expect(
		// @ts-expect-error It's just for mocking purpose
		getIsTablet({ ua: 'iPad', device: {} })
	).toBeTruthy();

	expect(
		// @ts-expect-error It's just for mocking purpose
		getIsTablet({ ua: 'iPad', device: { type: 'tablet' } })
	).toBeTruthy();

	expect(
		// @ts-expect-error It's just for mocking purpose
		getIsTablet({ ua: '', device: { type: 'mobile' } })
	).toBeFalsy();

	expect(getIsTablet()).toBeFalsy();
});

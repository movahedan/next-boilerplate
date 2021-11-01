import { getIsTablet } from '.';

it('get-is-tablet should return isTablet boolean', () => {
	let isTablet = false;

	// @ts-expect-error It's just for mocking purpose
	isTablet = getIsTablet({ ua: '', device: { type: 'tablet' } });
	expect(isTablet).toBe(true);

	// @ts-expect-error It's just for mocking purpose
	isTablet = getIsTablet({ ua: 'iPad', device: {} });
	expect(isTablet).toBe(true);

	// @ts-expect-error It's just for mocking purpose
	isTablet = getIsTablet({ ua: 'iPad', device: { type: 'tablet' } });
	expect(isTablet).toBe(true);

	// @ts-expect-error It's just for mocking purpose
	isTablet = getIsTablet({ ua: '', device: { type: 'mobile' } });
	expect(isTablet).toBe(false);
});

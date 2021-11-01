import { getIsDesktop } from '.';

it('get-is-desktop should return isTablet boolean', () => {
	expect(
		// @ts-expect-error It's just for mocking purpose
		getIsDesktop({ ua: '', device: { type: 'tablet' } })
	).toBeFalsy();

	expect(
		// @ts-expect-error It's just for mocking purpose
		getIsDesktop({ ua: '', device: { type: 'mobile' } })
	).toBeFalsy();

	expect(
		// @ts-expect-error It's just for mocking purpose
		getIsDesktop({ ua: 'iPad', device: { type: 'tablet' } })
	).toBeFalsy();

	expect(
		// @ts-expect-error It's just for mocking purpose
		getIsDesktop({ ua: '', device: { type: '' } })
	).toBeTruthy();
});

/* eslint-disable @typescript-eslint/no-empty-function */
import { range, action, addLink, selectCustom } from './storybook.utils';

jest.mock('@storybook/addon-actions', () => ({
	action: () => () => {},
}));

describe('storybook.utils', () => {
	it('selectCustom function should return proper value', () => {
		expect(selectCustom([])).toEqual({
			control: { type: 'select', options: [] },
		});
	});

	it('range function should return proper value', () => {
		expect(range(0, 10, 1)).toEqual({
			control: { type: 'range', min: 0, max: 10, step: 1 },
		});
	});

	it('action function should return proper value', () => {
		expect(action('someAction')).not.toThrow();
	});

	it('addLink function should return proper value', () => {
		expect(addLink('#')).toEqual({
			docs: {
				description: {
					component: `<a href="#" target="_blank">#</a>`,
				},
			},
		});
	});
});

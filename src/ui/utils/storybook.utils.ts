import { action as action_ } from '@storybook/addon-actions';

export const hide = { table: { disable: true } };
export const boolean = { control: { type: 'boolean' } };
export const string = { control: { type: 'text' } };
export const disable = { control: { type: null } };
export const number = { control: { type: 'number' } };
export const object = { control: { type: 'object' } };
export const color = { control: { type: 'color' } };
export const select = { control: { type: 'select' } };
export const selectCustom = (options: never[]) => ({
	control: { type: 'select', options },
});
export const range = (
	min: number,
	max: number,
	step: number | undefined = 1
) => ({
	control: { type: 'range', min, max, step },
});
export const array = { control: { type: 'array' } };

export const action =
	(str: string) =>
	(...a: never[]) => {
		action_(str)(a);
	};

export const addLink = (figmaLink: string) => {
	return {
		docs: {
			description: {
				component: `<a href="${figmaLink}" target="_blank">${figmaLink}</a>`,
			},
		},
	};
};

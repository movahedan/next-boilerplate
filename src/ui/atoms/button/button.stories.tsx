import React from 'react';

import { Button } from './button';

import type { Story, Meta } from '@storybook/react';

export default {
	title: 'Atoms/Button',
	component: Button,
} as Meta;

const Template: Story = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
	children: 'Button',
};

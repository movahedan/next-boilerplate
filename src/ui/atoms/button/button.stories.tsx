import React from 'react';

import { GButton } from './button';

import type { Story, Meta } from '@storybook/react';

export default {
	title: 'Atoms/GButton',
	component: GButton,
} as Meta;

const Template: Story = (args) => <GButton {...args} />;

export const Default = Template.bind({});

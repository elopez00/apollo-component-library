import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Icon, Props } from '../src/components/Icon/Icon';

const meta: Meta = {
    title: 'Layout/Icon',
    component: Icon,
    args: {
        name: 'navigate_next',
        onClick: undefined,
    },
};

export default meta;

/**
 * Template Icon
 *
 * @param args storybook arguments
 * @return template icon
 */
const Template: Story<Props> = (args) => <Icon {...args} />;

export const Default = Template.bind({});

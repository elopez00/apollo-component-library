import React from 'react';
import type { SampleStory } from './util';
import { Badge, Icon } from '../../src';

// the name of this function should be the name of the story in the docs
export const SomeExample: SampleStory = (args) => (
    <Badge {...args}>
        <Icon name="check" />
    </Badge>
);

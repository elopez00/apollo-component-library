import type { FC, HTMLAttributes } from 'react';
import React, { useState } from 'react';

import type { Apollo } from '../../interfaces/Apollo';
import type { StyleVariant } from '../../interfaces/Properties';
import type * as CSS from 'csstype';
import { gaurdApolloName } from '../../util/ErrorHandling';
import { handleTransition } from '../../util/helper';

export interface IBadge extends HTMLAttributes<HTMLDivElement>, Apollo<'Badge'> {
    /** Color of the badge */
    color?: StyleVariant | CSS.Property.Color;
    /** Value of the badge */
    value?: number;
    /** Max value displayed in badge */
    max?: number;
    /** Shows the badge  */
    show?: boolean;
    /** What vertical side the badge will appear on */
    vertical?: 'top' | 'bottom';
    /** What horizontal side the badge will appear on */
    horizontal?: 'left' | 'right';
    /** What shape will the component overlap */
    overlap?: 'circle' | 'square';
}

/**
 * Apollo's badge component used to display a floating value in one of the corners of a given child
 * element.
 *
 * @return Badge Component
 */
export const Badge: FC<IBadge> = ({
    horizontal = 'right',
    vertical = 'top',
    overlap = 'square',
    className = '',
    show = false,
    children,
    color,
    value,
    max,
    ...props
}) => {
    gaurdApolloName(props, 'Badge');

    // state
    const [showBadge, setShowBadge] = useState(show);
    const [showTransition, setShowTransition] = useState(show);

    handleTransition(show, showBadge, setShowBadge, setShowTransition);

    return (
        <div {...props} className={`apollo-component-library-badge-component ${className}`}>
            <span className="apollo-component-library-badge-component-badge" />
            {children}
        </div>
    );
};

Badge.defaultProps = { 'data-apollo': 'Badge' };

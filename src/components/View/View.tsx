import type { HTMLAttributes, ReactNode, FC, CSSProperties } from 'react';
import React from 'react';

import type { Apollo } from '../../interfaces/Apollo';
import type { Interface } from '../../interfaces/Overload';
import type * as CSS from 'csstype';
import { gaurdApolloName } from '../../util/ErrorHandling';

export interface IView extends Interface<HTMLAttributes<HTMLDivElement>>, Apollo<'View'> {
    /** May have children */
    children?: ReactNode;
    /** Change the display style of View */
    display?: CSS.Property.Display;
    /** Change the position style of View */
    position?: CSS.Property.Position;
}

/**
 * Div element that allows for extended templating options for interface components
 *
 * @return View component
 */
export const View: FC<IView> = ({ parentProps, children, display, position, style, ...props }) => {
    gaurdApolloName(props, 'View');

    return (
        <div {...props} style={getViewStyle({ display, position, style })}>
            {parentProps?.renderAll ? parentProps?.renderAll(children) : children}
        </div>
    );
};

View.defaultProps = { 'data-apollo': 'View' };

/**
 * Gets the style object for the View given props
 *
 * @return Finalized style object;
 */
const getViewStyle = ({ display, position, style }: IView): CSSProperties => {
    return {
        display,
        position,
        ...style,
    };
};

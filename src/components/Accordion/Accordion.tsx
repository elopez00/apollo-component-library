import React, { useState, useRef, MouseEventHandler, useEffect, ReactNode } from 'react';
import type { FC } from 'react';
import { Apollo } from '../../interfaces/Apollo';
import { gaurdApolloName } from '../../util/ErrorHandling';
import { Text } from '../Text/Text';
import './Accordion.css';
import { Icon } from '../Icon/Icon';

interface IAccordion extends Apollo<'Accordion'> {
    /** The id of the accordion */
    id: string;
    /** The default open state of the accordion */
    defaultOpen?: boolean;
    /** Overrides open property */
    override?: boolean;
    /** The max height of the pannel */
    panelHeight?: number;
    /** The max height of the pannel */
    panelHeightOverride?: number;
    /** The header of the accordion */
    header?: ReactNode;
    /** Will handle what happens on button click */
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Apollo Accordion Component
 *
 * @return Accordion component
 */
export const Accordion: FC<IAccordion> = ({
    id,
    header,
    defaultOpen = false,
    panelHeight = 200,
    override,
    panelHeightOverride,
    children,
    onClick,
    ...props
}) => {
    gaurdApolloName(props, 'Accordion');
    const accordion = useAccordion(
        defaultOpen,
        panelHeight,
        override,
        onClick,
        panelHeightOverride
    );
    console.log(accordion.height);

    return (
        <div {...props} className="apollo">
            <button
                id={`${id}-header`}
                type="button"
                onClick={accordion.setOpen}
                aria-expanded={accordion.open}
            >
                {typeof header === 'string' ? (
                    <Text header={3} bold color="#5D6871">
                        {header}
                    </Text>
                ) : (
                    header
                )}
                <Icon
                    name="keyboard_arrow_right"
                    className={`${accordion.open ? 'open' : 'closed'}`}
                />
            </button>
            <section
                id={`${id}-panel`}
                aria-labelledby={`${id}-header`}
                ref={accordion.ref}
                style={{ height: accordion.height, overflow: accordion.open ? 'auto' : 'hidden' }}
            >
                {typeof children === 'string' ? <Text>{children}</Text> : children}
            </section>
        </div>
    );
};

/**
 * These are the values that will control all of the accordion logicF
 */
interface IAccordionValues {
    open?: boolean;
    setOpen?: MouseEventHandler<HTMLButtonElement>;
    height?: number;
    ref?: React.RefObject<HTMLDivElement>;
}

/**
 * Function that will handle all accordion funcionalities
 *
 * @param defaultOpen - default open state
 * @param panelHeight - default panel height
 * @param override - default open state
 * @param onClick - onClick handler
 * @param panelHeightOverride - override panel height
 * @return Accordion values
 */
const useAccordion = (
    defaultOpen: boolean,
    panelHeight?: number,
    override?: boolean,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    panelHeightOverride?: number
): IAccordionValues => {
    const [open, setOpen] = useState(Boolean(override ?? defaultOpen));
    const ref = useRef<HTMLDivElement>(null);

    // handles whether user wants to override the open state
    useEffect(() => {
        if (override === undefined) return;

        setOpen(Boolean(override));
    }, [override]);

    // determine what height the panel should be on open
    const refPanelHeight = ref.current?.scrollHeight ?? 0;
    const maxPanelHeight = panelHeight ?? refPanelHeight;

    const openHeight = panelHeightOverride ?? Math.min(maxPanelHeight, refPanelHeight);

    return {
        open,
        setOpen: (e) => {
            if (onClick) onClick(e);
            setOpen(!open);
        },
        height: open ? openHeight + 30 : 0,
        ref,
    };
};

Accordion.defaultProps = {
    'data-apollo': 'Accordion',
};

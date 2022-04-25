import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';

/**
 * Handles Fade in and out transitions that depend on an element disappearing
 *
 * @param control the actual visual state of the component
 * @param display the state of the component
 * @param setDisplay the function to set the display state of the component
 * @param setTransition the function to set the transition state of the component
 */
export const handleTransition = (
    control: boolean,
    display: boolean,
    setDisplay: Dispatch<SetStateAction<boolean>>,
    setTransition: Dispatch<SetStateAction<boolean>>
): void => {
    useEffect(() => {
        if (control !== display) {
            if (display) {
                setTransition(false);
                setTimeout(() => setDisplay(false), 300);
            } else {
                setDisplay(true);
                setTimeout(() => setTransition(true), 100);
            }
        }
    }, [open]);
};

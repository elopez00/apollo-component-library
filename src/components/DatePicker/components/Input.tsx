import { FC, HTMLAttributes, useEffect } from 'react';
import React from 'react';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
import { Text } from '../../Text/Text';
import { Grid } from '../../Grid/Grid';
import { Icon } from '../../Icon/Icon';

interface IInput extends HTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    invalid?: boolean;
    label?: string;
    required?: boolean;
    theme?: string;
    name?: string;
    hideLabel?: boolean;
    disabled?: boolean;
}

/**
 * Input component responsible for registering the dates for the input
 *
 * @return date picker input component
 */
const Input: FC<IInput> = ({
    label,
    required,
    invalid,
    errorMessage,
    disabled,
    name,
    theme = 'primary',
    hideLabel,
    ...props
}) => {
    // will throw if you try to add an error message without a name
    useEffect(() => {
        if (errorMessage?.length && !name?.length)
            throw new Error(
                'To use error message in TextInput, you must specify name to use error messages' +
                    ' to comply with WCAG 2.0'
            );
    }, []);

    return (
        <div className={`apollo ${theme}`} data-apollo="DatePickerTextInputLabel">
            <label>
                {!hideLabel ? (
                    <div className="label">
                        {label}{' '}
                        {required ? (
                            <Text inline color="red">
                                *
                            </Text>
                        ) : null}
                    </div>
                ) : null}
                <Grid columns="35px 1fr" className="apollo inputgroup">
                    <Icon name="calendar_month" />
                    <input
                        {...props}
                        data-apollo="DatePickerTextInput"
                        required={required}
                        disabled={disabled}
                        name={name}
                        aria-required={required}
                        aria-invalid={invalid}
                        aria-errormessage={name ? `${name}-error` : `${label}-error`}
                        className={`
                            apollo
                            ${!invalid ? 'valid' : 'invalid'}
                            ${theme}
                        `}
                    />
                </Grid>
            </label>
            <ErrorMessage
                className="invalid"
                id={name ? `${name}-error` : `${label}-error`}
                active={Boolean(invalid && errorMessage)}
            >
                {errorMessage}
            </ErrorMessage>
        </div>
    );
};

export default Input;

import { FC, useEffect } from 'react';

import React from 'react';
import Calendar from './components/Calendar';
import Input from './components/Input';
import './DatePicker.css';

export interface IDatePicker {
    /** Should not have children */
    children?: undefined;
    /** Placeholder to be showed in datepicker input */
    placeholder: string;
    /** Label describing the `DatePicker` */
    label: string;
    /** Hides label when toggled true */
    /** The default value on input */
    defaultValue?: string;
    /** The default date populated (if any) */
    defaultDate?: Date;
    /** The minimum date that can be selected */
    minDate?: Date;
    /** The maximum date that can be selected */
    maxDate?: Date;
    /** Function that executes every time there is a change */
    onChange?: (date: Date) => void;
    /** Point of anchor for input */
    anchor?: 'top' | 'bottom';
    /** Alignment in relationship to the anchor */
    align?: 'left' | 'right' | 'center';
    /** Determines whether the `DatePicker` is disabled or not */
    disabled?: boolean;
    /** Determines whether the `DatePicker` is invalid or not */
    invalid?: boolean;
    /** Determines whether the `DatePicker` is required or not */
    required?: boolean;
    /** Error message displayed when `DatePicker` is invalid */
    errorMessage?: string;
    /** Theme to be placed in Apollo */
    theme?: string;
    /** If true will open the `DatePicker` calendar on render */
    defaultOpen?: boolean;
}

/**
 * Apollo date picking solution
 *
 * @return DatePicker component
 */
export const DatePicker: FC<IDatePicker> = ({
    label,
    placeholder,
    invalid,
    errorMessage,
    ...props
}) => {
    const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
    const [monthMatrix, setMonthMatrix] = React.useState<(Date | null)[][]>([]);

    useEffect(() => {
        // get all the dates in the current month
        const month: (Date | null)[][] = [];

        // record the month index
        const monthIndex = currentDate.getMonth();

        // get the first day of the current month
        let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // loop through every possible week
        for (let i = 0; i < 6; i++) {
            const week: (Date | null)[] = [];

            // loop through every possible day
            if (i === 5 && date.getMonth() !== monthIndex) continue;

            for (let j = 0; j < 7; j++) {
                // ensure that the date is in the righ position in the week
                if (i === 0) {
                    while (date.getDay() !== j) {
                        week.push(null);
                        j++;
                    }
                }

                week.push(date.getMonth() === monthIndex ? date : null);

                // increment the date by one day
                date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
            }

            month.push(week);
        }

        setMonthMatrix([...month]);
    }, [currentDate, setCurrentDate]);

    return (
        <div>
            <Input
                label={label}
                placeholder={placeholder}
                errorMessage={errorMessage}
                invalid={invalid}
            />
            <Calendar monthMatrix={monthMatrix} currentDate={currentDate} />
        </div>
    );
};

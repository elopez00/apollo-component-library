import type { FC, HTMLAttributes } from 'react';
import React from 'react';
import { Button } from '../../Button/Button';
import { Icon } from '../../Icon/Icon';
import { Menu } from '../../Menu/Menu';
import { Section } from '../../Section/Section';
import { Text } from '../../Text/Text';

interface Calendar extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** The default date populated (if any) */
    defaultDate?: Date;
    /** The minimum date that can be selected */
    minDate?: Date;
    /** The maximum date that can be selected */
    maxDate?: Date;
    /** Month matrix */
    monthMatrix: (Date | null)[][];
    /** currentDate */
    currentDate: Date;
    /** Function that executes every time there is a change */
    onChange?: (date: Date) => void;
}

/**
 * Calendar that renders the days of the month
 *
 * @return calendar component
 */
const Calendar: FC<Calendar> = ({
    defaultDate,
    minDate,
    maxDate,
    monthMatrix,
    currentDate,
    onChange,
    ...props
}) => {
    return (
        <Menu
            label="calendar"
            description="helps you pick a date"
            width="min-content"
            style={{ padding: 20 }}
        >
            <div className="apollo" data-apollo="DatePickerCalendar">
                <Section alignItems="center" justifyContent="space-between">
                    <Icon name="keyboard_arrow_left" />
                    <Text>September 2021</Text>
                    <Icon name="keyboard_arrow_right" />
                </Section>
                <Section center>{renderCalendar(monthMatrix, currentDate)}</Section>
            </div>
        </Menu>
    );
};

/**
 * Renders the calendar component given the month and year
 *
 * @param monthMatrix matrix of dates
 * @param currentDate the current date
 * @return calendar
 */
const renderCalendar = (monthMatrix: (Date | null)[][], currentDate: Date): JSX.Element => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <Text>Su</Text>
                    </th>
                    <th>
                        <Text>Mo</Text>
                    </th>
                    <th>
                        <Text>Tu</Text>
                    </th>
                    <th>
                        <Text>We</Text>
                    </th>
                    <th>
                        <Text>Th</Text>
                    </th>
                    <th>
                        <Text>Fr</Text>
                    </th>
                    <th>
                        <Text>Sa</Text>
                    </th>
                </tr>
            </thead>
            <tbody>
                {monthMatrix.map((week, index) => (
                    <tr key={`calendar-${index}`}>
                        {week.map((date, index) => (
                            <td key={`calendar-${index}`}>
                                {date ? (
                                    <Button variant="none" className="calendar-day">
                                        {date?.getDate()}
                                    </Button>
                                ) : null}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Calendar;

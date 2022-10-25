import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { DatePicker } from '../src';

const defaultDate = new Date('2021-01-01');

describe('DatePicker', () => {
    it('renders correctly', () => {
        // given
        render(<DatePicker placeholder="Pick Date" label="Pick a date" />);

        // when then
        expect(screen.getByPlaceholderText(/Pick Date/i)).toBeInTheDocument();
    });

    it('complies with WCAG 2.0 AA', async () => {
        // given
        const { container: defaultDatePicker } = render(
            <DatePicker placeholder="Pick Date" label="Pick a date" />
        );
        const { container: openedDatePicker } = render(
            <DatePicker placeholder="Pick Date" label="Pick a date" defaultOpen />
        );

        // when
        const results: any[] = [];
        results.push(await axe(defaultDatePicker));
        results.push(await axe(openedDatePicker));

        // then
        results.forEach((result) => {
            expect(result).toHaveNoViolations();
        });
    });

    it('will show calendar when clicked', () => {
        // given
        render(<DatePicker placeholder="Pick Date" label="Pick a date" />);
        const datePicker = screen.getByPlaceholderText(/Pick Date/i);

        // when
        userEvent.click(datePicker);

        // then
        expect(screen.getByRole('application')).toBeInTheDocument();
    });

    it('will not show calendar when clicked', () => {
        // given
        render(<DatePicker placeholder="Pick Date" label="Pick a date" disabled />);
        const datePicker = screen.getByPlaceholderText(/Pick Date/i);

        // when
        userEvent.click(datePicker);

        // then
        expect(screen.queryByRole('application')).not.toBeInTheDocument();
    });

    it('will change value when date is selected', () => {
        // given
        render(
            <DatePicker placeholder="Pick Date" label="Pick a date" defaultDate={defaultDate} />
        );
        const datePicker = screen.getByRole(/Pick Date/i);

        // when
        userEvent.click(datePicker);
        userEvent.click(screen.getByText(/2/i));

        // then
        expect(datePicker).toHaveValue('02/01/2021');
    });

    it('will change month when month navigation buttons are clicked', () => {
        // given
        render(
            <DatePicker
                placeholder="Pick Date"
                label="Pick a date"
                defaultOpen
                defaultDate={defaultDate}
            />
        );
        const datePicker = screen.getByRole(/Pick Date/i);

        // when then
        userEvent.click(screen.getByLabelText(/next month/i));
        expect(datePicker).toHaveValue('12/01/2021');

        userEvent.click(screen.getByLabelText(/previous month/i));
        expect(datePicker).toHaveValue('02/01/2021');
    });

    it('will change year and month when year navigation buttons are clicked', () => {
        // given
        render(<DatePicker placeholder="Pick Date" label="Pick a date" defaultOpen />);
        const datePicker = screen.getByRole(/Pick Date/i);

        // when
        userEvent.click(screen.getByLabelText(/january 2021/i));
        userEvent.click(screen.getByText(/2023/i));
        userEvent.click(screen.getByLabelText(/oct/i));

        // then
        expect(datePicker).toHaveValue('02/01/2022');
    });

    it('will call `onChange` when date is selected', () => {
        // given
        const onChange = jest.fn();
        render(
            <DatePicker
                placeholder="Pick Date"
                label="Pick a date"
                onChange={onChange}
                defaultDate={defaultDate}
            />
        );
        const datePicker = screen.getByRole(/Pick Date/i);

        // when
        userEvent.click(datePicker);
        userEvent.click(screen.getByText(/2/i));

        // then
        expect(onChange).toHaveBeenCalledWith(new Date('2021-01-02'));
    });

    it('will accept input in mm/dd/yyyy format', () => {
        // given
        render(
            <DatePicker placeholder="Pick Date" defaultDate={defaultDate} label="Pick a date" />
        );
        const datePicker = screen.getByRole(/Pick Date/i);

        // when
        userEvent.type(datePicker, '02/01/2021');

        // then
        expect(datePicker).toHaveValue('02/01/2021');
    });

    it('will throw an error message when input is invalid', () => {
        // given
        render(
            <DatePicker placeholder="Pick Date" defaultDate={defaultDate} label="Pick a date" />
        );
        const datePicker = screen.getByRole(/Pick Date/i);

        // when
        userEvent.type(datePicker, '02/01/20212');

        // then
        expect(screen.getByText(/invalid date/i)).toBeInTheDocument();
    });

    it('will not accept date before given min date', () => {
        // given
        render(
            <DatePicker
                placeholder="Pick Date"
                label="Pick a date"
                defaultDate={defaultDate}
                minDate={new Date('2020-12-31')}
            />
        );
        const datePicker = screen.getByRole(/Pick Date/i);

        // when
        userEvent.type(datePicker, '12/01/2020');

        // then
        expect(screen.getByText(/invalid date/i)).toBeInTheDocument();
    });

    it('will not accept date after given max date', () => {
        // given
        render(
            <DatePicker
                placeholder="Pick Date"
                label="Pick a date"
                maxDate={new Date('2021-01-02')}
            />
        );
        const datePicker = screen.getByRole(/Pick Date/i);

        // when
        userEvent.type(datePicker, '03/01/2021');

        // then
        expect(screen.getByText(/invalid date/i)).toBeInTheDocument();
    });

    it('will show custom error message when `invalid` is set to true', () => {
        // given
        render(
            <DatePicker
                placeholder="Pick Date"
                label="Pick a date"
                invalid
                errorMessage="This is invalid"
            />
        );
        const datePicker = screen.getByRole(/Pick Date/i);

        // when
        userEvent.type(datePicker, '02/01/20212');

        // then
        expect(screen.getByText(/this is invalid/i)).toBeInTheDocument();
    });
});

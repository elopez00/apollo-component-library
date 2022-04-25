import React from 'react';
import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Badge, Icon } from '../src';

describe('Badge', () => {
    it('should comply to WCAG 2.0', async () => {
        // given
        const { container: defaultBadge } = render(
            <Badge show>
                <Icon name="check" />
            </Badge>
        );

        const { container: badgeWithValue } = render(
            <Badge show value={1}>
                <Icon name="check" />
            </Badge>
        );

        // when
        const results = [];
        results[0] = await axe(defaultBadge);
        results[1] = await axe(badgeWithValue);

        // then
        expect(results).toHaveNoViolations();
    });

    it('should render correctly', () => {
        // given
        render(
            <Badge show>
                <Icon name="check" />
            </Badge>
        );

        // when
        const badge = screen.getByAltText(/notification/i);

        // then
        expect(badge).toBeInTheDocument();
    });

    it('should render correctly with value', () => {
        // given
        render(
            <Badge show value={1}>
                <Icon name="check" />
            </Badge>
        );

        // when
        const badge = screen.getByAltText(/1 notification/i);

        // then
        expect(badge).toBeInTheDocument();
    });

    it('should render correctly with max value', () => {
        // given
        render(
            <Badge show value={11} max={10}>
                <Icon name="check" />
            </Badge>
        );

        // when
        const badge = screen.getByAltText(/more than 10 notifications/i);

        // then
        expect(badge).toBeInTheDocument();
    });

    it("shouldn't render if show is false", () => {
        // given
        render(
            <Badge show={false}>
                <Icon name="check" />
            </Badge>
        );

        // when
        const badge = screen.queryByAltText(/notification/i);

        // then
        expect(badge).not.toBeInTheDocument();
    });
});

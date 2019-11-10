import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Projects } from '../components/Projects';
import { useProjectsValue, useSelectedProjectValue } from '../context';

beforeEach(cleanup);

jest.mock('../context/Projects-context', () => ({
    useProjectsValue: jest.fn(() => ({
        projects: [
            {
                name: '🙌 THE OFFICE',
                projectId: '1',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'michael-scott',
            }
        ]
    }))
}));

jest.mock('../context/Selected-projects-context', () => ({
    useSelectedProjectValue: jest.fn(() => ({
        setSelectedProject: jest.fn()
    }))
}));

describe('Success', () => {
    it('renders Projects', () => {
        const {queryByTestId} = render(<Projects />);
        expect(queryByTestId('project-action')).toBeTruthy();
    })

    it('renders project and select project on click with an active value', () => {
        const {queryByTestId} = render(<Projects active='1'/>);
        expect(queryByTestId('project-action')).toBeTruthy();

        fireEvent.click(queryByTestId('project-action'))
        expect(queryByTestId('project-action').classList.contains('active'))
            .toBeTruthy();
            ;
    })

    it('renders projects and and select project on keyPress', () => {
        const {queryByTestId} = render(<Projects active='1'/>);
        expect(queryByTestId('project-action')).toBeTruthy();

        fireEvent.keyPress(queryByTestId('project-action'),{
            key: 'Enter', code: 13, charCode: 13
        });

    })
})
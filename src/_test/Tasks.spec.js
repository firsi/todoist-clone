import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import  Tasks  from '../components/Tasks';
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
        ],
        setProjects: jest.fn()
    }))
}));

jest.mock('../context/Selected-projects-context', () => ({
    useSelectedProjectValue: jest.fn(() => ({
        setSelectedProject: jest.fn()
    }))
}));

jest.mock('../hooks/useTasks', () => ({
    useTasks: () => ({
        tasks: [
            {
        id: 'mx2taaXpF38vYqMGbVtY',
        archived: false,
        date: '21/07/2019',
        projectId: '1',
        task:
          'Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      },
        ]
    })
}));

describe('<Tasks />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    it('renders Tasks while collatedTasks is selected', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => 'INBOX'),
            selectedProject: 'INBOX'    
        }));

        const {queryByTestId, debug} = render(<Tasks />);

        expect(queryByTestId('tasks')).toBeTruthy();
        debug();
        expect(queryByTestId('project-name').textContent)
            .toBe(('Inbox'))
    })

    it('renders Tasks when a project is selected', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => '1'),
            selectedProject: '1'
        }));

        const {queryByTestId} = render(<Tasks />);
        expect(queryByTestId('project-name').textContent)
            .toBe('🙌 THE OFFICE')
    })
})
import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { IndividualProject } from '../components/IndividualProject';
import { useProjectsValue, useSelectedProjectValue } from '../context';

beforeEach(cleanup);

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    delete: jest.fn(() => Promise.resolve("I'm a promise"))
                }))
            }))
        }))
    }
}))

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

describe('<IndividualProject />', () => {
    const project = {
        name: '🙌 THE OFFICE',
        projectId: '1',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'michael-scott',
    }

    it('renders IndividualProject', () => {
        
        const {getByText} = render(<IndividualProject project={project} />);

        expect(getByText('🙌 THE OFFICE')).toBeTruthy()
    })

    it('renders IndividualProject and show confirm using click', () => {
        
        const {getByText, queryByTestId} = render(<IndividualProject project={project} />);

        expect(getByText('🙌 THE OFFICE')).toBeTruthy()

        fireEvent.click(queryByTestId('delete-project'));

        expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()
    })

    it('renders IndividualProject and cancel show confirm using click', () => {
        
        const {getByText, queryByTestId} = render(<IndividualProject project={project} />);

        fireEvent.click(queryByTestId('delete-project'));
        expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

        fireEvent.click(getByText('Cancel'));
    
    })

    it('renders IndividualProject and delete project on show confirm using click', () => {
        
        const {getByText, queryByTestId} = render(<IndividualProject project={project} />);

        fireEvent.click(queryByTestId('delete-project'));
        expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

        fireEvent.click(getByText('Delete'));
    })
})
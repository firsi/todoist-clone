import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { ProjectOverlay } from '../components/ProjectOverlay';
import { useProjectsValue } from '../context/Projects-context';

beforeEach(cleanup);

jest.mock('../context/Projects-context', () => ({
    useProjectsValue: jest.fn(() => ({
        projects : [
            {
                name: '🙌 THE OFFICE',
                projectId: '1',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'michael-scott',
            }
        ]
    }))
}));

describe('Success', () => {
    it('renders ProjectOverlay and select a project', () => {
        const setProject = jest.fn();
        const showProjectOverlay = true;
        const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

        const {queryByTestId} = render(<ProjectOverlay 
            setProject={setProject}
            showProjectOverlay
            setShowProjectOverlay={setShowProjectOverlay}
        />)
        expect(queryByTestId('project-overlay')).toBeTruthy();
        
        fireEvent.click(queryByTestId('project-overlay-action'));
        expect(setShowProjectOverlay).toHaveBeenCalled()
    })
})
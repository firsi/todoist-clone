import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { AddProject } from '../components/AddProject';
import { firebase } from '../firebase';
import { useProjectsValue } from '../context/Projects-context';

beforeEach(cleanup);

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                add: jest.fn(() => Promise.resolve('This is a promise'))
            }))
        }))
    }
}));

jest.mock('../context/Projects-context',() => ({
    useProjectsValue: jest.fn(() => ({
        setProjects: jest.fn()
    }))
}));

describe('<AddProject />', () => {
    it('renders AddProject ', () => {
        const {queryByTestId} = render(<AddProject />);
        expect(queryByTestId('add-project')).toBeTruthy();
    });

    it('renders AddProject and show addProject inner on click', () => {
        const {queryByTestId} = render(<AddProject />);
        expect(queryByTestId('add-project')).toBeTruthy();

        fireEvent.click(queryByTestId('add-project-action'));
        expect(queryByTestId('project-name')).toBeTruthy();
    })

    it('renders AddProject and cancel addProject inner on click', () => {
        const {queryByTestId} = render(<AddProject shouldShow={true} />);
        expect(queryByTestId('project-name')).toBeTruthy();

        fireEvent.click(queryByTestId('hide-project-overlay'));
        expect(queryByTestId('projectName')).toBeFalsy();
        expect(queryByTestId('add-project')).toBeTruthy();
    })

    it('renders AddProject and insert project', () => {
        const {queryByTestId} = render(<AddProject shouldShow={true} />);
        expect(queryByTestId('project-name')).toBeTruthy();

        fireEvent.change(queryByTestId('project-name'), {
            target: {value: 'New project'}
        });

        expect(queryByTestId('project-name').value)
            .toBe('New project');
    })

    it('renders AddProject and submit the project', () => {
        const {queryByTestId} = render(<AddProject shouldShow={true} />);
        expect(queryByTestId('project-name')).toBeTruthy();

        fireEvent.change(queryByTestId('project-name'), {
            target: {value: 'New project'}
        });

        fireEvent.click(queryByTestId('add-project-submit'));
    
    })

    it('No action when the project name is empty', () => {
        const { queryByTestId } = render(<AddProject shouldShow />);
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeTruthy();
        
        fireEvent.click(queryByTestId(('add-project-submit')));
        
        expect(queryByTestId('add-project-inner')).toBeTruthy();
      });
})
import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { useSelectedProjectValue } from '../context';
import { firebase } from '../firebase';
import { AddTask } from '../components/AddTask';



beforeEach(cleanup);

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                add: jest.fn(() => Promise.resolve('Firebase returning a promise'))
            }))
    }))}
}));

jest.mock('../context/Projects-context', () => ({
    useProjectsValue: jest.fn(() => ({projects: []})),
}));

jest.mock('../context/Selected-projects-context', () => ({
    useSelectedProjectValue: jest.fn(() => ({selectedProject: "1"})),
}))


describe('<AddTask />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('it renders addTask', () => {
        const {queryByTestId} = render(<AddTask />);
        expect(queryByTestId('add-task-comp')).toBeTruthy()
    });

    it('it renders addTask Quick overlay', () => {
        const setShowQuickAddTask = jest.fn();

        const {queryByTestId} = render(<AddTask 
            showAddTaskMain
            shouldShowMain={false}
            showQuickAddTask
            setShowQuickAddTask={setShowQuickAddTask}
            />)
        expect(queryByTestId('quick-add-task')).toBeTruthy();
    })

    it('it renders addTask main showable using on click', () => {
        const {queryByTestId} = render(<AddTask 
            showAddTaskMain
            />);

        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-main')).toBeTruthy();
    })

    it('it renders addTask main showable using onKeydown', () => {
        const {queryByTestId} = render(<AddTask 
            showAddTaskMain
            />);

        fireEvent.keyDown(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-main')).toBeTruthy();
    })

    it('it renders AddTask and show projects overlay when clicked', () => {
        const {queryByTestId} = render(<AddTask showAddTaskMain />);

        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-main')).toBeTruthy();
        
        fireEvent.click(queryByTestId('show-project-overlay'));
        expect(queryByTestId('project-overlay')).toBeTruthy() 
    })

    it('it renders AddTask and show projects overlay when onKeyDown', () => {
        const {queryByTestId} = render(<AddTask showAddTaskMain />);

        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-main')).toBeTruthy();
        
        fireEvent.keyDown(queryByTestId('show-project-overlay'));
        expect(queryByTestId('project-overlay')).toBeTruthy() 
    })

    it('it renders AddTask task date overlay when clicked', () => {
        const {queryByTestId} = render(<AddTask showAddTaskMain />);

        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-main')).toBeTruthy();
        
        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy() 
    })

    it('it renders AddTask task date overlay when onKeyDown', () => {
        const {queryByTestId} = render(<AddTask showAddTaskMain />);

        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-main')).toBeTruthy();
        
        fireEvent.keyDown(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy() 
    })

    it('hide AddTask task main when cancel is clicked', () => {
        const {queryByTestId} = render(<AddTask showAddTaskMain />);

        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-main')).toBeTruthy();
        
        fireEvent.click(queryByTestId('add-task-main-cancel'));
        expect(queryByTestId('add-task-main')).toBeFalsy() 
    })

    it('hides AddTask task main when cancel is keydown', () => {
        const {queryByTestId} = render(<AddTask showAddTaskMain />);

        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-main')).toBeTruthy();
        
        fireEvent.keyDown(queryByTestId('add-task-main-cancel'));
        expect(queryByTestId('add-task-main')).toBeFalsy() 
    })

    it('hides AddTask quick add task when cancel is clicked', () => {
        const showQuickAddTask = true;
        const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
        const { queryByTestId } = render(
            <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
        );

        expect(queryByTestId('add-task-main')).toBeTruthy();
        
        fireEvent.click(queryByTestId('add-task-quick-cancel'));
        expect(setShowQuickAddTask).toHaveBeenCalled();
    })

    it('hides AddTask quick add task when cancel is onkeyDown', () => {
        const showQuickAddTask = true;
        const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
        const { queryByTestId } = render(
            <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
        );

        expect(queryByTestId('add-task-main')).toBeTruthy();
        
        fireEvent.keyDown(queryByTestId('add-task-quick-cancel'));
        expect(setShowQuickAddTask).toHaveBeenCalled();
    })

    it('render AddTask and add task to today when clicked', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            selectedProject: 'TODAY'
        }));


        const { queryByTestId } = render(
            <AddTask shouldShowMain={true} showAddTaskMain />
        );
            
        expect(queryByTestId('show-main-action')).toBeTruthy();
        expect(queryByTestId('add-task-content')).toBeTruthy();
        
        fireEvent.change(queryByTestId('add-task-content'),{
            target: {value: "I'm a happy task"}
        });
        expect(queryByTestId('add-task-content').value)
            .toBe("I'm a happy task");

        
        fireEvent.click(queryByTestId('add-task'));
        
    })

    it('render AddTask and add task to next 7 Days when clicked', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            selectedProject: 'NEXT_7'
        }));

        
        const { queryByTestId } = render(
            <AddTask shouldShowMain={true} showAddTaskMain />
        );
            
        expect(queryByTestId('show-main-action')).toBeTruthy();
        expect(queryByTestId('add-task-content')).toBeTruthy();
        
        fireEvent.change(queryByTestId('add-task-content'),{
            target: {value: "I'm a happy task"}
        });
        expect(queryByTestId('add-task-content').value)
            .toBe("I'm a happy task");

        
        fireEvent.click(queryByTestId('add-task'));

    })

    it('renders <AddTask /> and adds a task with a task date of TODAY', () => {
        useSelectedProjectValue.mockImplementation(() => ({
          selectedProject: '1',
        }));
  
        const { queryByTestId } = render(<AddTask showMain />);
        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-content')).toBeTruthy();
        expect(queryByTestId('add-task-main')).toBeTruthy();
  
        fireEvent.change(queryByTestId('add-task-content'), {
          target: { value: 'I am the most amazing task ever!' },
        });
        expect(queryByTestId('add-task-content').value).toBe(
          'I am the most amazing task ever!'
        );
  
        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy();
  
        fireEvent.click(queryByTestId('task-date-today'));
        expect(queryByTestId('task-date-overlay')).toBeFalsy();
  
        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy();
  
        fireEvent.keyDown(queryByTestId('task-date-today'));
        expect(queryByTestId('task-date-overlay')).toBeFalsy();
  
        fireEvent.click(queryByTestId('add-task'));
      });
  
      it('renders <AddTask /> and adds a task with a task date of TOMORROW', () => {
        useSelectedProjectValue.mockImplementation(() => ({
          selectedProject: '1',
        }));
  
        const { queryByTestId } = render(<AddTask showMain />);
        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-content')).toBeTruthy();
        expect(queryByTestId('add-task-main')).toBeTruthy();
  
        fireEvent.change(queryByTestId('add-task-content'), {
          target: { value: 'I am the most amazing task ever!' },
        });
        expect(queryByTestId('add-task-content').value).toBe(
          'I am the most amazing task ever!'
        );
  
        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy();
  
        fireEvent.click(queryByTestId('task-date-tomorrow'));
        expect(queryByTestId('task-date-overlay')).toBeFalsy();
  
        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy();
  
        fireEvent.keyDown(queryByTestId('task-date-tomorrow'));
        expect(queryByTestId('task-date-overlay')).toBeFalsy();
  
        fireEvent.click(queryByTestId('add-task'));
      });
  
      it('renders <AddTask /> and adds a task with a task date of NEXT_7', () => {
        useSelectedProjectValue.mockImplementation(() => ({
          selectedProject: '1',
        }));
  
        const { queryByTestId } = render(<AddTask showMain />);
        fireEvent.click(queryByTestId('show-main-action'));
        expect(queryByTestId('add-task-content')).toBeTruthy();
        expect(queryByTestId('add-task-main')).toBeTruthy();
  
        fireEvent.change(queryByTestId('add-task-content'), {
          target: { value: 'I am the most amazing task ever!' },
        });
        expect(queryByTestId('add-task-content').value).toBe(
          'I am the most amazing task ever!'
        );
  
        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy();
  
        fireEvent.click(queryByTestId('task-date-next-week'));
        expect(queryByTestId('task-date-overlay')).toBeFalsy();
  
        fireEvent.click(queryByTestId('show-task-date-overlay'));
        expect(queryByTestId('task-date-overlay')).toBeTruthy();
  
        fireEvent.keyDown(queryByTestId('task-date-next-week'));
        expect(queryByTestId('task-date-overlay')).toBeFalsy();
  
        fireEvent.click(queryByTestId('add-task'));
      });
    
})

import React, {useEffect} from 'react';
import  Checkbox  from './Checkbox';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks';
import { getCollatedTitle, getTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';

const Tasks = () => {
    const {selectedProject} = useSelectedProjectValue();
    const {projects} = useProjectsValue();
    const { tasks } = useTasks(selectedProject);
    let projectName = '';

    if(projects &&
        projects.length > 0 &&
        selectedProject &&
        !collatedTasksExist(selectedProject)){
        projectName = getTitle(projects, selectedProject);
    }

    if(selectedProject && collatedTasksExist(selectedProject)){
        projectName = getCollatedTitle(selectedProject);
    }

    useEffect(() => {
       document.title = `${projectName} - Todoist`;
    })
   
    return (
        <div className="tasks" data-testid="tasks">
            <h2 data-testid="project-name">{projectName}</h2>
            <ul className="tasks__list">
                {tasks.map(task => 
                (<li key={`${task.id}`}>
                    <Checkbox id={task.id} />
                    <span id={`${task.id}`}>{task.task}</span>
                </li>) )}
            </ul>
            <AddTask />
        </div>
    )
}

export default Tasks;
import React,{ useState } from 'react';
import { IndividualProject } from './IndividualProject';
import {useSelectedProjectValue, useProjectsValue } from '../context';

export const Projects = ({activeValue = null}) => {
    const [active, setActive] = useState(activeValue);
    const {setSelectedProject} = useSelectedProjectValue();
    const {projects} = useProjectsValue();

    const setFocus = ({key}) => {
        const firstTask = document.querySelector('.tasks .tasks__list li:nth-child(1) .checkbox-holder')
                            || '';
       if(key === 'Enter' && firstTask){
            firstTask.focus();
       }
    }
    return (
        projects &&
            projects.map(project => 
                (<li 
                    key={project.projectId}
                    data-doc-id={project.docId}
                    className="sidebar__project"
                >
                    <div 
                        type="button"
                        data-testid="project-action"
                        className={active === project.projectId  ?
                             "active " : ""
                            }
                        onClick = {() => {
                            setActive(project.projectId);
                            setSelectedProject(project.projectId);

                        }}
                        onKeyPress={(event) => setFocus(event)}
                        aria-label={`select ${project.name} as the task project`}
                    >
                      <IndividualProject project={project} />
                    </div>
                    
                </li>) 
            )
        
    )

}
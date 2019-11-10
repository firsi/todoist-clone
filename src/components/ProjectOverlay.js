import React from 'react';
import { useProjectsValue } from '../context/Projects-context';

export const ProjectOverlay = ({setProject, showProjectOverlay, setShowProjectOverlay}) => {
    const { projects } = useProjectsValue();

    return (
        projects && showProjectOverlay 
         && (
             <div className="project-overlay" data-testid="project-overlay">
                 <ul className="project-overlay__list">
                     {projects.map(project => (
                         <li 
                            key={project.projectId} 
                            onClick={() => {
                                setProject(project.projectId);
                                setShowProjectOverlay(!showProjectOverlay);
                            }}
                         >
                             <button
                                type="button"
                                data-testid="project-overlay-action"
                                arial-label={`select ${project.name} as the task project`}
                             >
                                {project.name}
                             </button>
                            
                         </li>
                     ))}
                 </ul>
             </div>
         )
    )
}
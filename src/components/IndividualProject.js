import React, { useState, Fragment } from 'react';
import { firebase } from '../firebase';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { FaTrashAlt } from 'react-icons/fa';

export const IndividualProject = ({project}) => {
    const {setSelectedProject} = useSelectedProjectValue();
    const {projects, setProjects} = useProjectsValue();
    const [showConfirm, setShowConfirm] = useState(false);

    const deleteProject = docId => {
        firebase.firestore().collection('projects')
            .doc(docId)
            .delete()
            .then(() => {
                setProjects([...projects])
                setSelectedProject('INBOX');
            });
    }

    return (
        <Fragment>
            <span className="sidebar__dot">•</span>
            <span className="sidebar__project-name">{project.name}</span>
            <span 
                className="sidebar__project-delete" 
                data-testid="delete-project"
                onClick={(event) => {
                    setShowConfirm(!showConfirm)
                    
                }}
            >
                <FaTrashAlt />
                {showConfirm && (
                    <div className="project-delete-modal">
                        <span className="project-delete-modal__inner">
                        <p>Are you sure you want to delete this project?</p>
                        <button
                            aria-label="Delete project"
                            
                            onClick={() => deleteProject(project.docId)}
                        >
                            Delete
                        </button>
                        <button
                            className="cancel-adding-project"
                            onClick={() => setShowConfirm(!showConfirm)}
                            aria-label="Cancel adding project, do not delete"
                        >
                            Cancel
                        </button>
                        </span>
                    </div>
                    )}
            </span>
        </Fragment>
    )
}
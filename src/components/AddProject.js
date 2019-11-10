import React, { useState } from 'react';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectsValue } from '../context';


export const AddProject = ({shouldShow = false}) => {
    const [show, setShow] = useState(shouldShow);
    const [projectName, setProjectName] = useState('');
    const [disabled, setDisabled] = useState(true);
    const {setProjects} = useProjectsValue();
    const projectId = generatePushId();

    const addProject = () => {
        firebase.firestore().collection('projects')
        .add({
            projectId,
            name: projectName,
            userId: 'hrddkdzvMDpdAYDYhwnj'
        })
        .then(() => {
            setProjects([]);
            setProjectName('');
            setShow(false);
        })
    }

    return (
        <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input" data-testid="add-project-inner">
          <input
            value={projectName}
            onChange={e => 
              {setProjectName(e.target.value);
                e.target.value ? setDisabled(false) : setDisabled(true);
              }
            
            }
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit"
            disabled = {disabled}
          >
            Add Project
          </button>
          <button
            aria-label="Cancel adding project"
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        </div>
      )}
      
      {!show && 
        <>
            <span className="add-project__plus">+</span>
            <button
                data-testid="add-project-action"
                className="add-project__text"
                onClick={() => setShow(!show)}
            >
                Add Project
            </button>
        </>
      }
    </div>
    )

}
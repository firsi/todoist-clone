import {useState, useEffect} from 'react';
import { firebase } from '../firebase';

export const useProject = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('projects')
            .where('userId', '==', 'hrddkdzvMDpdAYDYhwnj')
            .orderBy('projectId')
            .get()
            .then(snapshot => {
                const allProjects = snapshot.docs.map(project => ({
                    ...project.data(),
                    docId: project.id
                }));

                if(JSON.stringify(allProjects) !== JSON.stringify(projects)){
                    setProjects(allProjects);
                }
            });
    }, [projects]);

    return {projects, setProjects};
}
import React, { createContext, useContext, useState } from 'react';

export const selectedProjectContext = createContext();

export const SelectedProjectProvider = ({children}) => {
    const [selectedProject, setSelectedProject] = useState('INBOX');
    return (
        <selectedProjectContext.Provider  value={{selectedProject, setSelectedProject}}>
            {children}
        </selectedProjectContext.Provider>
    )
}

export const useSelectedProjectValue = () => useContext(selectedProjectContext);
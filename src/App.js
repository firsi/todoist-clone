import React from 'react';
import './App.scss'
import Header from './components/layouts/Header';
import Content from './components/layouts/Content';
import { SelectedProjectProvider, ProjectsProvider } from './context';

function App() {
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <div className="App" data-testid="application">
          <Header/>
          <Content/>
        </div>
     </ProjectsProvider>
    </SelectedProjectProvider>
  );
}

export default App;

import { collatedTasks } from '../constant';

export const collatedTasksExist = selectedProject => {
    return collatedTasks.find(task => task.key === selectedProject);
}

export const getTitle = (projects, projectId) => {
    return projects.find(project => project.projectId === projectId).name;
}

export const getCollatedTitle = (key) => {
    return collatedTasks.find(task => task.key === key).name
}

export const generatePushId = (() => {
    const PUSH_CHARS =
      '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
  
    const lastRandChars = [];
  
    return function() {
      let now = new Date().getTime();
  
      const timeStampChars = new Array(8);
      for (var i = 7; i >= 0; i--) {
        timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
        now = Math.floor(now / 64);
      }
  
      let id = timeStampChars.join('');
  
      for (i = 0; i < 12; i++) {
        id += PUSH_CHARS.charAt(lastRandChars[i]);
      }
  
      return id;
    };
  })();
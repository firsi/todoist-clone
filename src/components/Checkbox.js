import React from 'react';
import { firebase } from '../firebase';

const Checkbox = ({id}) => {
    const archiveTask = () => {
        firebase.firestore()
        .collection('tasks')
        .doc(id)
        .update({archived : true})
    }
    
    return(
        <div
            className="checkbox-holder"
            data-testid="checkbox-action"
            onClick= {archiveTask}
            role="checkbox"
            aria-selected="true"
            aria-labelledby={id}
            tabIndex={0}
            onKeyPress={(event) => event.key==='Enter' && archiveTask()}
        >
            <span className="checkbox" />
        </div>
    )
}

export default Checkbox;
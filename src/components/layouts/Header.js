import React, {useState} from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
import { AddTask } from '../AddTask';

const Header = () => {
    const [shouldShowMain, setShouldShowMain] = useState(false);
    const [showQuickAddTask, setShowQuickAddTask] = useState(false);

    return(<header className="header" data-testid>
        <nav>
            <div className="logo">
                <p className ="brand">TODOIST</p>
            </div>
            {/* <div className="settings">
                <ul>
                    <li
                        data-testid="quick-add-task-action"
                        className="settings__add"
                        onClick={() => {
                            setShowQuickAddTask(true);
                            setShouldShowMain(true);
                        }}
                    >+</li>
                </ul>
                <AddTask 
                    showAddTaskMain={false}
                    showQuickAddTask={showQuickAddTask}
                    setShowQuickAddTask={setShowQuickAddTask}
                    shouldShowMain={shouldShowMain}
                />
            </div> */}
        </nav>

    </header>)
}

export default Header;
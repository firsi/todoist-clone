import React, { useState } from 'react';
import { useSelectedProjectValue } from '../../context';
import { FaInbox, FaRegCalendar, FaRegCalendarAlt, FaChevronDown } from 'react-icons/fa';
import { Projects } from '../Projects';
import { AddProject } from '../AddProject';

const Sidebar = () => {
    const [active, setActive] = useState('inbox');
    const {setSelectedProject} = useSelectedProjectValue();
    const [showProjects, setShowProjects] = useState(true);

    return (
    <div className="sidebar" data-testid="sidebar">
        <ul className="sidebar__generic">
            <li
          data-testid="inbox"
          className={active === 'inbox' ? 'active' : undefined}
        >
          <div
            data-testid="inbox-action"
            aria-label="Show inbox tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('inbox');
              setSelectedProject('INBOX');
            }}
            onKeyDown={() => {
              setActive('inbox');
              setSelectedProject('INBOX');
            }}
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li
          data-testid="today"
          className={active === 'today' ? 'active' : undefined}
        >
          <div
            data-testid="today-action"
            aria-label="Show today's tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('today');
              setSelectedProject('TODAY');
            }}
            onKeyDown={() => {
              setActive('today');
              setSelectedProject('TODAY');
            }}
          >
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          data-testid="next_7"
          className={active === 'next_7' ? 'active' : undefined}
        >
          <div
            data-testid="next_7-action"
            aria-label="Show tasks for the next 7 days"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('next_7');
              setSelectedProject('NEXT_7');
            }}
            onKeyDown={() => {
              setActive('next_7');
              setSelectedProject('NEXT_7');
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Next 7 days</span>
          </div>
        </li>
        </ul>
        <button 
          className="sidebar__middle" 
          onClick={() => setShowProjects(!showProjects)}
          aria-label="Show/Hide project"
          >
            <span><FaChevronDown className={!showProjects ? 'hidden-projects' : undefined}/></span>
            <h2>Projects</h2>
        </button>
        <ul className="sidebar__projects">
            {showProjects && <Projects />}
        </ul>
        {showProjects && <AddProject />}
    </div>
    )
};

export default Sidebar;
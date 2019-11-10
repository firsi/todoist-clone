import React from 'react';
import Sidebar from './Sidebar';
import  Tasks  from '../Tasks';

const Content = () => (
    <section className="content">
        <Sidebar />
        <Tasks />
    </section>
)

export default Content;
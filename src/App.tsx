// src/App.tsx
import React from 'react';
import {TaskForm} from "./componenets/TaskForm";
import {TaskList} from "./componenets/TaskList";
import './index.css';

export default function App() {
    return (
        <div className="app-container">
            <div className="form-pane">
                <div className="form-box">
                    <h2>Add a Task</h2>
                    <TaskForm />
                </div>
            </div>
            <div className="divider" />
            <div className="list-pane">
                <h2>Your Tasks</h2>
                <TaskList />
            </div>
        </div>
    );
}

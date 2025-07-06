import React from 'react';
import { useGetTasksQuery, useMarkDoneMutation } from '../features/tasks/tasksApi';

export function TaskList() {
    const { data: tasks = [], isLoading, error, refetch } = useGetTasksQuery();
    const [markDone] = useMarkDoneMutation();

    if (isLoading) return <p>Loading tasks…</p>;
    if (error)     return <p style={{ color: 'red' }}>Error loading tasks</p>;

    return (
        <>
            {tasks.map(t => (
                <div key={t.id} className="task-card">
                    <div>
                        <h3>{t.title}</h3>
                        {t.description && <p>{t.description}</p>}
                    </div>
                    <button onClick={async () => { await markDone(t.id).unwrap(); refetch(); }}>
                        Done
                    </button>
                </div>
            ))}
        </>
    );
}

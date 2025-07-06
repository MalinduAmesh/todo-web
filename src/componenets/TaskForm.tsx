import { useState } from 'react';
import { useCreateTaskMutation } from '../features/tasks/tasksApi';
import type { TaskRequest } from '../store/types/Task';

export function TaskForm() {
    const [title, setTitle] = useState('');
    const [desc,  setDesc]   = useState('');
    const [createTask, { isLoading }] = useCreateTaskMutation();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        await createTask({ title, description: desc } as TaskRequest).unwrap();
        setTitle(''); setDesc('');
    };

    return (
        <form onSubmit={submit}>
            <label>
                Title
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    disabled={isLoading}
                    required
                />
            </label>
            <label>
                Description
                <textarea
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    placeholder="Description"
                    disabled={isLoading}
                />
            </label>
            <button type="submit" className="add-btn" disabled={isLoading}>
                {isLoading ? 'Adding…' : 'Add'}
            </button>
        </form>
    );
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    createdAt: string;
    completed: boolean;
}

export interface TaskRequest {
    title: string;
    description?: string;
}

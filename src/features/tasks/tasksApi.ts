import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task, TaskRequest } from '../../store/types/Task';

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8081',
    }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        //  Fetches the 5 most recent uncompleted tasks.
        getTasks: builder.query<Task[], void>({
            query: () => '/tasks?limit=5',
            providesTags: (result = []) => [
                // Tag each individual task by its ID for fine-grained invalidation
                ...result.map(({ id }) => ({ type: 'Task' as const, id })),
                { type: 'Task' as const, id: 'LIST' },
            ],
        }),

        // Creates a new task from the request body.
        createTask: builder.mutation<Task, TaskRequest>({
            query: (task) => ({
                url: '/tasks',
                method: 'POST',
                body: task,
            }),
            invalidatesTags: [{ type: 'Task', id: 'LIST' }],
        }),

        // Marks an existing task as completed.
        markDone: builder.mutation<void, number>({
            query: (id) => ({
                url: `/tasks/${id}/done`,
                method: 'POST',
            }),

            invalidatesTags: (result, error, id) => [
                { type: 'Task' as const, id }, // invalidate the specific task
                { type: 'Task' as const, id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useMarkDoneMutation,
} = tasksApi;

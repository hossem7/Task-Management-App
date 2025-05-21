import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

export interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
    createdAt: string;
}

// create an axios instance pre‑configured with base URL
const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
})

// Lightweight axios-based client for Task API endpoints.
// Each function returns the server response body as a typed Promise.

// returns all tasks
export const GetTasks = (): Promise<Task[]> =>
    api.get<Task[]>('/tasks/getTasks').then(res => res.data)

// create a single task
export const CreateTask = (t: string): Promise<Task> =>
    api.post<Task>('/tasks/createTask', { title: t }).then(res => res.data)

// toggles a task’s completion
export const UpdateCompletionStatus = (id: number): Promise<Task> =>
    api.patch<Task>(`/tasks/${id}/toggleTask`).then((res) => res.data);

// deletes the specified task
export const DeleteTask = (id: number): Promise<void> =>
    api.delete(`/tasks/${id}/deleteTask`).then(() => {});

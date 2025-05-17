import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

export interface Task {
    Id: number;
    Title: string;
    IsCompleted: boolean;
    CreatedAt: string;
}

// create an axios instance pre‑configured with your base URL
const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
})

export const GetTasks = (): Promise<Task[]> =>
    api.get<Task[]>('/tasks').then(res => res.data)

export const CreateTask = (title: string): Promise<Task> =>
    api.post<Task>('/tasks', { Title: title }).then(res => res.data)

export const UpdateCompletionStatus = (id: number): Promise<Task> =>
    api.patch<Task>(`/tasks/${id}/toggle`).then((res) => res.data);

export const DeleteTask = (id: number): Promise<void> =>
    api.delete(`/tasks/${id}`).then(() => {})

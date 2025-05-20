/// <reference types="vitest" />
import { vi, type Mock } from "vitest";

vi.mock("axios", () => {
    const mockApi = {
        get: vi.fn(),
        post: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    };
    return {
        default: {
            // whenever TaskController does axios.create(), it gets back mockApi
            create: () => mockApi,
        },
    };
});

import {
    GetTasks,
    CreateTask,
    UpdateCompletionStatus,
    DeleteTask,
    type Task,
} from "./TaskController";

// Bring in the *same* mockApi by calling axios.create()
import axios from "axios";
const mockApi = (axios.create as Mock)();

beforeEach(() => {
    vi.clearAllMocks();
});

describe("TaskController API functions", () => {
    test("GetTasks calls GET /tasks/getTasks and returns data", async () => {
        const tasks: Task[] = [
            {
                id: 1,
                title: "Test",
                isCompleted: false,
                createdAt: "2025-05-20T00:00:00Z",
            },
        ];
        mockApi.get.mockResolvedValue({ data: tasks });

        const result = await GetTasks();

        expect(mockApi.get).toHaveBeenCalledWith("/tasks/getTasks");
        expect(result).toEqual(tasks);
    });

    test("CreateTask calls POST /tasks/createTask with payload and returns new task", async () => {
        const newTask: Task = {
            id: 2,
            title: "New",
            isCompleted: false,
            createdAt: "2025-05-21T00:00:00Z",
        };
        mockApi.post.mockResolvedValue({ data: newTask });

        const result = await CreateTask("New");

        expect(mockApi.post).toHaveBeenCalledWith("/tasks/createTask", {
            title: "New",
        });
        expect(result).toEqual(newTask);
    });

    test("UpdateCompletionStatus calls PATCH /tasks/{id}/toggleTask and returns updated task", async () => {
        const updated: Task = {
            id: 3,
            title: "Toggle",
            isCompleted: true,
            createdAt: "2025-05-22T00:00:00Z",
        };
        mockApi.patch.mockResolvedValue({ data: updated });

        const result = await UpdateCompletionStatus(3);

        expect(mockApi.patch).toHaveBeenCalledWith("/tasks/3/toggleTask");
        expect(result).toEqual(updated);
    });

    test("DeleteTask calls DELETE /tasks/{id}/deleteTask and resolves void", async () => {
        mockApi.delete.mockResolvedValue({});

        const result = await DeleteTask(4);

        expect(mockApi.delete).toHaveBeenCalledWith("/tasks/4/deleteTask");
        expect(result).toBeUndefined();
    });
});

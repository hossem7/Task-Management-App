/// <reference types="vitest" />
import { act, useEffect } from "react";
import { render, screen, waitFor, fireEvent, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, type Mock } from "vitest";

// 1) Mock all the API functions your context uses:
vi.mock("../api/TaskController", () => ({
    GetTasks: vi.fn(),
    CreateTask: vi.fn(),
    UpdateCompletionStatus: vi.fn(),
    DeleteTask: vi.fn(),
}));

import {
    GetTasks,
    CreateTask,
    UpdateCompletionStatus,
    DeleteTask,
} from "../api/TaskController";

import { TasksProvider, useTasks } from "./TasksContext";

// 2) A little helper component that lets us probe the context
function TestConsumer() {
    const {
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        toggleCompletion,
        removeTask,
    } = useTasks();

    // on mount, kick off a fetchTasks so we can test initial load
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <div>
            <div data-testid="loading">{String(loading)}</div>
            <div data-testid="error">{error?.message || ""}</div>
            <ul data-testid="tasks">
                {tasks.map((t) => (
                    <li key={t.id} data-testid={`task-${t.id}`}>
                        {t.title} | {t.isCompleted ? "✔" : "–"}
                        <button onClick={() => toggleCompletion(t.id)}>
                            toggle
                        </button>
                        <button onClick={() => removeTask(t.id)}>del</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addTask("X")}>add-X</button>
        </div>
    );
}

describe("TasksContext", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("fetchTasks: sets loading, then populates tasks on success", async () => {
        // Arrange: mock GetTasks to resolve two items
        (GetTasks as Mock).mockResolvedValue([
            { id: 1, title: "A", isCompleted: false, createdAt: "d" },
            { id: 2, title: "B", isCompleted: true, createdAt: "d" },
        ]);

        render(
            <TasksProvider>
                <TestConsumer />
            </TasksProvider>
        );

        // loading should briefly be true
        expect(screen.getByTestId("loading").textContent).toBe("true");
        // after the Promise resolves...
        await waitFor(() => {
            expect(screen.getByTestId("loading").textContent).toBe("false");
        });

        // no error
        expect(screen.getByTestId("error").textContent).toBe("");
        // both items rendered
        expect(screen.getByTestId("task-1")).toHaveTextContent("A | –");
        expect(screen.getByTestId("task-2")).toHaveTextContent("B | ✔");
    });

    test("fetchTasks: on error populates error message", async () => {
        (GetTasks as Mock).mockRejectedValue(new Error("fetch fail"));

        render(
            <TasksProvider>
                <TestConsumer />
            </TasksProvider>
        );

        // wait for the context to catch the error
        await waitFor(() => {
            expect(screen.getByTestId("loading").textContent).toBe("false");
            expect(screen.getByTestId("error")).toHaveTextContent("fetch fail");
        });
    });

    test("addTask: calls CreateTask and appends new task", async () => {
        const mockGet = GetTasks as Mock;
        const newTask = {
            id: 3,
            title: "X",
            isCompleted: false,
            createdAt: "d",
        };

        // no tasks initially, then only the new one thereafter
        mockGet
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([newTask])
            .mockResolvedValue([newTask]);

        (CreateTask as Mock).mockResolvedValue(newTask);

        render(
            <TasksProvider>
                <TestConsumer />
            </TasksProvider>
        );

        await waitFor(() =>
            expect(screen.getByTestId("loading").textContent).toBe("false")
        );

        act(() => {
            fireEvent.click(screen.getByText("add-X"));
        });

        expect(CreateTask).toHaveBeenCalledWith("X");

        await waitFor(() =>
            expect(screen.getByTestId("task-3")).toHaveTextContent("X | –")
        );
    });

    test("toggleCompletion: flips a task’s isCompleted", async () => {
        // seed with one item
        (GetTasks as Mock).mockResolvedValue([
            { id: 5, title: "T", isCompleted: false, createdAt: "d" },
        ]);
        (UpdateCompletionStatus as Mock).mockResolvedValue({
            id: 5,
            title: "T",
            isCompleted: true,
            createdAt: "d",
        });

        render(
            <TasksProvider>
                <TestConsumer />
            </TasksProvider>
        );
        await waitFor(() =>
            expect(screen.getByTestId("loading").textContent).toBe("false")
        );

        // click that task’s toggle button
        act(() => {
            fireEvent.click(screen.getByText("toggle"));
        });

        // API call
        expect(UpdateCompletionStatus).toHaveBeenCalledWith(5);
        // and UI updates
        await waitFor(() => {
            expect(screen.getByTestId("task-5")).toHaveTextContent(
                /T | -toggledel/
            );
        });
    });

    test("fetches initial tasks and then removes one by id", async () => {
        const sample = {
            id: 9,
            title: "Bye",
            isCompleted: false,
            createdOn: "d",
        };
        // mock initial fetch to return sample
        (GetTasks as Mock).mockResolvedValue([sample]);
        (DeleteTask as Mock).mockResolvedValue({});

        // render the hook under the provider
        const { result } = renderHook(() => useTasks(), {
            wrapper: TasksProvider,
        });

        // 1) manually invoke fetchTasks
        await act(async () => {
            await result.current.fetchTasks();
        });
        // now tasks should contain our sample
        expect(result.current.tasks).toEqual([sample]);

        // 2) invoke removeTask
        await act(async () => {
            await result.current.removeTask(9);
        });
        // tasks should now be empty
        expect(result.current.tasks).toEqual([]);
        // and DeleteTask should have been called correctly
        expect(DeleteTask).toHaveBeenCalledWith(9);
    });
});

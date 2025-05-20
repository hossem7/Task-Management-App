/// <reference types="vitest" />
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, type Mock } from "vitest";
import { ListView } from "./ListView";
import { useTasks } from "../../context/TasksContext";

// Mock the context hook
vi.mock("../../context/tasksContext", () => ({
    useTasks: vi.fn(),
}));

describe("ListView Component", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    // sample tasks: two uncompleted, one completed, with differing dates
    const sampleTasks = [
        {
            id: 1,
            title: "Oldest Uncompleted",
            isCompleted: false,
            createdAt: "2025-05-18T09:00:00Z",
        },
        {
            id: 2,
            title: "Newest Uncompleted",
            isCompleted: false,
            createdAt: "2025-05-19T10:00:00Z",
        },
        {
            id: 3,
            title: "Completed Task",
            isCompleted: true,
            createdAt: "2025-05-17T08:00:00Z",
        },
    ];

    beforeEach(() => {
        // Provide mock data & handlers
        (useTasks as unknown as Mock).mockReturnValue({
            tasks: sampleTasks,
            loading: false,
            error: null,
            toggleCompletion: mockToggle,
            removeTask: mockDelete,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders tasks in the correct order", () => {
        render(<ListView />);

        const titles = screen
            .getAllByTestId("task-title")
            .map((el) => el.textContent);

        // Expect uncompleted (oldest then newest), then completed last
        expect(titles).toEqual([
            "Oldest Uncompleted",
            "Newest Uncompleted",
            "Completed Task",
        ]);
    });

    test("shows loading indicator when loading", () => {
        (useTasks as unknown as Mock).mockReturnValueOnce({
            tasks: [],
            loading: true,
            error: null,
            toggleCompletion: mockToggle,
            removeTask: mockDelete,
        });
        render(<ListView />);
        expect(screen.getByText("Loading tasks…")).toBeInTheDocument();
    });

    test("shows error message when there is an error", () => {
        (useTasks as unknown as Mock).mockReturnValueOnce({
            tasks: [],
            loading: false,
            error: new Error("Fetch failed"),
            toggleCompletion: mockToggle,
            removeTask: mockDelete,
        });
        render(<ListView />);
        expect(screen.getByText("Error: Fetch failed")).toBeInTheDocument();
    });
});

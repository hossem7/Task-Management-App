/// <reference types="vitest" />
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { within } from "@testing-library/dom";
import { vi, type Mock } from "vitest";
import { BoardView } from "./BoardView";
import { useTasks } from "../../context/TasksContext";

vi.mock("../../context/tasksContext", () => ({
    useTasks: vi.fn(),
}));

describe("BoardView Component", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    const sampleTasks = [
        {
            id: 1,
            title: "Task A",
            isCompleted: false,
            createdOn: "2025-05-20T08:00:00Z",
        },
        {
            id: 2,
            title: "Task B",
            isCompleted: true,
            createdOn: "2025-05-19T09:00:00Z",
        },
        {
            id: 3,
            title: "Task C",
            isCompleted: false,
            createdOn: "2025-05-18T10:00:00Z",
        },
    ];

    beforeEach(() => {
        (useTasks as unknown as Mock).mockReturnValue({
            tasks: sampleTasks,
            toggleCompletion: mockToggle,
            removeTask: mockDelete,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders two columns with the correct headers", () => {
        render(<BoardView />);
        expect(screen.getByText("To Do")).toBeInTheDocument();
        expect(screen.getByText("Completed")).toBeInTheDocument();
    });

    test("places uncompleted tasks in the To Do column", () => {
        render(<BoardView />);
        const todoColumn = screen.getByText("To Do").closest("div")!;
        const { getByText, queryByText } = within(todoColumn);

        expect(getByText("Task A")).toBeInTheDocument();
        expect(getByText("Task C")).toBeInTheDocument();
        expect(queryByText("Task B")).toBeNull();
    });

    test("places completed tasks in the Completed column", () => {
        render(<BoardView />);
        const doneColumn = screen.getByText("Completed").closest("div")!;
        const { getByText, queryByText } = within(doneColumn);

        expect(getByText("Task B")).toBeInTheDocument();
        expect(queryByText("Task A")).toBeNull();
    });
});

/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { AddTasksModal } from "./AddTaskModal";
import { useTasks } from "../../context/TasksContext";

// stub matchMedia for AntD Modal/rc-util during tests
if (!window.matchMedia) {
    window.matchMedia = (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    });
}

// Mock the tasks context
vi.mock("../../context/tasksContext", () => ({
    useTasks: vi.fn(),
}));

describe("AddTaskModal Component", () => {
    const mockAddTask = vi.fn();
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useTasks as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            addTask: mockAddTask,
        });
    });

    test("does not render when visible is false", () => {
        render(<AddTasksModal visible={false} onClose={mockOnClose} />);
        expect(screen.queryByText("Add New Task")).toBeNull();
    });

    test("renders modal when visible is true", () => {
        render(<AddTasksModal visible={true} onClose={mockOnClose} />);
        expect(screen.getByText("Add New Task")).toBeInTheDocument();
        // Input labeled "Task Name" should exist
        expect(screen.getByLabelText("Task Name")).toBeInTheDocument();
    });

    test("calls addTask and onClose with valid input", async () => {
        render(<AddTasksModal visible={true} onClose={mockOnClose} />);
        const input = screen.getByLabelText("Task Name");
        fireEvent.change(input, { target: { value: "New Task Name" } });

        const createButton = screen.getByRole("button", { name: "Create" });
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(mockAddTask).toHaveBeenCalledWith("New Task Name");
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });

    test("shows validation error and does not call addTask when input is empty", async () => {
        render(<AddTasksModal visible={true} onClose={mockOnClose} />);
        const createButton = screen.getByRole("button", { name: "Create" });
        fireEvent.click(createButton);

        // AntD displays validation message
        expect(
            await screen.findByText("Please enter a task name")
        ).toBeInTheDocument();
        expect(mockAddTask).not.toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();
    });
});

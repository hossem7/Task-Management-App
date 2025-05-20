/// <reference types="vitest" />
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TaskItem } from "./TaskItem";

describe("TaskItem Component", () => {
    const sampleTask = {
        id: 1,
        title: "Sample Task Title",
        isCompleted: false,
        createdAt: "2025-05-19T12:34:56Z",
    };
    const handleToggle = vi.fn();
    const handleDelete = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        render(
            <TaskItem
                task={sampleTask}
                onToggle={handleToggle}
                onDelete={handleDelete}
            />
        );
    });

    test("displays the task title and creation date", () => {
        expect(screen.getByText("Sample Task Title")).toBeInTheDocument();
        // date formatted via toLocaleDateString()
        expect(screen.getByText(/Created on: 2025-05-19/)).toBeInTheDocument();
    });

    test("checkbox reflects completion and calls onToggle", () => {
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();

        fireEvent.click(checkbox);
        expect(handleToggle).toHaveBeenCalledWith(sampleTask.id);
    });

    test("renders delete button and calls onDelete", () => {
        const deleteBtn = screen.getByLabelText("Delete task");
        fireEvent.click(deleteBtn);
        expect(handleDelete).toHaveBeenCalledWith(sampleTask.id);
    });
});

/// <reference types="vitest" />
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TaskCard } from "./TaskCard";

describe("TaskCard Component", () => {
    const sampleTask = {
        id: 1,
        title: "My Task Title",
        isCompleted: false,
        createdAt: "2025-05-19T12:34:56Z",
    };
    const handleDelete = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        render(<TaskCard task={sampleTask} onDelete={handleDelete} />);
    });

    test("renders the task title and formatted date", () => {
        // Assert Title
        expect(screen.getByText("My Task Title")).toBeInTheDocument();
        // Date formatted via toLocaleDateString()
        expect(screen.getByText(/Created on: 2025-05-19/)).toBeInTheDocument();
    });

    test("calls onDelete when the delete icon is clicked", () => {
        // the delete icon has aria-label="Delete task"
        const deleteBtn = screen.getByRole("button", { name: "Delete task" });
        fireEvent.click(deleteBtn);
        expect(handleDelete).toHaveBeenCalledWith(sampleTask.id);
    });
});

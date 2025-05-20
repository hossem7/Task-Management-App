/// <reference types="vitest" />
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { TasksPage } from "./TasksPage";
import { ViewToggle } from "../components/ViewToggle/ViewToggle";

ViewToggle

// Mock child components
vi.mock("../components/ViewToggle/ViewToggle", () => ({
    ViewToggle: (props: any) => (
        <div
            data-testid="view-toggle"
            data-mode={props.mode}
            onClick={() => props.onChange("board")}
        />
    ),
}));
vi.mock("../components/AddTask/AddTaskButton", () => ({
    AddTaskButton: (props: any) => (
        <button data-testid="add-btn" onClick={props.onClick}>
            Add Task
        </button>
    ),
}));
vi.mock("../components/AddTask/AddTaskModal", () => ({
    AddTasksModal: () => <div data-testid="modal" />,
}));
vi.mock("../components/ListView/ListView", () => ({
    ListView: () => <div data-testid="list-view" />,
}));
vi.mock("../components/BoardView/BoardView", () => ({
    BoardView: () => <div data-testid="board-view" />,
}));

describe("TasksPage Component", () => {
    test("renders toggle, add button, and default list view", () => {
        render(<TasksPage />);
        expect(screen.getByTestId("view-toggle")).toHaveAttribute(
            "data-mode",
            "list"
        );
        expect(screen.getByTestId("add-btn")).toBeInTheDocument();
        expect(screen.getByTestId("list-view")).toBeInTheDocument();
    });

    test("switches to board view when toggle onChange fires", () => {
        render(<TasksPage />);
        
        fireEvent.click(screen.getByTestId("view-toggle"));
        expect(screen.getByTestId("board-view")).toBeInTheDocument();
    });
});

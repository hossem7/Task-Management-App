/// <reference types="vitest" />
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ViewToggle } from "./ViewToggle";

describe("ViewToggle Component", () => {
    test("renders both views and highlights the active one", () => {
        render(<ViewToggle mode="list" onChange={() => {}} />);

        const listRadio = screen.getByRole("radio", { name: "List View" });
        const boardRadio = screen.getByRole("radio", { name: "Board View" });

        expect(listRadio).toBeChecked();
        expect(boardRadio).not.toBeChecked();
    });

    test('correctly highlights board when mode is changed to "board"', () => {
        render(<ViewToggle mode="board" onChange={() => {}} />);

        const listRadio = screen.getByRole("radio", { name: "List View" });
        const boardRadio = screen.getByRole("radio", { name: "Board View" });

        expect(boardRadio).toBeChecked();
        expect(listRadio).not.toBeChecked();
    });
});

/// <reference types="vitest" />
import { act, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { showNotification } from "./Notification";

describe("showNotification()", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        document.body.innerHTML = "";
    });

    test("renders a toast and auto‑removes after 3s", () => {
        act(() => showNotification("Hello World", "success"));
        expect(
            screen.getByText(
                (t) => typeof t === "string" && t.includes("Hello World")
            )
        ).toBeInTheDocument();

        act(() => vi.advanceTimersByTime(3000));

        expect(
            screen.queryByText(
                (t) => typeof t === "string" && t.includes("Hello World")
            )
        ).toBeNull();
    });

    test("removes the toast immediately when its close button is clicked", () => {
        // Show the toast
        act(() => showNotification("Click to close", "error"));

        // Immediately grab it by text
        const toast = screen.getByText(
            (t) => typeof t === "string" && t.includes("Click to close")
        );
        expect(toast).toBeInTheDocument();

        // Find its close <button> and click it inside act
        const closeBtn = toast
            .closest("div")! /* container */
            .querySelector("button")!;
        act(() => fireEvent.click(closeBtn));

        // Assert it's gone immediately
        expect(
            screen.queryByText(
                (t) => typeof t === "string" && t.includes("Click to close")
            )
        ).toBeNull();
    });
});

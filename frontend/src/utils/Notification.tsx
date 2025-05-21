import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import styled, { keyframes } from "styled-components";

type NotificationType = "success" | "error";

interface ToastProps {
    message: string;
    type: NotificationType;
    onDone: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(20px); }
`;

const ToastWrapper = styled.div<{ type: NotificationType }>`
    position: fixed;
    bottom: 16px;
    right: 16px;
    background: ${({ type }) => (type === "success" ? "#f6ffed" : "#fff2f0")};
    border: 1px solid
        ${({ type }) => (type === "success" ? "#52c41a" : "#ff4d4f")};
    color: ${({ type }) => (type === "success" ? "#389e0d" : "#a8071a")};
    padding: 12px 10px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    font-size: 14px;
    animation: ${fadeIn} 0.3s ease-out, ${fadeOut} 0.3s ease-in 2.7s;
    animation-fill-mode: forwards;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: inherit;
    font-size: 16px;
    margin-right: 8px;
    cursor: pointer;
    line-height: 1;
`;

const Toast: React.FC<ToastProps> = ({ message, type, onDone }) => {
    const timerRef = useRef<number>(0);

    useEffect(() => {
        timerRef.current = window.setTimeout(onDone, 3000);
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [onDone]);

    const handleClose = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        onDone();
    };

    return (
        <ToastWrapper type={type}>
            <CloseButton onClick={handleClose}>×</CloseButton>
            {message}
        </ToastWrapper>
    );
};

// since react renders two toasts, which sits in the same spot -
// I have to click twice twice to dismiss it. In React 18,
// <React.StrictMode> cause this issue because it runs the
// component twice on mount. Fix - Deduplicate toasts
let activeContainer: HTMLElement | null = null;

// showNotification will mount a transient React root,
// display the toast, then unmount after 3s.
export function showNotification(
    message: string,
    type: NotificationType = "success"
) {
    // if a toast is already showing, clear it first
    if (activeContainer) {
        activeContainer.remove();
        activeContainer = null;
    }
    const container = document.createElement("div");
    document.body.appendChild(container);
    activeContainer = container;
    const root = createRoot(container);

    const cleanup = () => {
        root.unmount();
        container.remove();
        activeContainer = null;
    };

    root.render(<Toast message={message} type={type} onDone={cleanup} />);
}

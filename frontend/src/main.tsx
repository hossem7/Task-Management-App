import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TasksProvider } from "./context/TasksContext.tsx";

// wraps App in TasksProvider so that task state/actions are available everywhere.
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <TasksProvider>
            <App />
        </TasksProvider>
    </StrictMode>
);

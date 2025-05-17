import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TasksProvider } from "./context/TasksContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <TasksProvider>
            <App />
        </TasksProvider>
    </StrictMode>
);

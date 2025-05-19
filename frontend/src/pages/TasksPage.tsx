import React, { useEffect, useState } from "react";
import { ViewToggle, type ViewMode } from "../components/ViewToggle/ViewToggle";
import { ListView } from "../components/ListView/ListView";
import { AddTaskButton } from "../components/AddTask/AddTaskButton";
import { AddTasksModal } from "../components/AddTask/AddTaskModal";
import { BoardView } from "../components/BoardView/BoardView";

const BREAKPOINT = 800; // BoardView max-width

export const TasksPage: React.FC = () => {
    const [mode, setMode] = useState<ViewMode>("list");
    const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINT);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < BREAKPOINT);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <div>
            {!isMobile && <ViewToggle mode={mode} onChange={setMode} />}
            <AddTaskButton onClick={() => setShowAddModal(true)} />
            <AddTasksModal
                visible={showAddModal}
                onClose={() => setShowAddModal(false)}
            />
            {mode === "list" ? <ListView /> : <BoardView />}
        </div>
    );
};

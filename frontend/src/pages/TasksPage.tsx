import React, { useState } from "react";
import { ViewToggle, type ViewMode } from "../components/ViewToggle/ViewToggle";
import { ListView } from "../components/ListView/ListView";
import { AddTaskButton } from "../components/AddTask/AddTaskButton";
import { AddTasksModal } from "../components/AddTask/AddTaskModal";

export const TasksPage: React.FC = () => {
    const [mode, setMode] = useState<ViewMode>("list");

    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div>
            <ViewToggle mode={mode} onChange={setMode} />
            <AddTaskButton onClick={() => setShowAddModal(true)} />
            <AddTasksModal
                visible={showAddModal}
                onClose={() => setShowAddModal(false)}
            />
            {mode === "list" ? <ListView /> : "<BoardView />"}
        </div>
    );
};

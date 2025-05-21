import React from "react";
import styled from "styled-components";
import { TaskItem } from "./TaskItem";
import { useTasks } from "../../context/TasksContext";

const ListContainer = styled.div`
    padding: 16px;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
`;

export const ListView: React.FC = () => {
    const { tasks, loading, error, toggleCompletion, removeTask } = useTasks();

    if (loading) return <p>Loading tasks…</p>;
    if (error) return <p>Error: {error.message}</p>;

    // 1. Sort uncompleted tasks by creation timestamp ascending (oldest first)
    const uncompleted = tasks
        .filter((t) => !t.isCompleted)
        .sort(
            (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
        );

    // 2. Sort completed tasks by creation timestamp ascending
    const completed = tasks
        .filter((t) => t.isCompleted)
        .sort(
            (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
        );

    // 3. New tasks go to bottom of uncompleted, and completed at the end
    const sortedTasks = [...uncompleted, ...completed];
    
    return (
        <ListContainer>
            {sortedTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleCompletion}
                    onDelete={removeTask}
                />
            ))}
        </ListContainer>
    );
};

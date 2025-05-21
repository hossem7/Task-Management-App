import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { useTasks } from '../../context/TasksContext';
import { TaskCard } from './TaskCard';

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
`;

const BoardContainer = styled.div`
    display: flex;
    gap: 16px;
    padding: 16px;
    width: 100%;
    box-sizing: border-box;
`;

const Column = styled.div`
    flex: 1;
    background: #f5f7fa;
    border-radius: 8px;
    padding: 16px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;

const ColumnHeader = styled.h2`
    text-align: center;
    margin-bottom: 12px;
`;

// A Kanban style board with To Do and Completed Column
// When a task is moved between each column, the toggle endpoint is triggered, changing the toggle status
// Note: Used Hello Pangea's DND to achieve the drag and drop

export const BoardView: React.FC = () => {
    const { tasks, toggleCompletion, removeTask } = useTasks();

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const from = result.source.droppableId;
        const to = result.destination.droppableId;
        if (from !== to) {
            const id = Number(result.draggableId);
            toggleCompletion(id);
        }
    };

    const todoTasks = tasks.filter((t) => !t.isCompleted);
    const doneTasks = tasks.filter((t) => t.isCompleted);

    return (
        <Wrapper>
            <DragDropContext onDragEnd={onDragEnd}>
                <BoardContainer>
                    <Droppable droppableId="todo">
                        {(provided) => (
                            <Column
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <ColumnHeader>To Do</ColumnHeader>
                                {todoTasks.map((task, idx) => (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id.toString()}
                                        index={idx}
                                    >
                                        {(prov) => (
                                            <div
                                                ref={prov.innerRef}
                                                {...prov.draggableProps}
                                                {...prov.dragHandleProps}
                                            >
                                                <TaskCard
                                                    task={task}
                                                    onDelete={removeTask}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Column>
                        )}
                    </Droppable>
                    <Droppable droppableId="completed">
                        {(provided) => (
                            <Column
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <ColumnHeader>Completed</ColumnHeader>
                                {doneTasks.map((task, idx) => (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id.toString()}
                                        index={idx}
                                    >
                                        {(prov) => (
                                            <div
                                                ref={prov.innerRef}
                                                {...prov.draggableProps}
                                                {...prov.dragHandleProps}
                                            >
                                                <TaskCard
                                                    task={task}
                                                    onDelete={removeTask}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Column>
                        )}
                    </Droppable>
                </BoardContainer>
            </DragDropContext>
        </Wrapper>
    );
};

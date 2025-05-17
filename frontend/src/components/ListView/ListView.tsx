import React from 'react';
import styled from 'styled-components';
import { TaskItem } from '../TaskItem/TaskItem';
import { useTasks } from '../../context/TasksContext';

const ListContainer = styled.div`
  padding: 16px;
  max-width: 480px;
  margin: 0 auto;
`;

export const ListView: React.FC = () => {
  const { tasks, loading, error, toggleCompletion, removeTask } = useTasks();

  if (loading) return <p>Loading tasks…</p>;
  if (error)   return <p>Error: {error.message}</p>;

  return (
    <ListContainer>
      {tasks.map((task) => (
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
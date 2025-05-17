import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';
import type { Task } from '../../api/TaskController';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const ItemContainer = styled.div<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
  ${({ $completed }) =>
    $completed &&
    css`
      background: linear-gradient(
        90deg,
        rgba(74,144,226,0.1),
        rgba(74,144,226,0.05)
      );
    `}
`;

const Checkbox = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid #4a90e2;
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    opacity: ${({ checked }) => (checked ? 3 : 0)};
    transition: opacity 0.2s;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div<{ $completed: boolean }>`
  font-size: 16px;
  color: ${({ $completed }) => ($completed ? '#888' : '#111')};
  margin-bottom: 4px;
`;

const CreatedAt = styled.div`
  font-size: 12px;
  color: #666;
`;

const DeleteBtn = styled(DeleteOutlined)`
  font-size: 18px;
  color: #e74c3c;
  cursor: pointer;
  margin-left: 12px;
`;

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
}) => {
  return (
    <ItemContainer $completed={task.isCompleted}>
      <Checkbox
        checked={task.isCompleted}
        onClick={() => onToggle(task.id)}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="#4a90e2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 10l-2-2 1-1 1 1 3-3 1 1-4 4z" />
        </svg>
      </Checkbox>

      <Content>
        <Title $completed={task.isCompleted}>{task.title}</Title>
        <CreatedAt>
          Created on: {new Date(task.createdAt).toLocaleDateString()}
        </CreatedAt>
      </Content>

      <DeleteBtn onClick={() => onDelete(task.id)} />
    </ItemContainer>
  );
};
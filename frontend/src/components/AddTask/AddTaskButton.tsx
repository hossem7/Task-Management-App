import React from 'react';
import styled from 'styled-components';

interface AddTaskButtonProps {
  onClick: () => void;
}

const Button = styled.button`
  background-color: #28a745;  /* green */
  color: #fff;                /* white text */
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin: 16px auto;          /* center under toggle */
  display: block;

  &:hover {
    background-color: #218838;
  }
`;

export const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => (
  <Button onClick={onClick}>Add Task</Button>
);
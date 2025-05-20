import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Card from "antd/es/card";
import Checkbox from "antd/es/checkbox";
import Tooltip from 'antd/es/tooltip';
import styled, { css } from "styled-components";
import type { Task } from "../../api/TaskController";

interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

//  Wrap AntD Card so we can control padding, border-radius, and gradient
const StyledCard = styled(Card)<{ $completed: boolean }>`
    && {
        margin-bottom: 10px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    ${({ $completed }) =>
        $completed &&
        css`
            && {
                background: linear-gradient(
                    90deg,
                    rgba(74, 144, 226, 0.1),
                    rgba(74, 144, 226, 0.05)
                );
            }
        `}
    .ant-card-body {
        display: flex;
        align-items: center;
        padding: 12px;
    }
`;

// Style the Checkbox inner circle, and spacing
const StyledCheckbox = styled(Checkbox)`
    &.ant-checkbox-wrapper {
        margin-right: 18px;
    }
    .ant-checkbox-inner {
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }
`;

const Content = styled.div`
    flex: 1;
`;

const Title = styled.div<{ $completed: boolean }>`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ $completed }) => ($completed ? "#888" : "#111")};
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 240px; /* approximately 30 chars at ~8px each */
`;

const CreatedAt = styled.div`
    font-size: 12px;
    color: #666;
`;

const DeleteBtn = styled(DeleteOutlined).attrs({
    role: "button",
    "aria-label": "Delete task",
})`
    font-size: 25px;
    color: #e74c3c;
    cursor: pointer;
    margin-right: 10px;
`;

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => (
    <StyledCard $completed={task.isCompleted}>
        <StyledCheckbox
            checked={task.isCompleted}
            onChange={() => onToggle(task.id)}
        />
        <Content>
            <Tooltip title={task.title}>
                <Title data-testid="task-title" $completed={task.isCompleted}>{task.title}</Title>
            </Tooltip>
            <CreatedAt>
                Created on: {new Date(task.createdAt).toLocaleDateString()}
            </CreatedAt>
        </Content>
        <DeleteBtn id="deleteBtn" onClick={() => onDelete(task.id)} />
    </StyledCard>
);

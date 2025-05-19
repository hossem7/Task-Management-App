import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Card from "antd/es/card";
import styled, { css } from "styled-components";
import Tooltip from "antd/es/tooltip";
import type { Task } from "../../api/TaskController";


interface TaskCardProps {
    task: Task;
    onDelete: (id: number) => void;
}

const StyledCard = styled(Card)<{ $completed: boolean }>`
    && {
        margin-bottom: 8px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        cursor: grab;
        user-select: none;
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
        flex-direction: column;
        gap: 8px;
        padding: 12px;
    }
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 240px; /* approximately 30 chars at ~8px each */
`;

const CreatedAt = styled.div`
    font-size: 12px;
    color: #666;
`;

const DeleteBtn = styled(DeleteOutlined)`
    align-self: flex-end;
    font-size: 18px;
    color: #e74c3c;
    cursor: pointer;
`;

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => (
    <StyledCard $completed={task.isCompleted}>
        <Tooltip title={task.title}>
            <Title>{task.title}</Title>
        </Tooltip>
        <CreatedAt>
            Created on: {new Date(task.createdAt).toLocaleDateString()}
        </CreatedAt>
        <DeleteBtn onClick={() => onDelete(task.id)} />
    </StyledCard>
);

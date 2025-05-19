import React from "react";
import styled from "styled-components";
import Button from "antd/es/button";

interface AddTaskButtonProps {
    onClick: () => void;
}

const btnText = "Add Task";

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 16px 0;
`;

const StyledButton = styled(Button)`
    && {
        background-color: #28a745;
        border-color: #28a745;
        color: #fff;
        border-radius: 16px;
        padding: 20px 20px;
        font-size: 16px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    &&:hover,
    &&:focus {
        background-color: #218838 !important;
        border-color: #218838 !important;
        color: #fff !important;
    }
`;

export const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => (
    <ButtonContainer>
        <StyledButton type="primary" onClick={onClick}>
            {btnText}
        </StyledButton>
    </ButtonContainer>
);

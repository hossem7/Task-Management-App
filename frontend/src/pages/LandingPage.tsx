import React from "react";
import styled from "styled-components";
import Button from "antd/es/button";

interface LandingPageProps {
    viewTasks: () => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 3rem;
    margin-bottom: 2rem;
`;

// Wrap AntD Button for custom sizing
const StartButton = styled(Button)`
    && {
        background-color: #4a90e2;
        color: #fff;
        border-radius: 1rem;
        padding: 2rem 2rem;
        font-size: 1.25rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }

    &&:hover {
        background-color: #357ab8;
        color: #fff;
    }
`;

// Simple welcome screen with a link to navigate to the TasksPage.
export const LandingPage: React.FC<LandingPageProps> = ({ viewTasks }) => (
    <Container>
        <Title>Task Manager App</Title>
        <StartButton type="primary" onClick={viewTasks}>
            View All Tasks
        </StartButton>
    </Container>
);

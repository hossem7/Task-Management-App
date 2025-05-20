/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddTaskButton } from './AddTaskButton';

describe('AddTaskButton Component', () => {
  test('renders a primary green Add Task button and calls onClick', () => {
    const onClick = vi.fn();
    render(<AddTaskButton onClick={onClick} />);

    const button = screen.getByRole('button', { name: /Add Task/ });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
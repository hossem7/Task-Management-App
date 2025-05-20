/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';
import { LandingPage } from './LandingPage';

describe('LandingPage hide/unmount behavior', () => {
  test('removes LandingPage from the DOM when View All Tasks is clicked', () => {
    // A tiny test wrapper that shows LandingPage only when showLanding is true.
    const TestHarness = () => {
      const [showLanding, setShowLanding] = useState(true);
      return (
        <>
          {showLanding && (
            <LandingPage viewTasks={() => setShowLanding(false)} />
          )}
          {!showLanding && <div data-testid="tasks-root">Tasks Page</div>}
        </>
      );
    };

    render(<TestHarness />);

    // Before click, LandingPage heading is visible
    expect(screen.getByRole('heading', { name: /Task Manager App/i })).toBeInTheDocument();

    // Click the button
    fireEvent.click(screen.getByRole('button', { name: /View All Tasks/i }));

    // After click, the heading is gone, and our fallback div exists
    expect(screen.queryByRole('heading', { name: /Task Manager App/i })).toBeNull();
    expect(screen.getByTestId('tasks-root')).toBeInTheDocument();
  });
});

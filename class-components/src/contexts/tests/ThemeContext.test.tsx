import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';

const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid='theme'>{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

test('ThemeProvider provides default theme and toggles theme', () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );

  expect(screen.getByTestId('theme').textContent).toBe('light');

  fireEvent.click(screen.getByText(/toggle theme/i));

  expect(screen.getByTestId('theme').textContent).toBe('dark');
});

test('useTheme throws error when used outside of ThemeProvider', () => {
  const renderWithoutProvider = () => render(<TestComponent />);
  expect(renderWithoutProvider).toThrow('Some error Theme');
});

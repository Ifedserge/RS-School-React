import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders App component', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByPlaceholderText(/Enter your request/i)).toBeInTheDocument();
});

test('renders NotFound component for unknown route', () => {
  render(
    <MemoryRouter initialEntries={['/unknown']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
});

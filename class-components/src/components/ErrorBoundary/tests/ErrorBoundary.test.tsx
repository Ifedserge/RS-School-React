import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary component', () => {
  const originConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originConsoleError;
  });

  it('should display error message when a child component throws an error', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument();
  });

  it('should render children components when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child component')).toBeInTheDocument();
  });
});

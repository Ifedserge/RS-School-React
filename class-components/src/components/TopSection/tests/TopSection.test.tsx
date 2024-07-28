import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TopSection from '../TopSection';
import { useTheme, ThemeProvider } from '../../../contexts/ThemeContext';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from '../../../store/store';
import '@testing-library/jest-dom';

jest.mock('../../../contexts/ThemeContext', () => {
  const originalModule = jest.requireActual('../../../contexts/ThemeContext');
  return {
    ...originalModule,
    useTheme: jest.fn(),
  };
});

const mockStore = configureStore<Partial<RootState>>([]);

const initialState: Partial<RootState> = {
  search: {
    searchTerm: '',
    selectedItemId: null,
    selectedItem: null,
    items: [],
    selectedItems: [],
  },
};

describe('TopSection', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('should render the Search component', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <TopSection />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Enter your request');
    expect(searchInput).toBeInTheDocument();
  });

  it('should toggle the theme when button is clicked', () => {
    const mockToggleTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <TopSection />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByText('Switch to dark theme');
    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('should display the correct theme text on button', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <TopSection />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByText('Switch to dark theme');
    expect(button).toBeInTheDocument();
  });

  it('should display the correct theme text on button when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: jest.fn(),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <TopSection />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByText('Switch to light theme');
    expect(button).toBeInTheDocument();
  });
});

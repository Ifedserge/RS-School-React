import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import Search from '../Search';
import { RootState } from '../../../store/store';
import { setSearchTerm } from '../../../store/searchSlice';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

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

describe('Search', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    mockNavigate.mockReset();
  });

  it('should render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter your request');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should update the input', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter your request');
    fireEvent.change(input, { target: { value: 'test search' } });
    expect(input).toHaveValue('test search');
  });

  it('should dispatch', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter your request');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(setSearchTerm('test search'));
    expect(localStorage.getItem('searchTerm')).toBe('test search');
  });

  it('should navigate', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter your request');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('?search=test search&page=1');
    });
  });
});

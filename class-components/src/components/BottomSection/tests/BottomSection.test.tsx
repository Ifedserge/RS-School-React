import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import BottomSection from '../BottomSection';
import { RootState } from '../../../store/store';
import { setItems } from '../../../store/searchSlice';
import '@testing-library/jest-dom';
import { useGetPeopleQuery } from '../../../store/apiSlice';

jest.mock('../../../store/apiSlice');

const mockStore = configureStore<Partial<RootState>>([]);

const initialState: Partial<RootState> = {
  search: {
    searchTerm: '',
    selectedItems: [],
    items: [],
    selectedItemId: null,
    selectedItem: null,
  },
};

describe('BottomSection', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('should display loading state initially', () => {
    (useGetPeopleQuery as jest.Mock).mockReturnValue({
      data: null,
      error: false,
      isLoading: true,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BottomSection />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display error state when there is an error', async () => {
    (useGetPeopleQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BottomSection />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error loading data')).toBeInTheDocument();
    });
  });

  it('should display items when data is loaded', async () => {
    const mockData = {
      results: [
        {
          name: 'Luke Skywalker',
          url: '1',
          height: '172',
          eye_color: 'blue',
          skin_color: 'fair',
          birth_year: '19BBY',
          mass: '77',
          hair_color: 'blond',
          gender: 'male',
        },
        {
          name: 'Darth Vader',
          url: '2',
          height: '202',
          eye_color: 'yellow',
          skin_color: 'light',
          birth_year: '41.9BBY',
          mass: '136',
          hair_color: 'none',
          gender: 'male',
        },
      ],
      count: 2,
    };

    (useGetPeopleQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: false,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BottomSection />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });
  });

  it('should call setSelectedItem and setSelectedItemId when item is clicked', async () => {
    const mockData = {
      results: [
        {
          name: 'Luke Skywalker',
          url: '1',
          height: '172',
          eye_color: 'blue',
          skin_color: 'fair',
          birth_year: '19BBY',
          mass: '77',
          hair_color: 'blond',
          gender: 'male',
        },
      ],
      count: 1,
    };

    (useGetPeopleQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: false,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BottomSection />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('Luke Skywalker'));
    });

    expect(store.dispatch).toHaveBeenCalledWith(setItems(mockData.results));
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should update page when pagination is used', async () => {
    const mockData = {
      results: [
        {
          name: 'Luke Skywalker',
          url: '1',
          height: '172',
          eye_color: 'blue',
          skin_color: 'fair',
          birth_year: '19BBY',
          mass: '77',
          hair_color: 'blond',
          gender: 'male',
        },
      ],
      count: 15,
    };

    (useGetPeopleQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: false,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BottomSection />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    expect(screen.getByText('Next')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'));
  });
});

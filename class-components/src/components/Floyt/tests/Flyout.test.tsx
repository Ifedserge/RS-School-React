import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Flyout from '../Flyout';
import { unselectAll } from '../../../store/searchSlice';

interface People {
  name: string;
  description?: string;
  url: string;
  height: string;
  eye_color: string;
  skin_color: string;
  mass: string;
  hair_color: string;
  birth_year: string;
  gender: string;
}

interface SearchState {
  searchTerm: string;
  selectedItemId: string | null;
  selectedItem: People | null;
  items: People[];
  selectedItems: string[];
}

const initialState: { search: SearchState } = {
  search: {
    searchTerm: '',
    selectedItemId: null,
    selectedItem: null,
    selectedItems: ['item1', 'item2'],
    items: [
      {
        name: 'Item 1',
        description: '',
        url: 'item1',
        height: '170',
        eye_color: 'blue',
        skin_color: 'fair',
        mass: '70',
        hair_color: 'blond',
        birth_year: '19BBY',
        gender: 'male',
      },
      {
        name: 'Item 2',
        description: '',
        url: 'item2',
        height: '180',
        eye_color: 'green',
        skin_color: 'dark',
        mass: '80',
        hair_color: 'black',
        birth_year: '20BBY',
        gender: 'female',
      },
    ],
  },
};

const mockStore = configureStore<Partial<{ search: SearchState }>>([]);

describe('Flyout', () => {
  let store: MockStoreEnhanced;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('should display the number of selected items', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('2 item(s) selected')).toBeInTheDocument();
  });

  it('should call unselectAll when "Unselect all" button is clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect All'));

    expect(store.dispatch).toHaveBeenCalledWith(unselectAll());
  });

  it('should download a CSV file when "Download" button is clicked', () => {
    const createObjectURL = jest.fn();
    global.URL.createObjectURL = createObjectURL;

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Download'));

    expect(createObjectURL).toHaveBeenCalled();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
});

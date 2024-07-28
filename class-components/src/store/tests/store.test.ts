import { setSearchTerm } from '../searchSlice';
import store from '../store';
import { RootState, AppDispatch } from '../store';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('Redux Store', () => {
  it('should have the correct initial state', () => {
    const initialState: RootState = {
      search: {
        searchTerm: '',
        selectedItemId: null,
        selectedItem: null,
        items: [],
        selectedItems: [],
      },
    };

    const state = store.getState();
    expect(state.search).toEqual(initialState.search);
  });

  it('should handle dispatching actions', () => {
    const dispatch = store.dispatch as AppDispatch;
    dispatch(setSearchTerm('test'));

    const state = store.getState();
    expect(state.search.searchTerm).toBe('test');
  });

  it('should have apiSlice reducer', () => {
    const state = store.getState();
    expect(state.api).toBeDefined();
  });

  it('should have search reducer', () => {
    const state = store.getState();
    expect(state.search).toBeDefined();
  });
});

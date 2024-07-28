import searchSlice, {
  setSearchTerm,
  unselectAll,
  toggleSelectedItem,
  setItems,
} from '../searchSlice';
import { SearchState } from '../store.type';

const initialState: SearchState = {
  searchTerm: '',
  selectedItemId: null,
  selectedItem: null,
  items: [],
  selectedItems: [],
};

describe('searchSlice', () => {
  it('initial state', () => {
    expect(searchSlice(undefined, { type: 'unknow' })).toEqual(initialState);
  });

  it('setSearchTerm', () => {
    const actual = searchSlice(initialState, setSearchTerm('test query'));
    expect(actual.searchTerm).toEqual('test query');
  });

  it('toggleSelectedItem', () => {
    const actual = searchSlice(initialState, toggleSelectedItem('item1'));
    expect(actual.selectedItems).toEqual(['item1']);
    const actualRemove = searchSlice(actual, toggleSelectedItem('item1'));
    expect(actualRemove.selectedItems).not.toContain('item1');
  });
  it('unselectAll', () => {
    const modifiedState = { ...initialState, selectedItems: ['item1', 'item2'] };
    const actual = searchSlice(modifiedState, unselectAll());
    expect(actual.selectedItems).toEqual([]);
  });

  it('setItems', () => {
    const newItems = [
      {
        name: 'Item 1',
        url: 'item1',
        height: '170',
        eye_color: 'blue',
        skin_color: 'fair',
        gender: 'male',
        birth_year: '19BBY',
        mass: '70',
        hair_color: 'blond',
      },
    ];
    const actual = searchSlice(initialState, setItems(newItems));
    expect(actual.items).toEqual(newItems);
  });
});

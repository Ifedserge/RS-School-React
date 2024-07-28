import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { People } from './store.type';
import { SearchState } from './store.type';

const initialState: SearchState = {
  searchTerm: '',
  selectedItemId: null,
  selectedItem: null,
  items: [],
  selectedItems: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedItemId: (state, action: PayloadAction<string | null>) => {
      state.selectedItemId = action.payload;
    },
    setSelectedItem: (state, action: PayloadAction<People | null>) => {
      state.selectedItem = action.payload;
    },
    setItems: (state, action: PayloadAction<People[]>) => {
      state.items = action.payload;
    },
    toggleSelectedItem: (state, action: PayloadAction<string>) => {
      const index = state.selectedItems.indexOf(action.payload);
      if (index > -1) {
        state.selectedItems.splice(index, 1);
      } else {
        state.selectedItems.push(action.payload);
      }
    },
    unselectAll: (state) => {
      state.selectedItems = [];
    },
  },
});

export const {
  setSearchTerm,
  setSelectedItemId,
  setSelectedItem,
  setItems,
  toggleSelectedItem,
  unselectAll,
} = searchSlice.actions;
export default searchSlice.reducer;

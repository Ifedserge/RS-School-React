import { People } from './store.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './store.type';

const initialState: SearchState = {
  searchTerm: '',
  selectedItemId: null,
  selectedItem: null,
  items: [],
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
  },
});

export const { setSearchTerm, setSelectedItemId, setSelectedItem, setItems } = searchSlice.actions;
export default searchSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './store.type';

const initialState: SearchState = {
  searchTerm: '',
  selectedItemId: null,
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
  },
});

export const { setSearchTerm, setSelectedItemId } = searchSlice.actions;
export default searchSlice.reducer;

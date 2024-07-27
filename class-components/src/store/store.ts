import { configureStore } from '@reduxjs/toolkit';
import searchRedeucer from './searchSlice';
import { SearchState } from './store.type';

const store = configureStore({
  reducer: {
    search: searchRedeucer,
  },
});

export type RootState = {
  search: SearchState;
};

export type AppDispatch = typeof store.dispatch;

export default store;

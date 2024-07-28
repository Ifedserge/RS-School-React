import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import searchRedeucer from './searchSlice';
import { SearchState } from './store.type';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    search: searchRedeucer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = {
  search: SearchState;
};

export type AppDispatch = typeof store.dispatch;

export default store;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { People } from './store.type';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<
      { results: People[]; count: number },
      { search?: string; page: number }
    >({
      query: ({ search, page }) => ({
        url: 'people',
        params: { search, page },
      }),
    }),
    getPerson: builder.query<People, string>({
      query: (id) => `people/${id}/`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = apiSlice;

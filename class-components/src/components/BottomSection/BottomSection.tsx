'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPeopleQuery } from '../../store/apiSlice';
import { RootState, AppDispatch } from '../../store/store';
import Flyout from '../Floyt/Flyout';
import Pagination from '../Pagination/Pagination';
import { People } from './BottomSection.type';
import './BottomSection.css';
import {
  setItems,
  setSelectedItem,
  setSelectedItemId,
  toggleSelectedItem,
} from '../../store/searchSlice';

const BottomSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const router = useRouter();
  const selectedItems = useSelector((state: RootState) => state.search.selectedItems);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isLoading } = useGetPeopleQuery({ search: searchTerm, page: currentPage });
  const [selectedItem, setSelectedItemLocal] = useState<People | null>(null);

  useEffect(() => {
    const page = Number(new URLSearchParams(window.location.search).get('page')) || 1;
    setCurrentPage(page);
  }, [router]);

  useEffect(() => {
    if (data) {
      dispatch(setItems(data.results));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const detailsId = searchParams.get('details');
    if (detailsId && data) {
      const foundItem = data.results.find((item) => item.url.includes(detailsId));
      if (foundItem) {
        setSelectedItemLocal(foundItem);
        dispatch(setSelectedItem(foundItem));
      } else {
        setSelectedItemLocal(null);
        dispatch(setSelectedItem(null));
      }
    }
  }, [data, dispatch, router]);

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', String(page));
    router.push(`?${searchParams.toString()}`);
    setCurrentPage(page);
  };

  const handleItemClick = (url: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = url.split('/').filter(Boolean).pop();
    if (!id) return;

    searchParams.set('details', id);
    router.push(`?${searchParams.toString()}`);

    if (data) {
      const foundItem = data.results.find((item) => item.url.includes(id));
      if (foundItem) {
        setSelectedItemLocal(foundItem);
        dispatch(setSelectedItem(foundItem));
      }
    }
  };

  const handleCloseDetails = () => {
    setSelectedItemLocal(null);
    dispatch(setSelectedItemId(null));
    dispatch(setSelectedItem(null));
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('details');
    router.push(`?${searchParams.toString()}`);
  };

  const handleChechboxChange = (id: string) => {
    dispatch(toggleSelectedItem(id));
  };

  return (
    <div className='bottom-section'>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {!isLoading && data && data.results.length > 0 ? (
        <div className='split-view'>
          <div className='left-section'>
            <div className='container'>
              {data.results.map((item: People) => (
                <div key={item.url} className='item'>
                  <input
                    type='checkbox'
                    checked={selectedItems.includes(item.url)}
                    onChange={() => handleChechboxChange(item.url)}
                  />
                  <h2 onClick={() => handleItemClick(item.url)}>{item.name}</h2>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              itemsPerPage={10}
              totalItems={data.count}
              onPageChange={handlePageChange}
            />
            {selectedItems.length > 0 && <Flyout />}
          </div>
          {selectedItem && (
            <div className='right-section'>
              <button onClick={handleCloseDetails}>Close</button>
              <div>
                <h2>{selectedItem.name}</h2>
                <p>Birth Year: {selectedItem.birth_year}</p>
                <p>Height: {selectedItem.height}</p>
                <p>Eye Color: {selectedItem.eye_color}</p>
                <p>Skin Color: {selectedItem.skin_color}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        !isLoading && <p>No results found</p>
      )}
    </div>
  );
};

export default BottomSection;

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPeopleQuery } from '../../store/apiSlice';
import { RootState, AppDispatch } from '../../store/store';
import { setSelectedItemId, setSelectedItem, setItems } from '../../store/searchSlice';
import { People } from './BottomSection.type';
import Pagination from '../Pagination/Pagination';
import './BottomSection.css';

const BottomSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get('page')) || 1;
  const { data, error, isLoading } = useGetPeopleQuery({ search: searchTerm, page: currentPage });
  const [selectedItem, setSelectedItemLocal] = useState<People | null>(null);

  useEffect(() => {
    if (data) {
      dispatch(setItems(data.results));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const detailsId = searchParams.get('details');
    if (detailsId && data) {
      const foundItem = data.results.find((item) => item.url.includes(detailsId));
      setSelectedItemLocal(foundItem || null);
      dispatch(setSelectedItem(foundItem || null));
    }
  }, [searchParams, data, dispatch]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    setSearchParams(params);
  };

  const handleItemClick = (url: string) => {
    const id = url.split('/').filter(Boolean).pop();
    if (!id) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('details', id);
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handleCloseDetails = () => {
    setSelectedItemLocal(null);
    dispatch(setSelectedItemId(null));
    dispatch(setSelectedItem(null));
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  return (
    <div className='bottom-section'>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {data && data.results.length > 0 ? (
        <div className='split-view'>
          <div className='left-section'>
            <div className='container'>
              {data.results.map((item: People) => (
                <div key={item.url} className='item' onClick={() => handleItemClick(item.url)}>
                  <h2>{item.name}</h2>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              itemsPerPage={10}
              totalItems={data.count}
              onPageChange={handlePageChange}
            />
          </div>
          {selectedItem && (
            <div className='right-section'>
              <button onClick={handleCloseDetails}>Close</button>
              <Outlet context={{ selectedItem }} />
            </div>
          )}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default BottomSection;

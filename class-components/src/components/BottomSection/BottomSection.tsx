import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setSelectedItemId } from '../../store/searchSlice';
import { Item, ApiLink, People } from './BottomSection.type';
import { formatPeople } from './helpers';
import Pagination from '../Pagination/Pagination';
import './BottomSection.css';

const BottomSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItem, setSelectedItem] = useState<People | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 10;

  useEffect(() => {
    fetchItems(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  useEffect(() => {
    const detailsId = searchParams.get('details');
    if (detailsId) {
      fetchItemDetails(detailsId);
    }
  }, [searchParams]);

  const fetchItems = async (searchTerm: string, page: number = 1) => {
    const url = searchTerm
      ? `${ApiLink.People}?search=${searchTerm}&page=${page}`
      : `${ApiLink.People}?page=${page}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const items: Item[] = data.results.map((item: People) => ({
        ...formatPeople(item),
        url: item.url,
      }));
      setItems(items);
      setTotalItems(data.count);
      setError(items.length === 0);
    } catch (error) {
      setItems([]);
      setError(true);
    }
  };

  const fetchItemDetails = async (id: string) => {
    setLoading(true);
    const url = `${ApiLink.People}${id}/`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedItem(data);
    } catch (error) {
      console.error('Error fetching item details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    navigate(`?${params.toString()}`);
  };

  const handleItemClick = (url: string) => {
    const id = url.split('/').filter(Boolean).pop();
    if (!id) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('details', id);
    navigate(`?${params.toString()}`);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
    dispatch(setSelectedItemId(null));
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    navigate(`?${params.toString()}`);
  };

  return (
    <div className='bottom-section'>
      {items.length > 0 ? (
        <div className='split-view'>
          <div className='left-section'>
            <div className='container'>
              {items.map((item) => (
                <div key={item.url} className='item' onClick={() => handleItemClick(item.url)}>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <p>{item.height}</p>
                  <p>{item.eyeColor}</p>
                  <p>{item.skinColor}</p>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          </div>
          {selectedItem && (
            <div className='right-section'>
              <button onClick={handleCloseDetails}>Close</button>
              {loading ? <p>Loading...</p> : <Outlet context={{ selectedItem }} />}
            </div>
          )}
        </div>
      ) : (
        <p>{error ? 'No results found' : 'Loading...'}</p>
      )}
    </div>
  );
};

export default BottomSection;

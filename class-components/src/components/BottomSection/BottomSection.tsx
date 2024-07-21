import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SearchState, Item, ApiLink, People } from './BottomSection.type';
import { formatPeople } from './helpers';
import Pagination from '../Pagination/Pagination';
import DetailSection from '../DetailSection/DetailSection';
import './BottomSection.css';

const BottomSection: React.FC<SearchState> = ({ searchTerm }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [loading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get('page')) || 1;
  const selectedItemId = searchParams.get('details');

  const itemsPerPage = 10;

  const prevSearchTermRef = React.useRef(searchTerm);

  useEffect(() => {
    if (prevSearchTermRef.current !== searchTerm) {
      setSearchParams({ page: '1' });
      navigate(`?page=1`);
      prevSearchTermRef.current = searchTerm;
    } else {
      fetchItems(searchTerm, currentPage);
    }
  }, [searchTerm, currentPage, setSearchParams, navigate]);

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
      console.error('Error fetching items:', error);
      setItems([]);
      setError(true);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handleItemClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('details', id);
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handleCloseDetails = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  return (
    <div className='bottom-section'>
      {items.length > 0 ? (
        <div className='split-view'>
          <div className='left-section'>
            <div className='container'>
              {items.map((item) => (
                <div
                  key={item.url}
                  className='item'
                  onClick={() => handleItemClick(item.url.split('/').filter(Boolean).pop()!)}
                >
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
          {selectedItemId && (
            <div className='right-section'>
              <button onClick={handleCloseDetails}>Close</button>
              {loading ? <p>Loading...</p> : <DetailSection selectedItemId={selectedItemId} />}
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

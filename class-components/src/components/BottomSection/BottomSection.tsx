import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchState, Item, ApiLink, ItemType } from './BottomSection.type';
import {
  isItemPeople,
  formatPeople,
  formatFilms,
  formatPlanets,
  formatSpecies,
  formatStarship,
  isItemFilms,
  isItemPlanets,
  isItemSpecies,
  isItemStarship,
} from './helpers';
import Pagination from '../Pagination/Pagination';
// import DetailSection from '../DetailSection/DetailSection';

import './BottomSection.css';

const ITEMS_PER_PAGE = 10;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BottomSection: React.FC<SearchState> = ({ searchTerm }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('search', searchTerm);
    newSearchParams.set('page', '1');
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  }, [searchTerm, navigate]);

  useEffect(() => {
    fetchItems(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  const fetchItems = async (searchTerm: string, page: number) => {
    const endpoints = searchTerm
      ? [
          `${ApiLink.People}?search=${searchTerm}&page=${page}`,
          `${ApiLink.Films}?search=${searchTerm}&page=${page}`,
          `${ApiLink.Planets}?search=${searchTerm}&page=${page}`,
          `${ApiLink.Species}?search=${searchTerm}&page=${page}`,
          `${ApiLink.Starships}?search=${searchTerm}&page=${page}`,
          `${ApiLink.Vehicles}?search=${searchTerm}&page=${page}`,
        ]
      : [`${ApiLink.People}?page=${page}`];

    try {
      const fetches = endpoints.map((endpoint) =>
        fetch(endpoint).then((response) => response.json())
      );

      const results = await Promise.all(fetches);

      const allItems: Item[] = results.flatMap((result) => {
        if (result.results) {
          return result.results.map((item: ItemType) => {
            if (isItemPeople(item)) {
              return formatPeople(item);
            } else if (isItemFilms(item)) {
              return formatFilms(item);
            } else if (isItemStarship(item)) {
              return formatStarship(item);
            } else if (isItemSpecies(item)) {
              return formatSpecies(item);
            } else if (isItemPlanets(item)) {
              return formatPlanets(item);
            } else {
              return {
                name: 'Unknown',
                description: 'No description available',
              };
            }
          });
        }
        return [];
      });

      setTotalItems(results[0].count);
      setItems(allItems);
      setError(allItems.length === 0);
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
      setError(true);
    }
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('details', item.name);
  };

  return (
    <div className='bottom-section'>
      <div className='left-section'>
        {items.length > 0 ? (
          <div className='container'>
            {items
              .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
              .map((item, index) => (
                <div key={index} className='item' onClick={() => handleItemClick(item)}>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <p>{item.height}</p>
                  <p>{item.eyeColor}</p>
                  <p>{item.skinColor}</p>
                  <p>{item.climate}</p>
                  <p>{item.diameter}</p>
                </div>
              ))}
          </div>
        ) : (
          <p>{error ? 'No results found' : 'Loading...'}</p>
        )}
        <Pagination currentPage={currentPage} totalPages={totalPages} searchTerm={searchTerm} />
      </div>
      {selectedItem && (
        <div className='rightn-section'>
          <div className='details-section'>
            <p>Some TEXT</p>
          </div>
          <button onClick={() => setSelectedItem(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default BottomSection;

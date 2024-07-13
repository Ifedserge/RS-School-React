import React, { useEffect, useState } from 'react';
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

import './BottomSection.css';

const BottomSection: React.FC<SearchState> = ({ searchTerm }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchItems(searchTerm);
  }, [searchTerm]);

  const fetchItems = async (searchTerm: string) => {
    const endpoints = searchTerm
      ? [
          ApiLink.People,
          ApiLink.Films,
          ApiLink.Planets,
          ApiLink.Species,
          ApiLink.Starships,
          ApiLink.Vehicles,
        ]
      : [ApiLink.People];

    try {
      const fetches = endpoints.map((endpoint) => {
        const url = searchTerm ? `${endpoint}?search=${searchTerm}` : endpoint;
        return fetch(url).then((response) => response.json());
      });

      const results = await Promise.allSettled(fetches);

      const items: Item[] = results.flatMap((result) => {
        if (result.status === 'fulfilled' && result.value.results) {
          return result.value.results.map((item: ItemType) => {
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

      setItems(items);
      setError(items.length === 0);
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
      setError(true);
    }
  };

  return (
    <div className='bottom-section'>
      {items.length > 0 ? (
        <div className='container'>
          {items.map((item, index) => (
            <div key={index} className='item'>
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
    </div>
  );
};

export default BottomSection;

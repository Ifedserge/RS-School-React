import type { ReactNode } from 'react';
import { Component } from 'react';
import { BottomSectionState, SearchState, Item, ApiLink, ItemType } from './BottomSection.type';
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

class BottomSection extends Component<SearchState, BottomSectionState> {
  constructor(props: SearchState) {
    super(props);
    this.state = {
      items: [],
      error: false,
    };
  }

  componentDidMount() {
    this.fetchItems(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: SearchState) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchItems(this.props.searchTerm);
    }
  }

  fetchItems = async (searchTerm: string) => {
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

      this.setState({ items, error: items.length === 0 });
    } catch (error) {
      console.error('Error fetching items:', error);
      this.setState({ items: [], error: true });
    }
  };

  render(): ReactNode {
    const { items, error } = this.state;
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
  }
}

export default BottomSection;

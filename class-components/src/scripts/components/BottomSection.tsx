import { Component } from 'react';
import {
  BottomSectionState,
  SearchState,
  Species,
  Planets,
  Vehicles,
  Starships,
  Films,
  People,
  Item,
} from '../types/interfaces';

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
          'https://swapi.dev/api/people/',
          'https://swapi.dev/api/films/',
          'https://swapi.dev/api/starships/',
          'https://swapi.dev/api/vehicles/',
          'https://swapi.dev/api/species/',
          'https://swapi.dev/api/planets/',
        ]
      : ['https://swapi.dev/api/people/'];

    try {
      const fetches = endpoints.map((endpoint) => {
        const url = searchTerm ? `${endpoint}?search=${searchTerm}` : endpoint;
        return fetch(url).then((response) => response.json());
      });

      const results = await Promise.all(fetches);

      const items: Item[] = results.flatMap((result) => {
        if (result.results) {
          return result.results.map(
            (item: People | Films | Starships | Vehicles | Species | Planets) => {
              if ('birth_year' in item && 'skin_color' in item && 'height' in item) {
                return {
                  name: `Name: ${item.name}`,
                  description: `Birth Year: ${item.birth_year}`,
                  height: `Height: ${item.height}`,
                  eyeColor: `Eye color: ${item.eye_color}`,
                  skinColor: `Skin color: ${item.skin_color}`,
                };
              } else if ('opening_crawl' in item) {
                return {
                  name: `Movie title: ${item.title}`,
                  description: `Opening Crawl: ${item.opening_crawl}`,
                };
              } else if ('model' in item) {
                return {
                  name: `Model name: ${item.name}`,
                  description: `Model: ${item.model}`,
                };
              } else if ('classification' in item) {
                return {
                  name: `Name: ${item.name}`,
                  description: `Classification: ${item.classification}`,
                };
              } else if ('climate' in item) {
                return {
                  name: `Planet: ${item.name}`,
                  description: `Climate: ${item.climate}`,
                  diameter: `Diameter: ${item.diameter}`,
                };
              } else {
                return {
                  name: 'Unknown',
                  description: 'No description available',
                };
              }
            }
          );
        }
        return [];
      });

      this.setState({ items, error: items.length === 0 });
    } catch (error) {
      console.error('Error fetching items:', error);
      this.setState({ items: [], error: true });
    }
  };

  render() {
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

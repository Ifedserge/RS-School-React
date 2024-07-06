import { Component } from 'react';
import { BottomSectionState } from '../types/interfaces';

class BottomSection extends Component<Record<string, never>, BottomSectionState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount(): void {
    this.fetchItems('');
  }

  fetchItems = (searchTerm: string) => {
    const url = searchTerm
      ? `https://swapi.dev/api/people/?search=${searchTerm}`
      : `https://swapi.dev/api/people/`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          const items = data.results.map((item: { name: string; birth_year: string }) => ({
            name: item.name,
            description: item.birth_year,
          }));
          this.setState({ items });
        } else {
          this.setState({ items: [] });
        }
      })
      .catch((error) => console.error('Error fetching items', error));
  };

  render() {
    return (
      <div className='bottom-section'>
        {this.state.items.length > 0 ? (
          <ul>
            {this.state.items.map((item, index) => (
              <li key={index}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    );
  }
}

export default BottomSection;

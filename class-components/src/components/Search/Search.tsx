import React, { Component } from 'react';
import { SearchState, SearchProps } from '../../scripts/types/interfaces';

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearchTerm,
    };

    if (!savedSearchTerm) {
      this.props.onSearch('');
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', this.state.searchTerm);
    this.props.onSearch(trimmedSearchTerm);
    console.log(trimmedSearchTerm);
  };

  render() {
    return (
      <div>
        <input
          type='text'
          value={this.state.searchTerm}
          onChange={this.handleChange}
          placeholder='Enter your request'
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;

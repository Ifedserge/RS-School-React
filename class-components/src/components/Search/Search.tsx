import React, { useEffect } from 'react';
import { SearchProps } from './Search.type';
import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage';

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  useEffect(() => {
    if (!searchTerm) {
      onSearch('');
    }
  }, [onSearch, searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    onSearch(trimmedSearchTerm);
    console.log(trimmedSearchTerm);
  };

  return (
    <div>
      <input
        type='text'
        value={searchTerm}
        onChange={handleChange}
        placeholder='Enter your request'
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
export default Search;

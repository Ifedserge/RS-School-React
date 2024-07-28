import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store/store';
import { setSearchTerm } from '../../store/searchSlice';

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    dispatch(setSearchTerm(savedSearchTerm));
  }, [dispatch]);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = localSearchTerm.trim();
    dispatch(setSearchTerm(trimmedSearchTerm));
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    navigate(`?search=${trimmedSearchTerm}&page=1`);
  };

  return (
    <div>
      <input
        type='text'
        value={localSearchTerm}
        onChange={handleChange}
        placeholder='Enter your request'
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;

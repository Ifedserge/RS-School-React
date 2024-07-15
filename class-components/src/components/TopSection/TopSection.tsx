import React from 'react';
import Search from '../Search/Search';
import { SearchProps } from './TopSection.type';
import './TopSection.css';

const TopSection: React.FC<SearchProps> = ({ onSearch }) => {
  return (
    <div className='top-section'>
      <Search onSearch={onSearch} />
    </div>
  );
};

export default TopSection;

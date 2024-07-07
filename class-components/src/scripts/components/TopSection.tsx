import React from 'react';
import Search from './Search';
import { SearchProps } from '../types/interfaces';

const TopSection: React.FC<SearchProps> = ({ onSearch }) => {
  return (
    <div className='top-section'>
      <Search onSearch={onSearch} />
    </div>
  );
};

export default TopSection;

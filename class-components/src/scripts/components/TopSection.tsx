import React from 'react';
import Search from './Search';

interface TopSectionProps {
  onSearch: (searchTerm: string) => void;
}

const TopSection: React.FC<TopSectionProps> = ({ onSearch }) => {
  return (
    <div className='top-section'>
      <Search onSearch={onSearch} />
    </div>
  );
};

export default TopSection;

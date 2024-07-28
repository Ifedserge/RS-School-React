import React from 'react';
import Search from '../Search/Search';
import { useTheme } from '../../contexts/ThemeContext';
import './TopSection.css';

const TopSection: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={`top-section`}>
      <Search />
      <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'dark' : 'light'} theme</button>
    </div>
  );
};

export default TopSection;

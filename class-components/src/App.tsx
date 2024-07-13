import React from 'react';
import './App.css';
import TopSection from './components/TopSection/TopSection';
import BottomSection from './components/BottomSection/BottomSection';
import useLocalStorage from './hooks/useLocalStorage/useLocalStorage';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleError = () => {
    throw new Error('Test Error! Test error!');
  };

  return (
    <div className='app'>
      <TopSection onSearch={handleSearch} />
      <button onClick={handleError} className='btn'>
        Throw Error
      </button>
      <BottomSection key={searchTerm} searchTerm={searchTerm} />
    </div>
  );
};

export default App;

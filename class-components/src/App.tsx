import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TopSection from './components/TopSection/TopSection';
import BottomSection from './components/BottomSection/BottomSection';
import useLocalStorage from './hooks/useLocalStorage/useLocalStorage';
import NotFound from './components/NotFound/NotFound';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <TopSection onSearch={handleSearch} />
                <BottomSection searchTerm={searchTerm} />
              </>
            }
          ></Route>
          <Route path='/404' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

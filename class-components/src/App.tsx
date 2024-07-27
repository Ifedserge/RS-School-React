import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import TopSection from './components/TopSection/TopSection';
import BottomSection from './components/BottomSection/BottomSection';
import DetailSection from './components/DetailSection/DetailSection';
import NotFound from './components/NotFound/NotFound';
import store from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className='app'>
          <TopSection />
          <Routes>
            <Route path='/' element={<BottomSection />}>
              <Route path='' element={<DetailSection />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

'use client';

import React from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import store from '../store/store';
import { ThemeProvider } from '../contexts/ThemeContext';
import TopSection from '../components/TopSection/TopSection';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <html lang='en'>
          <body>
            <TopSection />
            <main>{children}</main>
          </body>
        </html>
      </ThemeProvider>
    </Provider>
  );
};

export default RootLayout;

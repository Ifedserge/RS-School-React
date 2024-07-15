import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem('searchTerm', value);
    } catch {
      window.localStorage.setItem('searchTerm', '');
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;

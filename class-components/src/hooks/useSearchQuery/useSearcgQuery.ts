import { useState, useEffect } from 'react';

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

  useEffect(() => {
    return () => {
      try {
        window.localStorage.setItem(key, storedValue);
      } catch (error) {
        console.log(error);
      }
    };
  }, [key, storedValue]);
  return [storedValue, setStoredValue] as const;
};

export default useLocalStorage;

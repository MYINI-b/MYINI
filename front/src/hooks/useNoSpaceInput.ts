import { useState, useCallback } from 'react';

export default (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e: any) => {
    setValue(e.target.value.trim());
  }, []);
  return [value, handler, setValue];
};

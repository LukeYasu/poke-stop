import { useContext } from 'react';
import { favContext, favContextValues } from './favContext';

export function useFav(): favContextValues {
  const values = useContext(favContext);
  if (!values) throw new Error('useUser must be used inside a UserProvider');
  return values;
}

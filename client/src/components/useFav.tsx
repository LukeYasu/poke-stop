import { useContext } from 'react';
import { FavContext, FavContextValues } from './FavContext';

export function useFav(): FavContextValues {
  const values = useContext(FavContext);
  if (!values) throw new Error('useUser must be used inside a UserProvider');
  return values;
}

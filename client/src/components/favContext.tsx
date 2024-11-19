import { createContext, ReactNode, useState } from 'react';
import { deleteFavorites, insertFavorites, Item } from '../lib/data';
import { useUser } from './useUser';

type Props = {
  children: ReactNode;
};

export type favContextValues = {
  toggleFavorite: () => void;
  isFavorite: boolean;
};

export const favContext = createContext<favContextValues>({
  toggleFavorite: () => undefined,
  isFavorite: false,
});

export function favProvider({ children }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUser();
  async function toggleFavorite(item: Item) {
    try {
      setIsFavorite(!isFavorite);
      if (user) {
        if (isFavorite) {
          await insertFavorites(item.itemId);
        } else {
          await deleteFavorites(item.itemId);
        }
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
  const contextValue = { toggleFavorite, isFavorite };
  return (
    <favContext.Provider value={contextValue}>{children}</favContext.Provider>
  );
}

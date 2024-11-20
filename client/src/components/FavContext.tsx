import { createContext, ReactNode, useEffect, useState } from 'react';
import { deleteFavorites, insertFavorites, readFavorites } from '../lib/data';

type Props = {
  children: ReactNode;
};

export type FavContextValues = {
  favItemIds: number[];
  toggleFav: (itemId: number) => void;
  getFavIds: () => void;
};

const defaultFavValues = {
  favItemIds: [],
  toggleFav: async () => undefined,
  getFavIds: () => undefined,
};

export const FavContext = createContext<FavContextValues>(defaultFavValues);

export function FavProvider({ children }: Props) {
  const [favIds, setFavIds] = useState<number[]>([]);

  async function getFavoriteId() {
    try {
      const favs = await readFavorites();
      const mappedFavIds = favs.map((i) => i.itemId);
      setFavIds(mappedFavIds);
    } catch (err) {
      console.error(`Failed to fetch favorite items: ${err}`);
    }
  }
  useEffect(() => {
    getFavoriteId();
  }, []);

  async function toggleFav(itemId: number) {
    try {
      if (favIds.includes(itemId)) {
        await deleteFavorites(itemId);
        setFavIds((prev) => prev.filter((id) => id !== itemId));
      } else {
        await insertFavorites(itemId);
        setFavIds((prev) => [...prev, itemId]);
      }
    } catch (err) {
      console.error(`Failed to toggle favorite for item ${itemId}: ${err}`);
    }
  }
  const contextValue = {
    favItemIds: favIds,
    toggleFav: toggleFav,
    getFavIds: getFavoriteId,
  };
  return (
    <FavContext.Provider value={contextValue}>{children}</FavContext.Provider>
  );
}

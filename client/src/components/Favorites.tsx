import { useEffect, useState } from 'react';
import { CatalogCards } from './CatalogCards';
import { Item, readFavorites } from '../lib/data';
import { useUser } from './useUser';

export function Favorites() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const { user } = useUser();
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const result = await readFavorites();
        setItems(result);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFavorites();
  }, []);

  if (error) {
    console.error('Fetch error:', error);
    return (
      <p>Error! {error instanceof Error ? error.message : 'Unknown Error'}</p>
    );
  }
  if (isLoading) return <div>Loading ...</div>;
  if (!user) return <div>Sign in to use favorites</div>;
  return (
    <div className="flex justify-center flex-col w-full items-center">
      <div className="text-3xl border-black border-b-2 m-4 page-container">
        Favorites
      </div>
      <div className="page-container">
        <div className="h-full flex">
          {items.length !== 0 ? (
            items.map((item) => <CatalogCards key={item.itemId} item={item} />)
          ) : (
            <div className="m-4">No Favorites</div>
          )}
        </div>
      </div>
    </div>
  );
}

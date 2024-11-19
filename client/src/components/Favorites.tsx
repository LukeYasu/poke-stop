import { useEffect, useState } from 'react';
import { CatalogCards } from './CatalogCards';
import { Item, readFavorites } from '../lib/data';

export function Favorites() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

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
  return (
    <div>
      <div>Favorites</div>
      <div>
        {items ? (
          items.map((item) => <CatalogCards key={item.itemId} item={item} />)
        ) : (
          <div>No Favorites</div>
        )}
      </div>
    </div>
  );
}

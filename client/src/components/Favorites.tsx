import { useEffect, useState } from 'react';
import { CatalogCards } from './CatalogCards';
import { getItems, Item } from '../lib/data';

export function Favorites() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function fetchItems() {
      try {
        const result = await getItems();
        setItems(result);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
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
      <CatalogCards item={items[0]} />
    </div>
  );
}

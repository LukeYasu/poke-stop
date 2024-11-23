import { useEffect, useState } from 'react';
import { getItems, Item } from '../lib/data';
import { ItemCategories } from './ItemCategories';

export function Consumables() {
  const [consumables, setConsumables] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    async function fetchItems() {
      try {
        const result = await getItems();
        const filteredItems = result.filter((i) => i.itemType === 'consumable');
        setConsumables(filteredItems);
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

  return <ItemCategories items={consumables} />;
}

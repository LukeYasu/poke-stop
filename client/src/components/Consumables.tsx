import { useEffect, useState } from 'react';
import { consumablesId, getItems, Item } from '../lib/data';
import { CatalogCards } from './CatalogCards';

export function Consumables() {
  const [consumables, setConsumables] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    async function fetchItems() {
      try {
        const result = await getItems();
        const filteredItems = result.filter((item) =>
          consumablesId.includes(item.itemId)
        );
        setConsumables(filteredItems);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    console.log(consumables);
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
    <div className="w-full flex items-center flex-col">
      <h1 className="text-3xl mb-4 border-b-2 border-black w-2/3">
        Consumables
      </h1>
      <div className="w-2/3 flex flex-wrap">
        {consumables.map((item) => (
          <CatalogCards item={item} />
        ))}
      </div>
    </div>
  );
}

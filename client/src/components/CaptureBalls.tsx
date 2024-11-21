import { useEffect, useState } from 'react';
import { captureBalls, getItems, Item } from '../lib/data';
import { CatalogCards } from './CatalogCards';

export function CaptureBalls() {
  const [captureBallList, setCaptureBallsList] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    async function fetchItems() {
      try {
        const result = await getItems();
        const filteredItems = result.filter((item) =>
          captureBalls.includes(item.itemId)
        );
        setCaptureBallsList(filteredItems);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    console.log(captureBallList);
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
        Capture Balls
      </h1>
      <div className="w-2/3 flex flex-wrap">
        {captureBallList.map((item) => (
          <CatalogCards item={item} />
        ))}
      </div>
    </div>
  );
}

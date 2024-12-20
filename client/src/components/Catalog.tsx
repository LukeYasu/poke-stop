import { useEffect, useState } from 'react';
import { getItems, Item } from '../lib/data';
import { ItemCard } from './ItemCard';
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';

export function Catalog() {
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
    <>
      <div className="flex w-full justify-center">
        <div className="page-container">
          <h1 className="text-3xl mb-4 border-b-2 border-black">catalog</h1>
          <div className="flex flex-wrap justify-center">
            {items.map((item) => (
              <ItemCard key={item.itemId} item={item} />
            ))}
            {items.map((item) => (
              <ItemCard key={item.itemId} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export type { Item };

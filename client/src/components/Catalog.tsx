import { useEffect, useState } from 'react';
import { getItems, Item } from '../lib/data';
import { CatalogCards } from './CatalogCards';
import { Carousel } from './Carousel';
import '../App.css';
import { useFav } from './useFav';

export function Catalog() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const { favItemIds } = useFav();
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
          <Carousel />
          <h1 className="text-3xl mb-4 border-b-2 border-black">catalog</h1>
          <div className="flex flex-wrap justify-center">
            {items.map((item) => (
              <CatalogCards key={item.itemId} item={item} favIds={favItemIds} />
            ))}
            {items.map((item) => (
              <CatalogCards key={item.itemId} item={item} favIds={favItemIds} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export type { Item };

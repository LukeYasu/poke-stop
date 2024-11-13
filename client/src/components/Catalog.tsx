import { useEffect, useState } from 'react';
import { getItems, Item } from '../lib/data';
import { CatalogCards } from './CatalogCards';
import { Carousel } from './Carousel';
import '../App.css';

export function Catalog() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const result = await getItems();
        setItems(result);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);
  if (isLoading) return <div>Loading ...</div>;
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="w-8/12">
          <Carousel />
          <h1 className="text-3xl mb-4 border-b-2 border-black">catalog</h1>
          <div className="flex flex-wrap justify-center">
            {items.map((item) => (
              <CatalogCards key={item.itemId} item={item} />
            ))}
            {items.map((item) => (
              <CatalogCards key={item.itemId} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export type { Item };

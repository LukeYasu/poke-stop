import { useEffect, useState } from 'react';
import { getItems } from '../lib/data';
import { CatalogCards } from './CatalogCards';
import { Carousel } from './Carousel';
import '../App.css';
export type Item = {
  itemId: number;
  name: string;
  price: number;
  photoUrl: string;
  description: string;
  quantity: number;
  stock: number;
};

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
      <div className="text-red-600">hello</div>
      <div className="container">
        <div className="catalog-container">
          <Carousel />
          <h1 className="catalog-title">catalog</h1>
          <div className="catalog">
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

import { useParams } from 'react-router-dom';
import { bestSellers, getItem, newItems, saleItems } from '../lib/data';
import { Item } from './Catalog';
import { useEffect, useState } from 'react';

export function ItemDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  const [tag, setTag] = useState('none');
  const [sale, setSale] = useState(false);
  const [salePrice, setSalePrice] = useState<number | null>(null);

  useEffect(() => {
    async function fetchItem() {
      if (itemId) {
        try {
          const item = await getItem(+itemId);
          setItem(item);
        } catch (err) {
          setError(err);
          console.error(err);
        } finally {
          setIsLoading(false);
        }
        if (item) {
          if (bestSellers.includes(item.itemId)) {
            setTag('best-seller');
          } else if (newItems.includes(item.itemId)) {
            setTag('new');
          }
          const saleItem = saleItems.find(
            ({ itemId }) => itemId === item.itemId
          );
          if (saleItem) {
            setSale(true);
            setSalePrice(saleItem.newPrice);
          }
        }
      }
    }
    fetchItem();
  }, [item, itemId]);

  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    if (count > 0) setCount(count - 1);
  }
  if (isLoading) return <>Loading...</>;

  if (error) {
    console.error('Fetch error:', error);
    return (
      <p>Error! {error instanceof Error ? error.message : 'Unknown Error'}</p>
    );
  }
  if (!item) return <>Not Found</>;

  let cardTag = <></>;
  if (tag === 'best-seller') {
    cardTag = <div className="card-tag-bs">Best Seller</div>;
  } else if (tag === 'new') {
    cardTag = <div className="card-tag-new">NEW!</div>;
  } else if (sale) {
    cardTag = <div className="card-tag-sale">SALE!</div>;
  } else {
    cardTag = <></>;
  }
  const salePriceRender = sale ? (
    <span>
      <s className="text-slate-400">&#8381; {item.price}</s>
      <span className="text-red-500"> &#8381; {salePrice}</span>
    </span>
  ) : (
    <span>&#8381; {item.price}</span>
  );
  return (
    <div className="flex justify-evenly items-center mt-24">
      <img src={'/' + item.photoUrl} className="w-1/4 border-2" />
      <div className="flex flex-col justify-center">
        <div>{cardTag}</div>
        <div className="text-5xl">{item.name}</div>
        <div className="text-3xl">{salePriceRender}</div>
        <div>{item.description}</div>
        <div className="flex items-center">
          <button
            className="border-2 border-black bg-slate-200 m-1 w-8"
            onClick={decrement}>
            -
          </button>
          <div>{count}</div>
          <button
            className="border-2 border-black bg-slate-200 m-1 w-8"
            onClick={increment}>
            +
          </button>
        </div>

        <div>
          <button className="border-2 border-black bg-slate-200 m-1 p-1">
            Add to Cart
          </button>
          <button className="border-2 border-black bg-slate-200 m-1 p-1">
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

import { useParams } from 'react-router-dom';
import { bestSellers, getItem, newItems, saleItems } from '../lib/data';
import { Item } from './Catalog';
import { useCallback, useEffect, useState } from 'react';
import { useCart } from './useCart';
import { setTagVer, toggleItemQuantity, toggleSalePrice } from './tagFunctions';

export function ItemDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const { addToCart, toggleOpen } = useCart();

  const [tag, setTag] = useState('none');
  const [sale, setSale] = useState(false);
  const [salePrice, setSalePrice] = useState<number | null>(null);

  const cachedFn = useCallback(
    function settingTags() {
      if (itemId) {
        if (bestSellers.includes(+itemId)) {
          setTag('best-seller');
        } else if (newItems.includes(+itemId)) {
          setTag('new');
        }
        const saleItem = saleItems.find(({ itemId: id }) => +itemId === id);
        if (saleItem) {
          setSale(true);
          setSalePrice(saleItem.newPrice);
        }
      }
    },
    [itemId]
  );

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
        cachedFn();
      }
    }
    fetchItem();
  }, [itemId, cachedFn]);

  if (isLoading) return <>Loading...</>;
  if (error) {
    console.error('Fetch error:', error);
    return (
      <p>Error! {error instanceof Error ? error.message : 'Unknown Error'}</p>
    );
  }
  if (!item) return <>Not Found</>;

  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    if (count > 1) setCount(count - 1);
  }

  const cardTag = setTagVer(tag, sale);
  const salePriceRender = toggleSalePrice(item, sale, salePrice);
  const itemQuantity = toggleItemQuantity(item);

  function handleAddToCart() {
    if (!item) throw new Error('item not found');
    addToCart(item, count);
    toggleOpen();
  }

  return (
    <div className="flex justify-evenly items-center mt-24">
      <img src={'/' + item.photoUrl} className="w-1/4 border-2" />
      <div className="details-count">{itemQuantity}</div>
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
          <button
            onClick={handleAddToCart}
            className="border-2 border-black bg-slate-200 m-1 p-1">
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

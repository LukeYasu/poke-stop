import { useParams } from 'react-router-dom';
import { deleteFavorites, getItem, insertFavorites } from '../lib/data';
import { Item } from './Catalog';
import { useCallback, useEffect, useState } from 'react';
import { useCart } from './useCart';
import { setTagVer, toggleItemQuantity, toggleSalePrice } from './tagFunctions';
import { useUser } from './useUser';
import { useFav } from './useFav';
import { RelatedItems } from './RelatedItems';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ItemDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const { addToCart, toggleOpen } = useCart();
  const { user } = useUser();

  const [tag, setTag] = useState('none');
  const [sale, setSale] = useState(false);

  const { favItemIds, getFavIds } = useFav();
  const { toggleUserBox, userBoxOpen } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);

  const cachedFn = useCallback(
    function settingTags() {
      if (itemId) {
        if (item?.cardTag === 'best seller') {
          setTag('best-seller');
        } else if (item?.cardTag === 'new') {
          setTag('new');
        }

        if (item?.salePrice !== null) {
          setSale(true);
        }
      }
    },
    [item?.cardTag, item?.salePrice, itemId]
  );

  useEffect(() => {
    async function fetchItem() {
      if (itemId) {
        try {
          const item = await getItem(+itemId);
          setItem(item);
          setCount(1);
          favItemIds.includes(+itemId)
            ? setIsFavorite(true)
            : setIsFavorite(false);
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
  }, [itemId, cachedFn, favItemIds]);

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
  const salePriceRender = toggleSalePrice(item);
  const itemQuantity = toggleItemQuantity(item);

  function handleAddToCart() {
    if (user) {
      if (!item) throw new Error('item not found');
      addToCart(item, count);
      toggleOpen();
    } else {
      if (!userBoxOpen) {
        toggleUserBox();
      }
    }
  }

  async function handleFavorite() {
    try {
      if (user && itemId) {
        getFavIds();
        if (isFavorite) {
          setIsFavorite(false);
          await deleteFavorites(+itemId);
        } else {
          setIsFavorite(true);
          await insertFavorites(+itemId);
        }
      } else {
        if (!userBoxOpen) {
          toggleUserBox();
        }
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  return (
    <div className="flex details-orientation justify-evenly items-center mt-24 mb-16">
      <div className="flex">
        <img
          src={'/' + item.photoUrl}
          alt={item.name}
          className="border-2 details-img bg-white details-img"
        />
        <div>
          {isFavorite && user ? (
            <FontAwesomeIcon
              icon={faStar}
              className="details-star text-yellow-300"
              onClick={handleFavorite}
            />
          ) : (
            <FontAwesomeIcon
              icon={faStar}
              className="details-star text-stone-200"
              onClick={handleFavorite}
            />
          )}
        </div>
        <div>
          <div className="details-count">{itemQuantity}</div>
        </div>
      </div>
      <div className="flex flex-col justify-center details-content">
        <div className="relative right-1.5">{cardTag}</div>
        <div className="text-5xl">{item.name}</div>
        <div className="text-3xl">{salePriceRender}</div>
        <div>{item.description}</div>
        <div className="flex items-center">
          <button
            className="border-black bg-slate-200 m-1 w-8 rounded"
            onClick={decrement}>
            -
          </button>
          <div>{count}</div>
          <button
            className="border-black bg-slate-200 m-1 w-8 rounded"
            onClick={increment}>
            +
          </button>
        </div>
        <div>
          <button
            onClick={handleAddToCart}
            className="border-black bg-slate-200 m-1 p-1 rounded">
            Add to Cart
          </button>
          <button
            onClick={handleFavorite}
            className="border-black bg-slate-200 m-1 p-1 rounded">
            Add to Favorites
          </button>
        </div>
        <div className="mt-16">{<RelatedItems itemId={item.itemId} />}</div>
      </div>
    </div>
  );
}

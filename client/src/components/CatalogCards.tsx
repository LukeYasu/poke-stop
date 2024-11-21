import { type Item } from './Catalog';
import '../App.css';
import React, { useEffect, useState } from 'react';
import {
  bestSellers,
  deleteFavorites,
  insertFavorites,
  newItems,
  saleItems,
} from '../lib/data';
import { Link } from 'react-router-dom';
import { setTagVer, toggleItemQuantity, toggleSalePrice } from './tagFunctions';
import { useCart } from './useCart';
import { useUser } from './useUser';
import { useFav } from './useFav';

type Props = {
  item: Item;
};

export function CatalogCards({ item }: Props) {
  const [tag, setTag] = useState('none');
  const [sale, setSale] = useState(false);
  const cardTag = setTagVer(tag, sale);
  const [salePrice, setSalePrice] = useState<number | null>(null);
  const salePriceRender = toggleSalePrice(item, sale, salePrice);
  const itemQuantity = toggleItemQuantity(item);
  const [isFavorite, setIsFavorite] = useState(false);
  const { favItemIds } = useFav();

  const { toggleOpen, addToCart } = useCart();
  const { user } = useUser();
  const { getFavIds } = useFav();

  useEffect(() => {
    if (bestSellers.includes(item.itemId)) {
      setTag('best-seller');
    } else if (newItems.includes(item.itemId)) {
      setTag('new');
    }
    const saleItem = saleItems.find(({ itemId }) => itemId === item.itemId);
    if (saleItem) {
      setSale(true);
      setSalePrice(saleItem.newPrice);
    }
    if (favItemIds.includes(item.itemId)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
    if (!user) setIsFavorite(false);
  }, []);

  async function handleFavorite(e: React.MouseEvent) {
    try {
      if (user) {
        e.preventDefault();
        getFavIds();
        if (isFavorite) {
          setIsFavorite(false);
          await deleteFavorites(item.itemId);
        } else {
          setIsFavorite(true);
          await insertFavorites(item.itemId);
        }
      } else {
        e.preventDefault();
        alert('please sign in or create an account.');
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  function cartCartClick(e: React.MouseEvent) {
    if (user) {
      e.preventDefault();
      toggleOpen();
      addToCart(item, 1);
    } else {
      e.preventDefault();
      alert('please sign in or create an account.');
    }
  }
  return (
    <Link to={'/items/' + item.itemId}>
      <div
        className="border-2 border-zinc-200 m-2 w-40 h-60 card flex flex-col justify-between"
        key={item.itemId}>
        <div className="card-tag-ref">{cardTag}</div>
        <div className="favorite-star-ref">
          {isFavorite ? (
            <img
              className="favorite-star"
              src="/star-solid.png"
              onClick={handleFavorite}
            />
          ) : (
            <img
              className="favorite-star"
              src="/star.png"
              onClick={handleFavorite}
            />
          )}
        </div>
        <img className="p-2 card-img" src={item.photoUrl} />
        <div className="item-count-ref">{itemQuantity}</div>
        <div className="flex flex-col p-1">
          <h2 className="font-semibold">{item.name}</h2>
          <div className="flex justify-between">
            <p>{salePriceRender}</p>
            <img
              className="card-cart"
              src="/Add-Cart-icon.png"
              onClick={cartCartClick}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

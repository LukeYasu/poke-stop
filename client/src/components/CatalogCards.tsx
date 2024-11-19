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

type Props = {
  item: Item;
};

export function CatalogCards({ item }: Props) {
  const [tag, setTag] = useState('none');
  const [sale, setSale] = useState(false);
  const [salePrice, setSalePrice] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toggleOpen, addToCart } = useCart();

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
  }, [item.itemId]);

  const cardTag = setTagVer(tag, sale);
  const itemQuantity = toggleItemQuantity(item);
  const salePriceRender = toggleSalePrice(item, sale, salePrice);
  const { user } = useUser();
  async function handleFavorite(e: React.MouseEvent) {
    try {
      e.preventDefault();
      setIsFavorite(!isFavorite);
      if (user) {
        if (isFavorite) {
          await insertFavorites(item.itemId);
        } else {
          await deleteFavorites(item.itemId);
        }
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  function cartCartClick(e: React.MouseEvent) {
    e.preventDefault();
    toggleOpen();
    addToCart(item, 1);
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
        <img className="p-2" src={item.photoUrl} />
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

import { type Item } from './Catalog';
import '../App.css';
import React, { useEffect, useState } from 'react';
import { deleteFavorites, insertFavorites } from '../lib/data';
import { Link } from 'react-router-dom';
import { setTagVer, toggleItemQuantity, toggleSalePrice } from './tagFunctions';
import { useCart } from './useCart';
import { useUser } from './useUser';
import { useFav } from './useFav';

type Props = {
  item: Item;
};

export function ItemCard({ item }: Props) {
  const [tag, setTag] = useState('none');
  const [sale, setSale] = useState(false);

  const cardTag = setTagVer(tag, sale);
  const salePriceRender = toggleSalePrice(item);
  const itemQuantity = toggleItemQuantity(item);

  const { toggleOpen, addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUser();
  const { favItemIds } = useFav();
  const { getFavIds } = useFav();
  const { toggleUserBox, userBoxOpen } = useUser();

  useEffect(() => {
    if (item.cardTag === 'best seller') {
      setTag('best-seller');
    } else if (item.cardTag === 'new') {
      setTag('new');
    }
    if (item.salePrice !== null) {
      setSale(true);
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
      e.preventDefault();
      if (user) {
        getFavIds();
        if (isFavorite) {
          setIsFavorite(false);
          await deleteFavorites(item.itemId);
        } else {
          setIsFavorite(true);
          await insertFavorites(item.itemId);
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

  function cartCartClick(e: React.MouseEvent) {
    if (user) {
      e.preventDefault();
      toggleOpen();
      addToCart(item, 1);
    } else {
      e.preventDefault();
      if (!userBoxOpen) {
        toggleUserBox();
      }
    }
  }
  return (
    <Link to={'/items/' + item.itemId}>
      <div
        className="border-2 border-zinc-200 m-2 w-40 h-60 card flex flex-col justify-between"
        key={item.itemId}>
        <div className="card-tag-ref">
          <div>{cardTag}</div>
        </div>
        <div className="favorite-star-ref">
          {isFavorite ? (
            <img
              className="favorite-star p-1"
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
        <div className="item-count-ref">
          <div className="item-count-card">{itemQuantity}</div>
        </div>
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

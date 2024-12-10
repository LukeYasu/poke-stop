import { type Item } from './Catalog';
import '../App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setTagVer, toggleItemQuantity, toggleSalePrice } from './tagFunctions';
import { useCart } from './useCart';
import { useUser } from './useUser';
import { useFav } from './useFav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
  const { user } = useUser();
  const { favItemIds, toggleFav } = useFav();
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
  }, [item.cardTag, item.salePrice]);

  async function handleFavorite(e: React.MouseEvent) {
    try {
      e.preventDefault();
      if (user) {
        toggleFav(item.itemId);
      } else {
        if (!userBoxOpen) {
          toggleUserBox();
        }
      }
    } catch (err) {
      console.error(`Error: ${err}`);
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
          <FontAwesomeIcon
            icon={faStar}
            className={`favorite-star ${
              favItemIds.includes(item.itemId)
                ? 'text-yellow-300'
                : 'text-stone-200'
            }`}
            onClick={handleFavorite}
          />
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

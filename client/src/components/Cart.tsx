import { CartItems } from './CartItems';
import { Item } from '../lib/data';
import { useNavigate } from 'react-router-dom';

// import { useState } from 'react';
type Props = {
  onClick: () => void;
  item: Item[];
};
export function Cart({ onClick, item }: Props) {
  const navigate = useNavigate();

  function handleCheckout() {
    alert('successful checkout');
    navigate('/');
  }
  return (
    <div className="shopping-cart-ref">
      <div className="sc-bg" onClick={onClick}></div>
      <div className="shopping-cart flex flex-col">
        <div className="flex justify-between">
          <div>Shopping Cart</div>
          <button className="border-2 h-12 w-12" onClick={onClick}>
            X
          </button>
        </div>
        <div>
          <CartItems cartItem={item} />
        </div>
        <button
          className="border-2 border-black bg-slate-200 m-1 w-36 h-8 leading-3 self-center"
          onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

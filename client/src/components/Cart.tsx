import { CartItems } from './CartItems';
import { Item } from '../lib/data';
import { useNavigate } from 'react-router-dom';
import { useCart } from './useCart';

// import { useState } from 'react';
type Props = {
  onClick: () => void;
  items: Item[];
};
export function Cart({ onClick, items }: Props) {
  const navigate = useNavigate();
  const { toggleOpen, clearCart } = useCart();

  function handleCheckout() {
    alert('successful checkout');
    toggleOpen();
    clearCart();
    navigate('/');
  }
  return (
    <div className="shopping-cart-ref">
      <div className="sc-bg" onClick={onClick}></div>
      <div className="shopping-cart flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between">
            <div className="bg-white w-full p-2 flex justify-between border-b-2 border-black">
              Shopping Cart
              <button className="border-2 h-12 w-12" onClick={onClick}>
                X
              </button>
            </div>
          </div>
          <div>
            <CartItems cartItems={items} />
          </div>
        </div>
        <button
          className="border-2 border-black bg-slate-200 m-8 leading-7 self-center p-2 rounded-md text-xl"
          onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

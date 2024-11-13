import { CartItems } from './CartItems';

// import { useState } from 'react';
type Props = {
  onClick: () => void;
};
export function Cart({ onClick }: Props) {
  return (
    <div className="shopping-cart-ref">
      <div className="sc-bg" onClick={onClick}></div>
      <div className="shopping-cart flex flex-col">
        <div className="flex justify-between">
          <div>Shoping Cart</div>
          <button className="border-2 h-12 w-12" onClick={onClick}>
            X
          </button>
        </div>
        <div>
          <CartItems />
        </div>
      </div>
    </div>
  );
}

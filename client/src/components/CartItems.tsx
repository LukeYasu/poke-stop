import { useEffect, useState } from 'react';
import { CartItem } from './cartContext';
import { useCart } from './useCart';
import { deleteCart } from '../lib/data';

type Props = {
  cartItems: CartItem[];
};

export function CartItems({ cartItems }: Props) {
  const [total, setTotal] = useState(0);
  const { addToCart } = useCart();

  function handleTotal() {
    cartItems.forEach((i) => setTotal(i.price * i.quantity));
  }
  useEffect(() => handleTotal());

  return (
    <div>
      {cartItems.map((item) =>
        item.quantity ? (
          <div className="flex items-center justify-evenly bg-white m-2 rounded-md">
            <img
              src={'/' + item?.photoUrl}
              className="bg-white rounded-md m-2 border-2 border-slate-200"
            />
            <div>{item?.name}</div>
            <div>&nbsp;&#8381;{item.price * item.quantity}</div>
            <button
              className="border-2 border-black bg-slate-200 m-1 w-8 h-8 leading-3"
              onClick={() => {
                if (item.quantity > 1) {
                  addToCart(item, -1);
                }
                handleTotal();
              }}>
              -
            </button>
            <div> count: {item.quantity}</div>
            <button
              className="border-2 border-black bg-slate-200 m-1 w-8 h-8 leading-3"
              onClick={() => {
                addToCart(item, 1);
                handleTotal();
              }}>
              +
            </button>
            <button
              className="border-2 border-black bg-slate-200 m-1 w-30 h-8 leading-3"
              onClick={() => {
                addToCart(item, -item.quantity);
                deleteCart(item.itemId);
                handleTotal();
              }}>
              Delete
            </button>
          </div>
        ) : (
          <></>
        )
      )}
      <div>Total:&nbsp;&#8381;{total}</div>
    </div>
  );
}

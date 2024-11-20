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

  useEffect(() => {
    let cartTotal = 0;
    cartItems.forEach((cartItem) => {
      cartTotal += cartItem.price * cartItem.quantity;
    });
    setTotal(cartTotal);
  }, [cartItems]);

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
              }}>
              -
            </button>
            <div> count: {item.quantity}</div>
            <button
              className="border-2 border-black bg-slate-200 m-1 w-8 h-8 leading-3"
              onClick={() => {
                addToCart(item, 1);
              }}>
              +
            </button>
            <button
              className="border-2 border-black bg-slate-200 m-1 w-30 h-8 leading-3"
              onClick={() => {
                addToCart(item, -item.quantity);
                deleteCart(item.itemId);
              }}>
              Delete
            </button>
          </div>
        ) : (
          <></>
        )
      )}
      <div className="m-2">Total:&nbsp;&#8381;{total}</div>
    </div>
  );
}

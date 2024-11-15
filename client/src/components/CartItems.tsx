import { useEffect, useState } from 'react';
import { CartItem } from './cartContext';
import { useCart } from './useCart';

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
          <div className="flex">
            <img src={'/' + item?.photoUrl} />
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

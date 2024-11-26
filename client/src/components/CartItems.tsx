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
      cartItem.salePrice
        ? (cartTotal += cartItem.salePrice * cartItem.quantity)
        : (cartTotal += cartItem.price * cartItem.quantity);
    });
    setTotal(cartTotal);
  }, [cartItems]);

  return (
    <div>
      {cartItems.map((item) =>
        item.quantity ? (
          <div
            key={item.itemId}
            className="flex items-center justify-between bg-white m-2 rounded-md ">
            <img
              src={'/' + item?.photoUrl}
              className="bg-white rounded-md m-2 border-2 border-slate-200 cart-image"
            />
            <div className="flex flex-col">
              <div className="text-2xl">{item?.name}</div>
              <div className="text-xl">
                &nbsp;&#8381;
                {item.salePrice
                  ? item.salePrice * item.quantity
                  : item.price * item.quantity}
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="border-black bg-slate-200 m-1 w-8 h-8 leading-3"
                onClick={() => {
                  if (item.quantity > 1) {
                    addToCart(item, -1);
                  }
                }}>
                -
              </button>
              <div className="cart-item-count-text">
                {' '}
                count: {item.quantity}
              </div>
              <button
                className="border-black bg-slate-200 m-1 w-8 h-8 leading-3"
                onClick={() => {
                  addToCart(item, 1);
                }}>
                +
              </button>
            </div>
            <div className="delete-ref">
              <button
                className=" border-black m-1 w-30 h-8 delete-button"
                onClick={() => {
                  addToCart(item, -item.quantity);
                  deleteCart(item.itemId);
                }}>
                <img className="w-6" src="/delete.webp" />
              </button>
            </div>
          </div>
        ) : (
          <></>
        )
      )}
      <div className="m-2 border-t-2 border-black">
        Total:&nbsp;&#8381;{total}
      </div>
    </div>
  );
}

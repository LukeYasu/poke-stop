import { useEffect, useState } from 'react';
import { CartItem } from './cartContext';
import { useCart } from './useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
            className="flex items-center justify-between bg-white ml-4 mr-4 mt-2 rounded-md">
            <div className="flex items-center w-1/2">
              <img
                src={'/' + item?.photoUrl}
                className="bg-white rounded-md m-2 border-2 border-slate-200 cart-image"
              />
              <div className="flex flex-col">
                <div className="cart-items-title">{item?.name}</div>
                <div className="cart-items-price">
                  &nbsp;&#8381;
                  {item.salePrice
                    ? item.salePrice * item.quantity
                    : item.price * item.quantity}
                </div>
              </div>
            </div>
            <div className="self-start">
              <button
                className=" border-black m-1 w-30 h-8 delete-button"
                onClick={() => {
                  addToCart(item, -item.quantity);
                }}>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="w-5 mt-4 text-gray-300"
                />
              </button>
            </div>
            <div className="flex items-center justify-center w-1/2">
              <button
                className="border-black bg-slate-200 m-1 cart-items-button "
                onClick={() => {
                  if (item.quantity > 1) {
                    addToCart(item, -1);
                  }
                }}>
                -
              </button>
              <div className="cart-item-count-text">count: {item.quantity}</div>
              <button
                className="border-black bg-slate-200 m-1 cart-items-button"
                onClick={() => {
                  addToCart(item, 1);
                }}>
                +
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

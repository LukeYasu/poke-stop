import { CartItems } from './CartItems';
import { useNavigate } from 'react-router-dom';
import { useCart } from './useCart';
import { CartItem } from './cartContext';
import { deleteClearCart } from '../lib/data';
import { useUser } from './useUser';
import { useState } from 'react';
import { CheckoutMessage } from './CheckoutMessage';

type Props = {
  onClick: () => void;
  items: CartItem[];
};
export function Cart({ onClick, items }: Props) {
  const [checkoutBox, setCheckoutBox] = useState(false);
  const navigate = useNavigate();
  const { toggleOpen, clearCart, isOpen } = useCart();
  const { user } = useUser();

  function handleCheckout() {
    if (!user) {
      alert('Sign in to continue');
    } else if (items.length === 0) {
      alert('no items in cart');
    } else {
      setCheckoutBox(true);
      toggleOpen();
      clearCart();
      deleteClearCart();
      navigate('/');
    }
  }
  function closeMessage() {
    setCheckoutBox(false);
  }
  return (
    <div className="shopping-cart-ref">
      <div
        className={isOpen ? 'sc-bg sc-bg-open' : 'sc-bg sc-bg-close hidden'}
        onClick={onClick}></div>

      <div
        className={
          isOpen
            ? 'cart-popup-open shopping-cart flex flex-col h-full justify-between drop-shadow-2xl'
            : 'cart-popup-close shopping-cart flex flex-col h-full justify-between drop-shadow-2xl'
        }>
        <div>
          <div className="flex justify-between cart-header">
            <div className="bg-white w-full p-2 flex justify-between border-b-2 border-black">
              Shopping Cart
              <button className="border-2 h-12 w-12 rounded" onClick={onClick}>
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
      <div>
        {checkoutBox ? (
          <CheckoutMessage
            showMessage={checkoutBox}
            closeMessage={closeMessage}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

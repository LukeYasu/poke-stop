import { Link, Outlet } from 'react-router-dom';
import { Cart } from './Cart';
import { useCart } from './useCart';
import { useState } from 'react';
import { useUser } from './useUser';

export function Header() {
  const { cart, toggleOpen } = useCart();
  const [userAccountOpen, setUserAccountOpen] = useState(false);
  const { user } = useUser();
  function handleSignInPrompt() {
    setUserAccountOpen(!userAccountOpen);
  }

  const userAccBox = (
    <div className="user-login-ref">
      <div className="user-login flex flex-wrap w-44 rounded">
        <div className="w-full flex justify-end">
          <button
            onClick={handleSignInPrompt}
            className="border-2 border-slate-400 w-7 h-7 text-base rounded m-1 bg-slate-300 text-white">
            X
          </button>
        </div>
        <div className="flex w-full justify-between p-1">
          <Link
            to="sign-in"
            className="border-slate-400 border-2 rounded h-8 text-white text-lg bg-slate-300 pl-1 pr-1"
            onClick={handleSignInPrompt}>
            user login
          </Link>
          <Link
            to="sign-up"
            className="border-slate-400 border-2 rounded h-8 text-white text-lg bg-slate-300 pl-1 pr-1"
            onClick={handleSignInPrompt}>
            sign up
          </Link>
        </div>
      </div>
    </div>
  );
  const signedInAccBox = (
    <div className="user-login-ref">
      <div className="logged-in-box flex justify-center flex-col">
        <div>{user?.username}</div>
        <button className="border-black border-2">Log Out</button>
      </div>
    </div>
  );
  function handleAccBox() {
    if (userAccountOpen) {
      if (user?.username) {
        return signedInAccBox;
      }
      return userAccBox;
    }
  }

  return (
    <div>
      <div className="header">
        <div className="header-width">
          <div className="col-two-third">
            <Link to={'/'}>
              <h1 className="logo m-1">PokeStop</h1>
            </Link>
            <Link to={'/all-items'}>
              <div className="m-8 text-xl text-white header-options h-20 flex items-center">
                All Items
              </div>
            </Link>
            <Link to={'/capture-balls'}>
              <div className="m-8 text-xl text-white header-options h-20 flex items-center">
                Capture Balls
              </div>
            </Link>
            <Link to={'/consumables'}>
              <div className="m-8 text-xl text-white header-options h-20 flex items-center">
                Consumables
              </div>
            </Link>
          </div>
          <div className="col-third cart">
            <div className="text-2xl">{user?.username}</div>
            <Link to={'/favorites'}>
              <img src="../star.png" className="star" />
            </Link>
            <img
              src="../user.png"
              className="user"
              onClick={handleSignInPrompt}
            />
            <div>{handleAccBox()}</div>
            <img
              src="../cart.png"
              className="cart cursor-pointer"
              onClick={toggleOpen}
            />
            <div className="cart-count-ref">
              {cart.length !== 0 ? (
                <div className="cart-count">{cart.length}</div>
              ) : (
                <></>
              )}
            </div>
            {/* {isOpen ? (
            <div className="cart-popup">
              <Cart onClick={toggleOpen} items={cart} />
            </div>
          ) : (
            <div className="cart-popup-close"></div>
          )} */}
            {<Cart onClick={toggleOpen} items={cart} />}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

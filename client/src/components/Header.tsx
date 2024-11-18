import { Link, Outlet } from 'react-router-dom';
import { Cart } from './Cart';
import { useCart } from './useCart';
import { useState } from 'react';
import { useUser } from './useUser';

export function Header() {
  const { cart, toggleOpen, isOpen } = useCart();
  const [userAccountOpen, setUserAccountOpen] = useState(false);
  const { user } = useUser();
  function handleSignInPrompt() {
    setUserAccountOpen(!userAccountOpen);
  }

  const userAccBox = (
    <div className="user-login-ref">
      <div className="user-login flex justify-evenly">
        <Link
          to="sign-in"
          className="border-black border-2"
          onClick={handleSignInPrompt}>
          user login
        </Link>
        <Link
          to="sign-up"
          className="border-black border-2"
          onClick={handleSignInPrompt}>
          sign up
        </Link>
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
        <div className="col-half">
          <div className="burger">burger</div>
          <Link to={'/'}>
            <h1 className="logo">PokeStop</h1>
          </Link>
          <Link to={'/all-items'}>
            <div className="m-8 text-xl">All Items</div>
          </Link>
        </div>
        <div className="col-half cart">
          {user?.username}
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
          <div>{cart.length}</div>
          {isOpen ? <Cart onClick={toggleOpen} items={cart} /> : <></>}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

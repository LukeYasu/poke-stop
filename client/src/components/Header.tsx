import { Link, Outlet } from 'react-router-dom';
import { Cart } from './Cart';
import { useCart } from './useCart';
import { useState } from 'react';
import { useUser } from './useUser';

export function Header() {
  const { cart, toggleOpen, isOpen } = useCart();
  const [userLoginOpen, setUserLoginOpen] = useState(false);
  const { user } = useUser();
  function handleSignInPrompt() {
    setUserLoginOpen(!userLoginOpen);
  }
  return (
    <div>
      <div className="header">
        <div className="col-half">
          <div className="burger">{user?.username}</div>
          <Link to={'/'}>
            <h1 className="logo">PokeStop</h1>
          </Link>
        </div>
        <div className="col-half cart">
          <Link to={'/favorites'}>
            <img src="../star.png" className="star" />
          </Link>
          <img
            src="../user.png"
            className="user"
            onClick={handleSignInPrompt}
          />
          <div>
            {userLoginOpen ? (
              <div className="user-login-ref">
                <div className="user-login flex justify-evenly">
                  <Link
                    to="sign-in"
                    className="border-black border-2"
                    onClick={handleSignInPrompt}>
                    user login{' '}
                  </Link>
                  <Link
                    to="sign-up"
                    className="border-black border-2"
                    onClick={handleSignInPrompt}>
                    sign up
                  </Link>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
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

import { Link, Outlet } from 'react-router-dom';
import { Cart } from './Cart';
import { useCart } from './useCart';
import { useUser } from './useUser';
import { UserAccBox } from './UserAccBox';
import { AppDrawer } from './AppDrawer';
// import { useEffect, useState } from 'react';

export function Header() {
  const { cart, toggleOpen } = useCart();
  const { user, toggleUserBox, drawerOpen, toggleDrawer } = useUser();
  // const [cartNum, setCartNum] = useState(0);

  // useEffect(() => {
  //   for (let i = 0; i < cart.length; i++) {
  //     const cartNumber = cart[i].quantity;
  //     setCartNum(cartNumber);
  //   }
  // }, [cart]);

  return (
    <div>
      <div className="">
        <div className="header page-container flex items-center">
          <div className="w-2/3 flex justify-start items-center">
            <div className="flex justify-center">
              <img
                onClick={toggleDrawer}
                src="/burger.webp"
                className="burger"
              />
              {<AppDrawer />}
              <div
                onClick={toggleDrawer}
                className={
                  drawerOpen ? 'sc-bg ad-bg-open' : 'sc-bg sc-bg-close hidden'
                }></div>
            </div>
            <div className="w-full flex h-20 items-center justify-between">
              <div>
                <Link to={'/'}>
                  <div className="w-46">
                    <img className="h-14 rounded-2xl m-2" src="/logo.png" />
                  </div>
                </Link>
              </div>
              <div>
                <Link to={'/all-items'}>
                  <div className="text-lg text-white header-options h-20 flex items-center m-1">
                    All Items
                  </div>
                </Link>
              </div>
              <div>
                <Link to={'/capture-balls'}>
                  <div className="text-lg text-white header-options h-20 flex items-center m-1">
                    Capture Balls
                  </div>
                </Link>
              </div>
              <div>
                <Link to={'/consumables'}>
                  <div className="text-lg text-white header-options h-20 flex items-center m-1">
                    Consumables
                  </div>
                </Link>
              </div>
              <div>
                <Link to={'/power-ups'}>
                  <div className="text-lg text-white header-options h-20 flex items-center m-1">
                    Power Ups
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-third cart">
            <div className="flex flex-col text-white cursor-default text-orange-300">
              {user ? (
                <div className="flex flex-col justify-between h-full">
                  <div className="header-trainer-name h-4">Trainer</div>
                  <div className="header-trainer-name text-center">
                    {user?.username}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <Link to={'/favorites'}>
              <img src="../star.png" className="star invert" />
            </Link>
            <div tabIndex={0} onClick={toggleUserBox}>
              <img src="../user.png" className="user invert" />
            </div>
            <div>{<UserAccBox />}</div>
            <img
              src="../cart.png"
              className="cart invert cursor-pointer"
              onClick={toggleOpen}
            />
            <div className="cart-count-ref">
              {cart.length !== 0 ? (
                <div className="cart-count cursor-default">{cart.length}</div>
              ) : (
                <></>
              )}
            </div>
            {<Cart onClick={toggleOpen} items={cart} />}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

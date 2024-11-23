import { Link, Outlet } from 'react-router-dom';
import { Cart } from './Cart';
import { useCart } from './useCart';
import { useUser } from './useUser';
import { UserAccBox } from './UserAccBox';

export function Header() {
  const { cart, toggleOpen } = useCart();
  const { user, toggleUserBox } = useUser();

  return (
    <div>
      <div className="header">
        <div className="page-container flex items-center">
          <div className="w-full flex h-20 items-center justify-between">
            <Link to={'/'}>
              <div className="w-46">
                <img className="h-14 rounded-2xl" src="/logo.png" />
              </div>
            </Link>
            <Link to={'/all-items'}>
              <div className="text-lg text-white header-options h-20 flex items-center">
                All Items
              </div>
            </Link>
            <Link to={'/capture-balls'}>
              <div className="text-lg text-white header-options h-20 flex items-center">
                Capture Balls
              </div>
            </Link>
            <Link to={'/consumables'}>
              <div className="text-lg text-white header-options h-20 flex items-center">
                Consumables
              </div>
            </Link>
            <Link to={'/power-ups'}>
              <div className="text-lg text-white header-options h-20 flex items-center">
                Power Ups
              </div>
            </Link>
          </div>
          <div className="col-third cart">
            <div className="flex flex-col text-white cursor-default">
              {user ? (
                <>
                  <div className="text-xl h-4">Trainer</div>
                  <div className="text-xl text-center">{user?.username}</div>
                </>
              ) : (
                <></>
              )}
            </div>
            <Link to={'/favorites'}>
              <img src="../star.png" className="star invert" />
            </Link>
            <div
              tabIndex={0}
              onClick={toggleUserBox}
              // onFocus={!userBoxOpen ? toggleUserBox : () => undefined}
              // onBlur={userBoxOpen ? toggleUserBox : () => undefined}
            >
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
      </div>
      <Outlet />
    </div>
  );
}

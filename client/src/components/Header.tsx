import { Link, Outlet } from 'react-router-dom';
import { Cart } from './Cart';
import { useCart } from './useCart';

export function Header() {
  const { cart, toggleOpen, isOpen } = useCart();

  return (
    <div>
      <div className="header">
        <div className="col-half">
          <div className="burger">burger</div>
          <Link to={'/'}>
            <h1 className="logo">PokeStop</h1>
          </Link>
        </div>
        <div className="col-half cart">
          <Link to={'/favorites'}>
            <img src="../star.png" className="star" />
          </Link>
          <img src="../user.png" className="user" />
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

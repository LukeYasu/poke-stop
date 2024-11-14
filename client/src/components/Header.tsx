import { Link, Outlet } from 'react-router-dom';
import { Cart } from './Cart';
import { useState } from 'react';
import { useCart } from './useCart';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  function handleOpen() {
    setIsOpen(!isOpen);
  }

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
          <img src="../star.png" className="star" />
          <img src="../user.png" className="user" />
          <img
            src="../cart.png"
            className="cart cursor-pointer"
            onClick={handleOpen}
          />
          {isOpen ? <Cart onClick={handleOpen} item={cart} /> : <></>}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

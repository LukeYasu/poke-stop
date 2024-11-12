import { Outlet } from 'react-router-dom';

export function Header() {
  return (
    <div>
      <div className="header">
        <div className="col-half">
          {' '}
          <div className="burger">burger</div>
          <h1 className="logo">PokeStop</h1>
        </div>
        <div className="col-half cart">
          <img src="../star.png" className="star" />
          <img src="../user.png" className="user" />
          <img src="../cart.png" className="cart" />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useUser } from './useUser';
/* Is only visible on mobile view */
export function AppDrawer() {
  const { toggleDrawer, drawerOpen } = useUser();
  return (
    <div className="app-drawer-ref">
      <div
        className={
          drawerOpen
            ? 'app-drawer app-drawer-open flex flex-col'
            : 'app-drawer app-drawer-close flex flex-col'
        }>
        <div className="bg-white w-full p-2 flex justify-between border-b-2 border-black">
          <button className="border-2 h-12 w-12 rounded" onClick={toggleDrawer}>
            X
          </button>
          Explore
        </div>
        <Link to={'/all-items'} onClick={toggleDrawer}>
          <div className="app-drawer-titles">All Items</div>
        </Link>
        <Link to={'/capture-balls'} onClick={toggleDrawer}>
          <div className="app-drawer-titles">Capture Balls</div>
        </Link>
        <Link to={'/consumables'} onClick={toggleDrawer}>
          <div className="app-drawer-titles">Consumables</div>
        </Link>
        <Link to={'/power-ups'} onClick={toggleDrawer}>
          <div className="app-drawer-titles">Power Ups</div>
        </Link>
      </div>
    </div>
  );
}

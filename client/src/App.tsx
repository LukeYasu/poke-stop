import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { NotFound } from './components/NotFound';
import { ItemDetails } from './components/ItemDetails';
import { CartProvider } from './components/cartContext';
import { Favorites } from './components/Favorites';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { UserProvider } from './components/UserContext';
import { AllItems } from './components/AllItems';
import { FavProvider } from './components/FavContext';
import { CaptureBalls } from './components/CaptureBalls';
import { Consumables } from './components/Consumables';
import { PowerUps } from './components/PowerUps';
import { HomePage } from './components/HomePage';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <FavProvider>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<HomePage />} />
              <Route path="items/:itemId" element={<ItemDetails />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="all-items" element={<AllItems />} />
              <Route path="capture-balls" element={<CaptureBalls />} />
              <Route path="consumables" element={<Consumables />} />
              <Route path="power-ups" element={<PowerUps />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </FavProvider>
      </CartProvider>
    </UserProvider>
  );
}
export default App;

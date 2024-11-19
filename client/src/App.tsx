import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Catalog } from './components/Catalog';
import { Header } from './components/Header';
import { NotFound } from './components/NotFound';
import { ItemDetails } from './components/ItemDetails';
import { CartProvider } from './components/cartContext';
import { Favorites } from './components/Favorites';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { UserProvider } from './components/UserContext';
import { AllItems } from './components/AllItems';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Catalog />} />
            <Route path="items/:itemId" element={<ItemDetails />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="all-items" element={<AllItems />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </UserProvider>
  );
}
export default App;

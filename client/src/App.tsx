import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Catalog } from './components/Catalog';
import { Header } from './components/Header';
import { NotFound } from './components/NotFound';
import { ItemDetails } from './components/ItemDetails';
import { CartProvider } from './components/cartContext';
import { Favorites } from './components/Favorites';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Catalog />} />
          <Route path="items/:itemId" element={<ItemDetails />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
export default App;

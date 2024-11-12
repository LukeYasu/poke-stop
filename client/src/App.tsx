import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Catalog } from './components/Catalog';
import { Header } from './components/Header';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Catalog />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
export default App;

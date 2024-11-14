import { createContext, ReactNode, useState } from 'react';
import { Item } from '../lib/data';

export type CartValue = {
  cart: Item[];
  addToCart: (item: Item) => void;
};

const defaultCartValue: CartValue = {
  cart: [],
  addToCart: () => undefined,
};

export const CartContext = createContext(defaultCartValue);

type Props = {
  children: ReactNode;
};

export function CartProvider({ children }: Props) {
  const [cartContents, setCartContents] = useState<Item[]>([]);
  function addItem(item: Item) {
    setCartContents((prev) => [...prev, item]);
  }
  const cartContentValues = { cart: cartContents, addToCart: addItem };
  return (
    <CartContext.Provider value={cartContentValues}>
      {children}
    </CartContext.Provider>
  );
}

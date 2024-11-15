import { createContext, ReactNode, useState } from 'react';
import { Item } from '../lib/data';

export type CartValue = {
  cart: CartItem[];
  addToCart: (item: Item, quantity: number) => void;
  toggleOpen: () => void;
  isOpen: boolean;
  clearCart: () => void;
};
export type CartItem = Item & {
  quantity: number;
};

const defaultCartValue: CartValue = {
  cart: [],
  addToCart: () => undefined,
  toggleOpen: () => undefined,
  isOpen: false,
  clearCart: () => undefined,
};

export const CartContext = createContext(defaultCartValue);

type Props = {
  children: ReactNode;
};

export function CartProvider({ children }: Props) {
  const [cartContents, setCartContents] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  function addItem(item: Item, quantity: number) {
    const dupeItem = cartContents.find((i) => i.itemId === item.itemId);
    if (dupeItem) {
      dupeItem.quantity += quantity;
      const mergedItems = cartContents.map((i) =>
        i.itemId === dupeItem.itemId ? dupeItem : i
      );
      setCartContents(mergedItems);
    } else {
      const cartItem = { ...item, quantity };
      setCartContents((prev) => [...prev, cartItem]);
    }
  }
  function toggleOpen() {
    setIsOpen(!isOpen);
  }
  function clearCart() {
    setCartContents([]);
  }
  const cartContentValues = {
    cart: cartContents,
    addToCart: addItem,
    toggleOpen: toggleOpen,
    isOpen: isOpen,
    clearCart,
  };
  return (
    <CartContext.Provider value={cartContentValues}>
      {children}
    </CartContext.Provider>
  );
}

import { createContext, ReactNode, useState } from 'react';
import { deleteCart, insertCart, Item, updateCart } from '../lib/data';

export type CartValue = {
  cart: CartItem[];
  addToCart: (item: Item, quantity: number) => Promise<void>;
  toggleOpen: () => void;
  isOpen: boolean;
  clearCart: () => void;
};
export type CartItem = Item & {
  quantity: number;
};

const defaultCartValue: CartValue = {
  cart: [],
  addToCart: async () => {},
  toggleOpen: () => undefined,
  isOpen: false,
  clearCart: async () => undefined,
};

export const CartContext = createContext(defaultCartValue);

type Props = {
  children: ReactNode;
};

export function CartProvider({ children }: Props) {
  const [cartContents, setCartContents] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  async function addItem(item: Item, quantity: number) {
    const dupeItem = cartContents.find((i) => i.itemId === item.itemId);
    if (dupeItem) {
      const newQuantity = dupeItem.quantity + quantity;
      if (newQuantity === 0) {
        await deleteDB(item.itemId);
      } else {
        const mergedItems = cartContents.map((i) =>
          i.itemId === dupeItem.itemId
            ? { ...dupeItem, quantity: newQuantity }
            : i
        );
        setCartContents(mergedItems);
        await updateCartDB({ ...item, quantity: newQuantity });
      }
    } else {
      const cartItem = { ...item, quantity };
      setCartContents((prev) => [...prev, cartItem]);
      await addToCartDB({ ...item, quantity: quantity });
    }
  }
  function toggleOpen() {
    setIsOpen(!isOpen);
  }
  function clearCart() {
    setCartContents([]);
  }
  async function addToCartDB(item: Item) {
    try {
      await insertCart(item);
    } catch (err) {
      console.error(err);
    }
  }
  async function updateCartDB(item: Item) {
    try {
      await updateCart(item);
    } catch (err) {
      console.error(err);
    }
  }
  async function deleteDB(itemId: number) {
    try {
      await deleteCart(itemId);
    } catch (err) {
      console.error(err);
    }
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

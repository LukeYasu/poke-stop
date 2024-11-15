import { CartItem } from '../components/cartContext';
import { User } from '../components/UserContext';

export type Item = {
  itemId: number;
  name: string;
  price: number;
  photoUrl: string;
  description: string;
  quantity: number;
  stock: number;
};

export const carouselImages = [
  { src: '../fire-bundle.png', alt: 'Fire Bundle' },
  { src: '../trainer-starter-pack.png', alt: 'trainer starter pack' },
];

/** includes all the itemId for items with the tag 'best seller' in CartItems.tsx */
export const bestSellers = [1, 2, 5];
/** includes all the itemId for items with the tag 'NEW!' in CartItems.tsx */
export const newItems = [7];
/** includes all the itemId for items with the tag 'SALE!' in CartItems.tsx */
export const saleItems = [{ itemId: 6, newPrice: 1600 }];

export async function getItems(): Promise<Item[]> {
  const response = await fetch('/api/items');
  if (!response.ok) throw new Error(`response status: ${response.status}`);
  const items = await response.json();
  return items;
}

export async function getItem(itemId: number): Promise<Item> {
  const response = await fetch(`/api/items/${itemId}`);
  if (!response.ok) throw new Error(`response status: ${response.status}`);
  const item = await response.json();
  return item;
}
const authKey = 'um.auth';

type Auth = {
  user: User;
  token: string;
};

export function saveAuth(user: User, token: string): void {
  const auth: Auth = { user, token };
  localStorage.setItem(authKey, JSON.stringify(auth));
}

export function removeAuth(): void {
  localStorage.removeItem(authKey);
}

export function readUser(): User | undefined {
  const auth = localStorage.getItem(authKey);
  if (!auth) return undefined;
  return (JSON.parse(auth) as Auth).user;
}

export function readToken(): string | undefined {
  const auth = localStorage.getItem(authKey);
  if (!auth) return undefined;
  return (JSON.parse(auth) as Auth).token;
}

export async function insertCart(cartItem: CartItem) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${readToken()}`,
    },
    body: JSON.stringify(cartItem),
  };
  const res = await fetch('api/cart-items', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return (await res.json()) as CartItem;
}

export async function updateCart(cartItem: CartItem) {
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${readToken()}`,
    },
    body: JSON.stringify(cartItem),
  };
  const res = await fetch('api/cart-items', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return (await res.json()) as CartItem;
}

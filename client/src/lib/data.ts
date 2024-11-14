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

/**
 *@constant bestSellers includes all the itemId for items with the tag 'best seller' in CartItems.tsx
 *@constant newItems includes all the itemId for items with the tag 'NEW!' in CartItems.tsx
 *@constant saleItems includes all the itemId for items with the tag 'SALE!' in CartItems.tsx
 */
export const bestSellers = [1, 2, 5];
export const newItems = [7];
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

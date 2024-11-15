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

// const [cartItems, setCartItems] = useState<
//   (Item & { effectivePrice: number })[]
// >([]);

// useEffect(() => {
//   const mergedItems: (Item & { effectivePrice: number })[] = [];

//   cartItem.forEach((item) => {
//     const duplicateItem = mergedItems.find((i) => i.itemId === item.itemId);
//     const cartSaleItem = saleItems.find(
//       (sale) => sale.itemId === item.itemId
//     );
//     if (duplicateItem) {
//       duplicateItem.quantity += item.quantity;
//       duplicateItem.price += item.price;

//       if (cartSaleItem) {
//         duplicateItem.effectivePrice += cartSaleItem.newPrice * item.quantity;
//       } else {
//         duplicateItem.effectivePrice += item.price;
//       }
//     } else {
//       mergedItems.push({
//         ...item,
//         effectivePrice: cartSaleItem
//           ? cartSaleItem.newPrice * item.quantity
//           : item.price * item.quantity,
//       });
//     }
//   });
//   setCartItems(mergedItems);
// }, [cartItem]);

// function handleDecrementQuantity(itemId: number) {
//   setCartItems((prev) =>
//     prev.map((item) =>
//       item.itemId === itemId && item.quantity > 1
//         ? {
//             ...item,
//             quantity: item.quantity - 1,
//             effectivePrice:
//               item.effectivePrice - item.effectivePrice / item.quantity,
//           }
//         : item
//     )
//   );
// }

// function handleIncrementQuantity(itemId: number) {
//   setCartItems((prev) =>
//     prev.map((item) =>
//       item.itemId === itemId
//         ? {
//             ...item,
//             quantity: item.quantity + 1,
//             effectivePrice:
//               item.effectivePrice + item.effectivePrice / item.quantity,
//           }
//         : item
//     )
//   );
// }
// function handleDelete(itemId: number) {
//   setCartItems((prev)=>cartItems.splice(cartItems[findIndex(i)=>i.itemId === itemId],1));
// }

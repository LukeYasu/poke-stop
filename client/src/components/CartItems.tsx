import { useEffect, useState } from 'react';
import { Item } from '../lib/data';

type Props = {
  cartItem: Item[];
};

export function CartItems({ cartItem }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const mergedItems: Item[] = [];
    cartItem.forEach((item) => {
      const thisItem = mergedItems.find((i) => i.itemId === item.itemId);
      if (thisItem) {
        thisItem.quantity += item.quantity;
        thisItem.price += item.price;
        setItemCount((prev) => prev + 1);
      } else {
        mergedItems.push({ ...item });
      }
    });
    setItems(mergedItems);
  }, [cartItem]);

  return items.map((item) => (
    <div className="flex">
      <img src={'/' + item?.photoUrl} />
      <div>{item?.name}</div>
      <div>&#8381; {item.price}</div>
      <button className="border-2 border-black bg-slate-200 m-1 w-8 h-8 leading-3">
        -
      </button>
      <div> count: {itemCount}</div>
      <button className="border-2 border-black bg-slate-200 m-1 w-8 h-8 leading-3">
        +
      </button>
    </div>
  ));
}

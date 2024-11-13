import { useEffect, useState } from 'react';
import { getItem, Item } from '../lib/data';

export function CartItems() {
  const [item, setItem] = useState<Item>();
  useEffect(() => {
    async function fetchItem() {
      try {
        const fetchedItem = await getItem(1);
        setItem(fetchedItem);
      } catch (err) {
        console.error(err);
      }
    }

    fetchItem();
  }, []);
  return (
    <div className="flex">
      <img src={item?.photoUrl} />
      <div>{item?.name}</div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { getItem, getItems, Item } from '../lib/data';
import { RelatedItemsMap } from './RelatedItemsMap';

type Props = {
  itemId: number;
};

export function RelatedItems({ itemId }: Props) {
  const [items, setItems] = useState<Item[]>();
  const [item, setItem] = useState<Item>();
  useEffect(() => {
    async function fetchItems() {
      try {
        const fetchedItems = await getItems();
        setItems(fetchedItems);
        const fetchedItem = await getItem(itemId);
        setItem(fetchedItem);
      } catch (err) {
        console.error(err);
      }
    }
    fetchItems();
  }, [itemId]);
  if (item && items) {
    return <RelatedItemsMap item={item} items={items} />;
  }
}

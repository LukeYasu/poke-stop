import { useEffect, useState } from 'react';
import { getItem, getItems, Item } from '../lib/data';
import { toggleItemQuantity } from './tagFunctions';

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
  if (items) {
    if (item?.itemType === 'capture ball') {
      return (
        <div className="flex overflow-scroll border-2">
          {items?.map((item) =>
            item.itemType === 'capture ball' ? (
              <div>
                <img src={'/' + item.photoUrl} className="h-16" />
                <div className="absolute w-2">{toggleItemQuantity(item)}</div>
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      );
    }
  } else {
    <>womp</>;
  }
}

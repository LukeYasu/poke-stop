import { useEffect, useState } from 'react';
import { getItem, getItems, Item } from '../lib/data';
import { toggleItemQuantity } from './tagFunctions';
import { Link } from 'react-router-dom';

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
  if (item?.itemType === 'capture ball') {
    return (
      <div className="flex overflow-y-scroll border-2">
        {items?.map((item) => {
          if (item.itemType === 'capture ball') {
            return (
              <div className="h-16">
                <Link to={'/items/' + item.itemId}>
                  <img src={'/' + item.photoUrl} className="h-16" />
                  <div>
                    {toggleItemQuantity(item) && item.quantity > 1 ? (
                      <div className="relative bg-slate-100 rounded border-2 h-6 w-6 leading-5 text-center bottom-7 left-9">
                        {item.quantity}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </Link>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

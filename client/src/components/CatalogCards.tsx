import { type Item } from './Catalog';
import '../App.css';
import { useEffect, useState } from 'react';
import { bestSellers, newItems, saleItems } from '../lib/data';
import { Link } from 'react-router-dom';
import { setTagVer, toggleItemQuantity, toggleSalePrice } from './tagFunctions';

type Props = {
  item: Item;
};

export function CatalogCards({ item }: Props) {
  const [tag, setTag] = useState('none');
  const [sale, setSale] = useState(false);
  const [salePrice, setSalePrice] = useState<number | null>(null);

  useEffect(() => {
    if (bestSellers.includes(item.itemId)) {
      setTag('best-seller');
    } else if (newItems.includes(item.itemId)) {
      setTag('new');
    }
    const saleItem = saleItems.find(({ itemId }) => itemId === item.itemId);
    if (saleItem) {
      setSale(true);
      setSalePrice(saleItem.newPrice);
    }
  }, [item.itemId]);

  const cardTag = setTagVer(tag, sale);
  const itemQuantity = toggleItemQuantity(item);
  const salePriceRender = toggleSalePrice(item, sale, salePrice);

  return (
    <Link to={'/items/' + item.itemId}>
      <div
        className="border-2 border-zinc-200 m-2 w-40 h-60 card flex flex-col justify-between"
        key={item.itemId}>
        <div className="card-tag-ref">{cardTag}</div>
        <div className="favorite-star-ref">
          <img className="favorite-star" src="/star.png" />
        </div>
        <img className="p-2" src={item.photoUrl} />
        <div className="item-count-ref">{itemQuantity}</div>
        <div className="flex flex-col p-1">
          <h2 className="font-semibold">{item.name}</h2>
          <div className="flex justify-between">
            <p>{salePriceRender}</p>
            <img className="w-6" src="/Add-Cart-icon.png" />
          </div>
        </div>
      </div>
    </Link>
  );
}

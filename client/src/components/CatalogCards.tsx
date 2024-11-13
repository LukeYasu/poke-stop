import { type Item } from './Catalog';
import '../App.css';
import { useEffect, useState } from 'react';
import { bestSellers, newItems, saleItems } from '../lib/data';
import { Link } from 'react-router-dom';

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
  let cardTag = <></>;
  if (tag === 'best-seller') {
    cardTag = <div className="card-tag-bs">Best Seller</div>;
  } else if (tag === 'new') {
    cardTag = <div className="card-tag-new">NEW!</div>;
  } else if (sale) {
    cardTag = <div className="card-tag-sale">SALE!</div>;
  } else {
    cardTag = <></>;
  }

  const itemQuantity =
    item.quantity === 1 ? (
      <></>
    ) : (
      <div className="item-count ">{item.quantity}</div>
    );
  const salePriceRender = sale ? (
    <span>
      <s className="text-slate-400">&#8381; {item.price}</s>
      <span className="text-red-500"> &#8381; {salePrice}</span>
    </span>
  ) : (
    <span>&#8381; {item.price}</span>
  );
  return (
    <Link to={'/items/' + item.itemId}>
      <div
        className="border-2 border-zinc-200 m-2 w-40 h-60 card"
        key={item.itemId}>
        <div className="card-tag-ref">{cardTag}</div>
        <img className="p-2" src={item.photoUrl} />
        <div className="item-count-ref">{itemQuantity}</div>
        <div className="flex flex-col">
          <h2>{item.name}</h2>
          <p>{salePriceRender}</p>
        </div>
      </div>
    </Link>
  );
}

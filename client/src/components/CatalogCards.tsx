import { Item } from './Catalog';

type Props = {
  item: Item;
};

export function CatalogCards({ item }: Props) {
  return (
    <div className="card" key={item.itemId}>
      <div className="card-tag-ref">
        <div className="card-tag">Best Seller</div>
      </div>
      <img className="card-img" src={item.photoUrl} />
      <div className="item-count-ref">
        <div className="item-count">10x</div>
      </div>
      <div className="card-text">
        <h2>{item.name}</h2>
        <p>&#8381; {item.price}</p>
      </div>
    </div>
  );
}

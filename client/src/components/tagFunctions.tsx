import { Item } from '../lib/data';

/* Determines which tag, if any, gets displayed onto an item */
export function setTagVer(tag: string, sale: boolean) {
  if (tag === 'best-seller') {
    return <div className="card-tag-bs">Best Seller</div>;
  } else if (tag === 'new') {
    return <div className="card-tag-new">NEW!</div>;
  } else if (sale) {
    return <div className="card-tag-sale">SALE!</div>;
  } else {
    return <></>;
  }
}
/* Puts a strikethrough the original price and displays sale price in red to emphasize the sale */
export function toggleSalePrice(item: Item) {
  return item.salePrice ? (
    <span>
      <s className="text-slate-400">&#8381; {item.price}</s>
      <span className="text-red-500"> &#8381; {item.salePrice}</span>
    </span>
  ) : (
    <span>&#8381; {item.price}</span>
  );
}

/* If the item has a quantity greater than 1, it displays the item quantity number with the item */
export function toggleItemQuantity(item: Item) {
  return item.quantity === 1 ? (
    <></>
  ) : (
    <div className="item-count">
      <div>{item.quantity}x</div>
    </div>
  );
}

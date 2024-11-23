// import { useState, useEffect } from 'react';
// import { getItems, Item } from '../lib/data';

import { Item } from '../lib/data';

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

export function toggleItemQuantity(item: Item) {
  return item.quantity === 1 ? (
    <></>
  ) : (
    <div className="item-count">
      <div>{item.quantity}x</div>
    </div>
  );
}

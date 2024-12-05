import { Link } from 'react-router-dom';
import { Item } from '../lib/data';
import { toggleItemQuantity } from './tagFunctions';

type Props = {
  item: Item;
  items: Item[];
};

export function RelatedItemsMap({ item, items }: Props) {
  if (item?.itemType === 'consumable') {
    return (
      <div className="flex flex-row flex-wrap border-2 items-center">
        {items?.map((mapItem) => {
          if (mapItem.itemType === 'consumable') {
            return (
              <div className="h-16 w-16" key={mapItem.itemId}>
                <Link to={'/items/' + mapItem.itemId}>
                  <div>
                    <img
                      alt={mapItem.name}
                      src={'/' + mapItem.photoUrl}
                      className={
                        mapItem.itemId === item.itemId
                          ? 'max-h-16 border-4'
                          : 'max-h-16'
                      }
                    />
                  </div>
                  <div>
                    {toggleItemQuantity(mapItem) && mapItem.quantity > 1 ? (
                      <div className="relative bg-slate-100 rounded border-2 h-6 w-6 leading-5 text-center bottom-7 left-9">
                        {mapItem.quantity}
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
  if (item?.itemType === 'evo stone') {
    return (
      <div className="flex flex-row flex-wrap border-2 items-center w-full">
        {items?.map((mapItem) => {
          if (mapItem.itemType === 'evo stone') {
            return (
              <div className="h-16 w-16" key={mapItem.itemId}>
                <Link to={'/items/' + mapItem.itemId}>
                  <div>
                    <img
                      alt={mapItem.name}
                      src={'/' + mapItem.photoUrl}
                      className={
                        mapItem.itemId === item.itemId
                          ? 'max-h-16 border-4'
                          : 'max-h-16'
                      }
                    />
                  </div>
                  <div>
                    {toggleItemQuantity(mapItem) && mapItem.quantity > 1 ? (
                      <div className="relative bg-slate-100 rounded border-2 h-6 w-6 leading-5 text-center bottom-7 left-9">
                        {mapItem.quantity}
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
  if (item?.itemType === 'capture ball') {
    return (
      <div className="flex flex-row flex-wrap border-2 items-center w-full">
        {items?.map((mapItem) => {
          if (mapItem.itemType === 'capture ball') {
            return (
              <div className="h-16 w-16" key={mapItem.itemId}>
                <Link to={'/items/' + mapItem.itemId}>
                  <div>
                    <img
                      alt={mapItem.name}
                      src={'/' + mapItem.photoUrl}
                      className={
                        mapItem.itemId === item.itemId
                          ? 'max-h-16 border-4'
                          : 'max-h-16'
                      }
                    />
                  </div>
                  <div>
                    {toggleItemQuantity(mapItem) && mapItem.quantity > 1 ? (
                      <div className="relative bg-slate-100 rounded border-2 h-6 w-6 leading-5 text-center bottom-7 left-9">
                        {mapItem.quantity}
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
  if (item?.itemType === 'power up') {
    return (
      <div className="flex flex-row flex-wrap border-2 items-center w-full">
        {items?.map((mapItem) => {
          if (mapItem.itemType === 'power up') {
            return (
              <div className="h-16 w-16" key={mapItem.itemId}>
                <Link to={'/items/' + mapItem.itemId}>
                  <div>
                    <img
                      alt={mapItem.name}
                      src={'/' + mapItem.photoUrl}
                      className={
                        mapItem.itemId === item.itemId
                          ? 'max-h-16 border-4'
                          : 'max-h-16'
                      }
                    />
                  </div>
                  <div>
                    {toggleItemQuantity(mapItem) && mapItem.quantity > 1 ? (
                      <div className="relative bg-slate-100 rounded border-2 h-6 w-6 leading-5 text-center bottom-7 left-9">
                        {mapItem.quantity}
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

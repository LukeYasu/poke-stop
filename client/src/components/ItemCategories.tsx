import { useRef, useState } from 'react';
import { Item } from './Catalog';
import { ItemCard } from './ItemCard';

type Props = {
  items: Item[];
};

export function ItemCategories({ items }: Props) {
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);
  const inputRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLSelectElement>(null);

  function handleSearch() {
    const searchTerm = inputRef.current?.value || '';
    const filterValue = filterRef.current?.value || '';

    let filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filterValue === 'New') {
      filtered = filtered.filter((item) => item.cardTag === 'new');
    } else if (filterValue === 'Best Sellers') {
      filtered = filtered.filter((item) => item.cardTag === 'best seller');
    } else if (filterValue === 'Bundles') {
      filtered = filtered.filter((item) => item.cardTag === 'bundle');
    } else if (filterValue === 'Price Low to High') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filterValue === 'Price High to Low') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (filterValue === 'Sale') {
      filtered = filtered.filter((item) => item.salePrice !== null);
    }
    setFilteredItems(filtered);
  }

  return (
    <div className="flex w-full justify-center">
      <div className="page-container">
        <form>
          <input
            type="text"
            placeholder="Search"
            ref={inputRef}
            className="w-60 h-10 border-2 mt-8 mb-8 rounded p-2"
            onChange={handleSearch}></input>
          <label htmlFor="filter" className="m-2 text-lg ml-4">
            Filter
          </label>
          <select
            name="filter"
            className="border-2 border-black rounded w-40 h-10"
            ref={filterRef}
            onChange={handleSearch}>
            <option>All</option>
            <option>Sale</option>
            <option>New</option>
            <option>Best Sellers</option>
            <option>Bundles</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
          </select>
        </form>
        <h1 className="text-3xl mb-4 border-b-2 border-black">All Items</h1>
        <div className="flex flex-wrap justify-center">
          {filteredItems.length !== 0 ? (
            filteredItems.map((item) => (
              <ItemCard key={item.itemId} item={item} />
            ))
          ) : (
            <div>No Matching Items</div>
          )}
        </div>
      </div>
    </div>
  );
}

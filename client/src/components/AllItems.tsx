import { useEffect, useRef, useState } from 'react';
import { Item } from './Catalog';
import { CatalogCards } from './CatalogCards';
import {
  bestSellers,
  captureBalls,
  consumablesId,
  evoStones,
  getItems,
  newItems,
  saleItems,
} from '../lib/data';

export function AllItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const inputRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const result = await getItems();
        setItems(result);
        setFilteredItems(result);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  if (error) {
    console.error('Fetch error:', error);
    return (
      <p>Error! {error instanceof Error ? error.message : 'Unknown Error'}</p>
    );
  }
  if (isLoading) return <div>Loading ...</div>;

  function handleSearch() {
    const searchTerm = inputRef.current?.value || '';
    const filterValue = filterRef.current?.value || '';

    let filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filterValue === 'Consumables') {
      filtered = filtered.filter((item) => consumablesId.includes(item.itemId));
    } else if (filterValue === 'Capture Balls') {
      filtered = filtered.filter((item) => captureBalls.includes(item.itemId));
    } else if (filterValue === 'Evo Stones') {
      filtered = filtered.filter((item) => evoStones.includes(item.itemId));
    } else if (filterValue === 'New') {
      filtered = filtered.filter((item) => newItems.includes(item.itemId));
    } else if (filterValue === 'Best Sellers') {
      filtered = filtered.filter((item) => bestSellers.includes(item.itemId));
    } else if (filterValue === 'Sale') {
      const saleItemsId = saleItems.map((i) => {
        return i.itemId;
      });
      filtered = filtered.filter((item) => saleItemsId.includes(item.itemId));
    }
    setFilteredItems(filtered);
  }

  return (
    <>
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
              <option>Consumables</option>
              <option>Capture Balls</option>
              <option>Evo Stones</option>
              <option>Sale</option>
              <option>New</option>
              <option>Best Sellers</option>
            </select>
          </form>
          <h1 className="text-3xl mb-4 border-b-2 border-black">All Items</h1>
          <div className="flex flex-wrap justify-center">
            {filteredItems.map((item) => (
              <CatalogCards key={item.itemId} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

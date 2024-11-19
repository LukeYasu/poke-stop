import { useEffect, useRef, useState } from 'react';
import { Item } from './Catalog';
import { CatalogCards } from './CatalogCards';
import { captureBalls, consumablesId, evoStones, getItems } from '../lib/data';

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
    }
    setFilteredItems(filtered);
  }

  console.log(filterRef.current?.value);

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="page-container">
          <form>
            <input
              type="text"
              placeholder="Search"
              ref={inputRef}
              className="w-60 h-10 border-2 mt-2"
              onChange={handleSearch}></input>
            <label htmlFor="filter" className="m-2">
              Filter
            </label>
            <select
              name="filter"
              className="m-2  border-2 border-black"
              ref={filterRef}
              onChange={handleSearch}>
              <option>All</option>
              <option>Consumables</option>
              <option>Capture Balls</option>
              <option>Evo Stones</option>
            </select>
          </form>
          <h1 className="text-3xl mb-4 border-b-2 border-black">All Items</h1>
          <div className="flex flex-wrap justify-center">
            {filteredItems.map((item) => (
              <CatalogCards key={item.itemId} item={item} />
            ))}
            {filteredItems.map((item) => (
              <CatalogCards key={item.itemId} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

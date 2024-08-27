import Select from "react-select";
import EmptyView from "./EmptyView";
import { useMemo, useState } from "react";
import { useItemsStore } from "../stores/itemsStore";

const sortingOptions = [
  { value: "default", label: "Sort by default" },
  { value: "packed", label: "Sort by packed" },
  {
    value: "unpacked",
    label: "Sort by unpacked",
  },
];

export default function ItemList() {
  const [sortBy, setSortBy] = useState("default");
  // const { items, handleRemoveItem, handleToggleItem } = useItemsContext();
  const items = useItemsStore((state) => state.items);
  const deleteItem = useItemsStore((state) => state.deleteItem);
  const toggleItem = useItemsStore((state) => state.toggleItem);

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === "packed") {
          return b.packed - a.packed;
        } else if (sortBy === "unpacked") {
          return a.packed - b.packed;
        }

        return;
      }),
    [items, sortBy]
  );

  return (
    <ul className="item-list">
      {items.length > 0 ? (
        <section className="sorting">
          <Select
            onChange={(option) => setSortBy(option.value)}
            defaultValue={sortingOptions[0]}
            options={sortingOptions}
          />
        </section>
      ) : (
        <EmptyView />
      )}
      {sortedItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          onRemoveItem={deleteItem}
          onToggleItem={toggleItem}
        />
      ))}
    </ul>
  );
}

const Item = ({ item, onRemoveItem, onToggleItem }) => {
  return (
    <li className="item">
      <label>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => onToggleItem(item.id)}
        />
        {item.name}
      </label>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
};

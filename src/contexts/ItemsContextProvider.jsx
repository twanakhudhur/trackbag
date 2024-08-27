import { createContext, useEffect, useState } from "react";
import { initialItems } from "../libs/constants";

export const ItemsContext = createContext();

export default function ItemsContextProvider({ children }) {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem("items")) || initialItems
  );

  const handleAddItem = (newItemText) => {
    const newItem = {
      id: new Date().getTime().toString(),
      name: newItemText,
      packed: false,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
  };
  const handleRemoveItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };
  const handleToggleItem = (id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, packed: !item.packed } : item
    );
    setItems(newItems);
  };
  const handleRemoveAllItems = () => {
    setItems([]);
  };
  const handleResettoInitial = () => {
    setItems(initialItems);
  };
  const handleMarkAllAsCompleted = () => {
    const newItems = items.map((item) => ({
      ...item,
      packed: true,
    }));
    setItems(newItems);
  };
  const handleMarkAllAsUncompleted = () => {
    const newItems = items.map((item) => ({
      ...item,
      packed: false,
    }));
    setItems(newItems);
  };
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  return (
    <ItemsContext.Provider
      value={{
        items,
        handleAddItem,
        handleRemoveItem,
        handleToggleItem,
        handleRemoveAllItems,
        handleResettoInitial,
        handleMarkAllAsCompleted,
        handleMarkAllAsUncompleted,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

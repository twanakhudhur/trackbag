import { create } from "zustand";
import { initialItems } from "../libs/constants";
import { persist } from "zustand/middleware";

export const useItemsStore=create(persist((set) => ({
  items: initialItems,
  addItem: (newItemText) => {
    const newItem = {
      id: new Date().getTime().toString(),
      name: newItemText,
      packed: false,
    };
    set((state) => ({
      items: [...state.items, newItem],
    }));
  },
  deleteItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  toggleItem: (id) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      ),
    }));
  },
  removeAllItems: () => {
    set(() => ({ items: [] }));
  },
  resetToInitial: () => {
    set(() => ({ items: initialItems }));
  },
  markAllAsCompleted: () => {
    set((state) => {
      const newItems = state.items.map((item) => ({
        ...item,
        packed: true,
      }));
      return { items: newItems };
    });
  },
  markAllAsUnompleted: () => {
    set((state) => {
      const newItems = state.items.map((item) => ({
        ...item,
        packed: false,
      }));
      return { items: newItems };
    });
  },
}),{
    name:"items"
}));

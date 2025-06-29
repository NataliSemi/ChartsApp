"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface BasketItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

interface BasketContextType {
  items: BasketItem[];
  addItem: (item: Omit<BasketItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBasket: () => void;
  totalPrice: number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("basket");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);

  function addItem(item: Omit<BasketItem, "quantity">) {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        // Increment quantity if item already in basket
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i._id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, quantity } : i))
    );
  }

  function clearBasket() {
    setItems([]);
  }

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <BasketContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearBasket, totalPrice }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
}

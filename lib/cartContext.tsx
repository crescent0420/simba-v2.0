'use client';

import { createContext, useContext, useReducer, useEffect, useState, ReactNode } from 'react';
import { Product } from '@/lib/types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartState };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }
      const newTotal = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return { items: newItems, total: newTotal };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      const newTotal = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return { items: newItems, total: newTotal };
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter(
          (item) => item.product.id !== action.payload.productId
        );
        const newTotal = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        return { items: newItems, total: newTotal };
      }
      const newItems = state.items.map((item) =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newTotal = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return { items: newItems, total: newTotal };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
}

const STORAGE_KEY = 'simba-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'HYDRATE', payload: parsed });
      } catch {
        // ignore
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, hydrated]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
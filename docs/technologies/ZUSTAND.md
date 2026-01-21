# Zustand

## Overview

**Version:** 4.4.7  
**Website:** [https://zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs)  
**Category:** Client State Management

Zustand is a small, fast, and scalable state management solution for React. It provides a simple API with no boilerplate, providers, or complex setup.

---

## Why Zustand?

### Benefits

| Benefit              | Description                                      |
| -------------------- | ------------------------------------------------ |
| **Minimal API**      | Simple `create` function, no providers needed    |
| **No Boilerplate**   | No reducers, actions, or dispatch                |
| **TypeScript Ready** | Full TypeScript support out of the box           |
| **Tiny Bundle**      | ~1KB gzipped, minimal impact on bundle size      |
| **Middleware**       | Built-in persist, devtools, immer support        |
| **Selective Subs**   | Components only re-render on subscribed changes  |

### Why We Chose Zustand

1. **Simplicity** - Minimal learning curve compared to Redux
2. **Performance** - Selective subscriptions prevent unnecessary re-renders
3. **Persistence** - Built-in localStorage persistence middleware
4. **No Providers** - Works without context providers
5. **Server Components** - Compatible with Next.js App Router

---

## How to Use Zustand

### Basic Store

```typescript
// store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity > 0
              ? state.items.map((i) => (i.id === id ? { ...i, quantity } : i))
              : state.items.filter((i) => i.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);
```

### Using in Components

```tsx
'use client';

import { useCartStore } from '@/store/cartStore';

// Selective subscription (recommended)
function CartBadge() {
  const itemCount = useCartStore((state) => state.getTotalItems());
  return <span className="badge">{itemCount}</span>;
}

// Multiple values
function CartSummary() {
  const { items, getTotalPrice, removeItem } = useCartStore();

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <span>${item.price}</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <div>Total: ${getTotalPrice().toFixed(2)}</div>
    </div>
  );
}

// Adding items
function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}
```

### Category Store Example

```typescript
// store/categoryStore.ts
import { create } from 'zustand';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryStore {
  categories: Category[];
  selectedCategory: string | null;
  setCategories: (categories: Category[]) => void;
  selectCategory: (id: string | null) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  selectedCategory: null,
  setCategories: (categories) => set({ categories }),
  selectCategory: (id) => set({ selectedCategory: id }),
}));
```

### Accessing State Outside React

```typescript
// Access state anywhere (API calls, utilities, etc.)
import { useCartStore } from '@/store/cartStore';

// Get current state
const items = useCartStore.getState().items;
const total = useCartStore.getState().getTotalPrice();

// Update state
useCartStore.getState().addItem(newItem);
useCartStore.getState().clearCart();

// Subscribe to changes
const unsubscribe = useCartStore.subscribe((state) => {
  console.log('Cart updated:', state.items);
});
```

---

## Middleware

### Persist Middleware

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // state and actions
    }),
    {
      name: 'storage-key',
      storage: createJSONStorage(() => sessionStorage), // or localStorage
      partialize: (state) => ({ items: state.items }), // only persist items
    }
  )
);
```

### DevTools Middleware

```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set) => ({
      // state and actions
    }),
    { name: 'CartStore' }
  )
);
```

---

## Best Practices

### 1. Selective Subscriptions

```tsx
// ✅ Good - Only re-renders when itemCount changes
const itemCount = useCartStore((state) => state.items.length);

// ❌ Bad - Re-renders on any state change
const { items, addItem, removeItem } = useCartStore();
```

### 2. Computed Values

```typescript
// Define computed values as functions in the store
const useStore = create((set, get) => ({
  items: [],
  getTotalPrice: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
```

### 3. Immer for Complex Updates

```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useStore = create(
  immer((set) => ({
    items: [],
    updateItem: (id, updates) =>
      set((state) => {
        const item = state.items.find((i) => i.id === id);
        if (item) Object.assign(item, updates);
      }),
  }))
);
```

---

## Related Documentation

- [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md) - State management overview
- [REACT_QUERY.md](REACT_QUERY.md) - Server state management
- [APOLLO_CLIENT.md](APOLLO_CLIENT.md) - GraphQL state

# Recoil

## Overview

**Version:** 0.7.7  
**Website:** [https://recoiljs.org](https://recoiljs.org)  
**Category:** State Management Library

Recoil is a state management library for React that provides a way to share state across components with minimal boilerplate using atoms and selectors.

---

## Why Recoil?

### Benefits

| Benefit                 | Description                               |
| ----------------------- | ----------------------------------------- |
| **React-like API**      | Feels like using useState but global      |
| **Derived State**       | Selectors for computed values             |
| **Async Support**       | Built-in async selector support           |
| **Concurrent Mode**     | Compatible with React Concurrent features |
| **DevTools**            | Debugging with Recoil DevTools            |
| **Minimal Boilerplate** | Simple atoms and selectors                |

### Why We Use Recoil

1. **Simple API** - Atoms feel like local state
2. **Derived Data** - Selectors for computed values
3. **Granular Updates** - Components only re-render on subscribed atoms
4. **Async Data** - Easy async data handling with selectors
5. **React Integration** - First-class React support from Meta

---

## How to Use Recoil

### Provider Setup

```tsx
// app/providers.tsx
'use client';

import { RecoilRoot } from 'recoil';

export function Providers({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
```

### Atoms

```typescript
// store/recoilState.ts
import { atom, selector } from 'recoil';

// Simple atom
export const searchQueryState = atom<string>({
  key: 'searchQuery',
  default: '',
});

// Object atom
export const userState = atom<User | null>({
  key: 'user',
  default: null,
});

// Array atom
export const wishlistState = atom<string[]>({
  key: 'wishlist',
  default: [],
});

// Atom with localStorage persistence
export const themeState = atom<'light' | 'dark'>({
  key: 'theme',
  default: 'light',
  effects: [
    ({ setSelf, onSet }) => {
      // Load from localStorage on init
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('theme');
        if (stored) setSelf(stored as 'light' | 'dark');
      }

      // Save to localStorage on change
      onSet((newValue) => {
        localStorage.setItem('theme', newValue);
      });
    },
  ],
});
```

### Using Atoms in Components

```tsx
'use client';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { searchQueryState, wishlistState } from '@/store/recoilState';

// Read and write
function SearchBar() {
  const [query, setQuery] = useRecoilState(searchQueryState);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search products..."
    />
  );
}

// Read only
function SearchResults() {
  const query = useRecoilValue(searchQueryState);
  return <p>Searching for: {query}</p>;
}

// Write only (no subscription to changes)
function ClearSearchButton() {
  const setQuery = useSetRecoilState(searchQueryState);
  return <button onClick={() => setQuery('')}>Clear</button>;
}
```

### Selectors (Derived State)

```typescript
// store/recoilState.ts
import { selector } from 'recoil';

// Derived from another atom
export const wishlistCountState = selector<number>({
  key: 'wishlistCount',
  get: ({ get }) => {
    const wishlist = get(wishlistState);
    return wishlist.length;
  },
});

// Derived from multiple atoms
export const isProductInWishlistState = selectorFamily<boolean, string>({
  key: 'isProductInWishlist',
  get:
    (productId) =>
    ({ get }) => {
      const wishlist = get(wishlistState);
      return wishlist.includes(productId);
    },
});
```

### Async Selectors

```typescript
import { selector } from 'recoil';

export const featuredProductsState = selector({
  key: 'featuredProducts',
  get: async () => {
    const response = await fetch('/api/products?featured=true');
    const data = await response.json();
    return data.products;
  },
});

// Usage with Suspense
function FeaturedProducts() {
  const products = useRecoilValue(featuredProductsState);
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Wrap with Suspense
<Suspense fallback={<Loading />}>
  <FeaturedProducts />
</Suspense>
```

### Selector Family (Parameterized Selectors)

```typescript
import { selectorFamily } from 'recoil';

export const productByIdState = selectorFamily({
  key: 'productById',
  get: (productId: string) => async () => {
    const response = await fetch(`/api/products/${productId}`);
    return response.json();
  },
});

// Usage
function ProductDetail({ productId }: { productId: string }) {
  const product = useRecoilValue(productByIdState(productId));
  return <div>{product.name}</div>;
}
```

---

## Patterns

### Atom Effects (Side Effects)

```typescript
const cartState = atom({
  key: 'cart',
  default: [],
  effects: [
    // Sync with localStorage
    ({ setSelf, onSet }) => {
      const saved = localStorage.getItem('cart');
      if (saved) setSelf(JSON.parse(saved));

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem('cart')
          : localStorage.setItem('cart', JSON.stringify(newValue));
      });
    },
    // Analytics
    ({ onSet }) => {
      onSet((newValue) => {
        analytics.track('cart_updated', { items: newValue.length });
      });
    },
  ],
});
```

### Reset State

```tsx
import { useResetRecoilState } from 'recoil';

function LogoutButton() {
  const resetUser = useResetRecoilState(userState);
  const resetWishlist = useResetRecoilState(wishlistState);

  const handleLogout = () => {
    resetUser();
    resetWishlist();
    router.push('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

---

## Related Documentation

- [ZUSTAND.md](ZUSTAND.md) - Alternative state management
- [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md) - State management overview
- [REACT.md](REACT.md) - React hooks and patterns

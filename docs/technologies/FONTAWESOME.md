# FontAwesome

## Overview

**Version:** 7.1.0  
**Website:** [https://fontawesome.com](https://fontawesome.com)  
**Category:** Icon Library

FontAwesome is a comprehensive icon library providing thousands of scalable vector icons for web applications.

---

## Why FontAwesome?

### Benefits

| Benefit           | Description                           |
| ----------------- | ------------------------------------- |
| **Huge Library**  | 2000+ free icons, 26000+ with Pro     |
| **Scalable**      | SVG icons scale perfectly at any size |
| **Customizable**  | Easy to style with CSS                |
| **Accessibility** | Built-in screen reader support        |
| **React Support** | Official React component library      |
| **Tree Shaking**  | Only bundle icons you use             |

---

## Installation

### Packages Used

```json
{
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^7.1.0",
    "@fortawesome/free-solid-svg-icons": "^7.1.0",
    "@fortawesome/react-fontawesome": "^3.1.1"
  }
}
```

---

## Configuration

### Library Setup

```typescript
// lib/fontawesome.ts
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShoppingCart,
  faHeart,
  faSearch,
  faUser,
  faBars,
  faTimes,
  faPlus,
  faMinus,
  faTrash,
  faStar,
  faChevronLeft,
  faChevronRight,
  faCheck,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

// Add icons to library for global use
library.add(
  faShoppingCart,
  faHeart,
  faSearch,
  faUser,
  faBars,
  faTimes,
  faPlus,
  faMinus,
  faTrash,
  faStar,
  faChevronLeft,
  faChevronRight,
  faCheck,
  faSpinner
);
```

### Initialize in App

```tsx
// app/layout.tsx
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Prevent FA from adding CSS (we import it manually)
```

---

## Usage

### Basic Usage

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';

// Direct import
function CartButton() {
  return (
    <button>
      <FontAwesomeIcon icon={faShoppingCart} />
      <span>Cart</span>
    </button>
  );
}

// With library setup (string reference)
function WishlistButton() {
  return (
    <button>
      <FontAwesomeIcon icon="heart" />
    </button>
  );
}
```

### Sizing

```tsx
// Fixed sizes
<FontAwesomeIcon icon={faShoppingCart} size="xs" />   {/* 0.75em */}
<FontAwesomeIcon icon={faShoppingCart} size="sm" />   {/* 0.875em */}
<FontAwesomeIcon icon={faShoppingCart} size="lg" />   {/* 1.33em */}
<FontAwesomeIcon icon={faShoppingCart} size="xl" />   {/* 1.5em */}
<FontAwesomeIcon icon={faShoppingCart} size="2xl" />  {/* 2em */}

// Relative sizes
<FontAwesomeIcon icon={faShoppingCart} size="1x" />   {/* 1em */}
<FontAwesomeIcon icon={faShoppingCart} size="2x" />   {/* 2em */}
<FontAwesomeIcon icon={faShoppingCart} size="3x" />   {/* 3em */}

// Custom with className
<FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6" />
```

### Styling

```tsx
// Color
<FontAwesomeIcon icon={faHeart} className="text-red-500" />
<FontAwesomeIcon icon={faCheck} className="text-green-500" />
<FontAwesomeIcon icon={faSpinner} className="text-blue-500" />

// With Tailwind
<FontAwesomeIcon
  icon={faShoppingCart}
  className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors"
/>
```

### Animations

```tsx
// Spin (for loaders)
<FontAwesomeIcon icon={faSpinner} spin />
<FontAwesomeIcon icon={faSpinner} spinPulse />

// Pulse
<FontAwesomeIcon icon={faHeart} beatFade />

// Bounce
<FontAwesomeIcon icon={faBell} bounce />

// Shake
<FontAwesomeIcon icon={faExclamation} shake />
```

### Transforms

```tsx
// Rotation
<FontAwesomeIcon icon={faChevronRight} rotation={90} />
<FontAwesomeIcon icon={faChevronRight} rotation={180} />

// Flip
<FontAwesomeIcon icon={faUser} flip="horizontal" />
<FontAwesomeIcon icon={faUser} flip="vertical" />
<FontAwesomeIcon icon={faUser} flip="both" />
```

---

## Common Icon Patterns

### Navigation Icons

```tsx
function Header() {
  return (
    <nav className="flex items-center gap-4">
      <button>
        <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
      </button>
      <button>
        <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
      </button>
      <button className="relative">
        <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          3
        </span>
      </button>
      <button>
        <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
      </button>
    </nav>
  );
}
```

### Button with Icon

```tsx
function AddToCartButton({ loading }: { loading: boolean }) {
  return (
    <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white">
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <FontAwesomeIcon icon={faShoppingCart} />
      )}
      <span>{loading ? 'Adding...' : 'Add to Cart'}</span>
    </button>
  );
}
```

### Rating Stars

```tsx
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}
```

### Quantity Controls

```tsx
function QuantityControl({ quantity, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onChange(quantity - 1)}>
        <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button onClick={() => onChange(quantity + 1)}>
        <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
      </button>
    </div>
  );
}
```

---

## Icon Categories

### Common Icons Used

| Icon             | Usage                    |
| ---------------- | ------------------------ |
| `faShoppingCart` | Cart button, add to cart |
| `faHeart`        | Wishlist, favorites      |
| `faSearch`       | Search bar               |
| `faUser`         | Profile, account         |
| `faBars`         | Mobile menu              |
| `faTimes`        | Close buttons            |
| `faPlus/faMinus` | Quantity controls        |
| `faTrash`        | Delete, remove           |
| `faStar`         | Ratings                  |
| `faCheck`        | Success, complete        |
| `faSpinner`      | Loading states           |

---

## Related Documentation

- [TAILWIND_CSS.md](TAILWIND_CSS.md) - Styling icons with Tailwind
- [REACT.md](REACT.md) - React component patterns

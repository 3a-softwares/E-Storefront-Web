# Tailwind CSS

## Overview

**Version:** 3.4.0  
**Website:** [https://tailwindcss.com](https://tailwindcss.com)  
**Category:** CSS Framework

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS.

---

## Why Tailwind CSS?

### Benefits

| Benefit           | Description                              |
| ----------------- | ---------------------------------------- |
| **Utility-First** | Compose designs with utility classes     |
| **No Custom CSS** | Build complex UIs without leaving HTML   |
| **Responsive**    | Mobile-first responsive design utilities |
| **Dark Mode**     | Built-in dark mode support               |
| **JIT Compiler**  | Just-in-time compilation for fast builds |
| **Customizable**  | Fully customizable through configuration |
| **Small Bundle**  | Purges unused CSS in production          |

### Why We Chose Tailwind

1. **Rapid Development** - Build UIs faster with utility classes
2. **Consistency** - Design tokens ensure consistent spacing, colors
3. **Responsive** - Easy responsive design with breakpoint prefixes
4. **Dark Mode** - Simple dark mode implementation
5. **DaisyUI Integration** - Works seamlessly with DaisyUI components

---

## Configuration

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6366f1',
        accent: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark'],
    darkTheme: 'dark',
  },
};

export default config;
```

### postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## Usage Patterns

### Layout

```tsx
// Container and Grid
<div className="container mx-auto px-4 py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>

// Flexbox
<div className="flex items-center justify-between gap-4">
  <Logo />
  <Navigation />
  <CartButton />
</div>

// Stack
<div className="flex flex-col gap-4">
  <Header />
  <Main />
  <Footer />
</div>
```

### Responsive Design

```tsx
// Mobile-first breakpoints
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive text size
</div>

// Show/hide based on screen size
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>

// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {/* items */}
</div>

// Responsive padding
<div className="p-4 md:p-6 lg:p-8">
  Content with responsive padding
</div>
```

### Dark Mode

```tsx
// Dark mode classes
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Adapts to theme
</div>

// Dark mode with hover
<button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600">
  Button
</button>
```

### States

```tsx
// Hover, focus, active
<button className="bg-blue-500 hover:bg-blue-600 focus:ring-2 active:bg-blue-700">
  Interactive Button
</button>

// Group hover
<div className="group">
  <img className="group-hover:opacity-75 transition" />
  <button className="hidden group-hover:block">Quick View</button>
</div>

// Focus within
<div className="focus-within:ring-2">
  <input className="outline-none" />
</div>
```

### Spacing & Sizing

```tsx
// Padding and margin
<div className="p-4 m-2">          {/* padding: 1rem, margin: 0.5rem */}
<div className="px-4 py-2">        {/* horizontal: 1rem, vertical: 0.5rem */}
<div className="pt-8 pb-4 pl-2">   {/* top: 2rem, bottom: 1rem, left: 0.5rem */}

// Width and height
<div className="w-full h-screen">  {/* width: 100%, height: 100vh */}
<div className="w-1/2 h-64">       {/* width: 50%, height: 16rem */}
<div className="max-w-xl min-h-[400px]"> {/* max-width: 36rem, min-height: 400px */}
```

### Typography

```tsx
// Font sizes
<h1 className="text-4xl font-bold">Heading</h1>
<p className="text-base text-gray-600">Body text</p>
<span className="text-sm text-gray-400">Small text</span>

// Font weight
<span className="font-light">Light</span>
<span className="font-normal">Normal</span>
<span className="font-medium">Medium</span>
<span className="font-semibold">Semibold</span>
<span className="font-bold">Bold</span>

// Text alignment
<p className="text-left md:text-center lg:text-right">Responsive alignment</p>

// Line clamp (truncate)
<p className="line-clamp-2">Long text that will be truncated after 2 lines...</p>
```

### Colors

```tsx
// Background colors
<div className="bg-white dark:bg-gray-900">
<div className="bg-blue-500 bg-opacity-50">
<div className="bg-gradient-to-r from-blue-500 to-purple-500">

// Text colors
<span className="text-gray-900 dark:text-white">
<span className="text-blue-600 hover:text-blue-800">

// Border colors
<div className="border border-gray-200 dark:border-gray-700">
```

### Shadows & Effects

```tsx
// Box shadows
<div className="shadow-sm">Small shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-xl">Extra large shadow</div>

// Transitions
<div className="transition duration-300 ease-in-out">
<button className="transition-colors duration-200">
<img className="transition-transform hover:scale-105">

// Opacity
<div className="opacity-50 hover:opacity-100 transition-opacity">
```

---

## Component Examples

### Product Card

```tsx
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl dark:bg-gray-800">
      <div className="relative aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {product.stock === 0 && (
          <span className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white">
            Sold Out
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="truncate font-semibold text-gray-900 dark:text-white">{product.name}</h3>
        <p className="mt-2 font-bold text-blue-600">${product.price.toFixed(2)}</p>
        <button className="mt-4 w-full rounded-lg bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600 disabled:opacity-50">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

---

## Related Documentation

- [DAISYUI.md](DAISYUI.md) - DaisyUI component library
- [CSS.md](CSS.md) - CSS patterns
- [STYLING.md](STYLING.md) - Styling overview

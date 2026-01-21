# PostCSS

## Overview

**Version:** 8.4.32  
**Website:** [https://postcss.org](https://postcss.org)  
**Category:** CSS Processing Tool

PostCSS is a tool for transforming CSS with JavaScript plugins. It's used in E-Storefront Web to process Tailwind CSS and add vendor prefixes.

---

## Why PostCSS?

### Benefits

| Benefit           | Description                         |
| ----------------- | ----------------------------------- |
| **Plugin System** | Extensible with hundreds of plugins |
| **Tailwind**      | Required for Tailwind CSS to work   |
| **Autoprefixer**  | Automatically adds vendor prefixes  |
| **Modern CSS**    | Use future CSS features today       |
| **Fast**          | Efficient CSS processing            |
| **Integration**   | Works with all build tools          |

---

## Configuration

### postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### With Additional Plugins

```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {}),
  },
};
```

---

## Plugins Used

### Tailwind CSS

Processes Tailwind utility classes and generates CSS:

```css
/* Input */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Output: All Tailwind CSS classes */
```

### Autoprefixer

Adds vendor prefixes for browser compatibility:

```css
/* Input */
.example {
  display: flex;
  user-select: none;
}

/* Output */
.example {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

---

## CSS Imports

### postcss-import

Allows `@import` statements in CSS:

```css
/* globals.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import './custom/buttons.css';
@import './custom/forms.css';
```

---

## Tailwind Nesting

### tailwindcss/nesting

Enables CSS nesting with Tailwind:

```css
.card {
  @apply rounded-lg bg-white;

  &:hover {
    @apply shadow-lg;
  }

  .card-body {
    @apply p-4;
  }
}
```

---

## Production Optimization

### cssnano

Minifies CSS in production:

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }
      : {}),
  },
};
```

---

## Integration with Next.js

Next.js automatically detects and uses PostCSS configuration:

```
E-Storefront-Web/
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.ts   # Tailwind configuration
└── app/
    └── globals.css      # Global styles with Tailwind
```

### globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
@layer base {
  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white;
  }
}

/* Custom component classes */
@layer components {
  .btn-primary {
    @apply rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600;
  }
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

---

## Related Documentation

- [TAILWIND_CSS.md](TAILWIND_CSS.md) - Tailwind CSS framework
- [CSS.md](CSS.md) - CSS patterns
- [STYLING.md](STYLING.md) - Styling overview

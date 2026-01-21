# Performance Optimization

Performance best practices and optimizations for E-Storefront Web.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Core Web Vitals](#core-web-vitals)
- [React Optimizations](#react-optimizations)
- [Next.js Optimizations](#nextjs-optimizations)
- [Debouncing & Throttling](#debouncing--throttling)
- [Bundle Optimization](#bundle-optimization)
- [Image Optimization](#image-optimization)
- [Caching Strategies](#caching-strategies)
- [Implementation Checklist](#implementation-checklist)
- [Monitoring](#monitoring)
- [Related Documentation](#related-documentation)

---

## 🌐 Overview

E-Storefront Web is optimized for performance following Core Web Vitals standards. This guide covers all optimization techniques implemented in the application.

### Performance Goals

| Metric | Target  | Description              |
| ------ | ------- | ------------------------ |
| LCP    | < 2.5s  | Largest Contentful Paint |
| FID    | < 100ms | First Input Delay        |
| CLS    | < 0.1   | Cumulative Layout Shift  |
| TTFB   | < 600ms | Time to First Byte       |

---

## 📊 Core Web Vitals

### Measuring Performance

```bash
# Run Lighthouse audit
npx lighthouse http://localhost:3004 --view

# Build and analyze bundle
ANALYZE=true yarn build
```

### Web Vitals Tracking

```tsx
// app/layout.tsx
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
    // Send to analytics
    analytics.track('web-vital', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
    });
  });
}
```

---

## ⚛️ React Optimizations

### React.memo

Prevent re-renders for components with unchanged props:

```tsx
// components/ProductCard.tsx
const ProductCardComponent: React.FC<ProductCardProps> = ({ product }) => {
  // Component logic
};

export const ProductCard = React.memo(ProductCardComponent);

// ✅ Applied to: ProductCard, ProductSlider, LazyImage, CartItem
```

### useMemo

Memoize expensive computations:

```tsx
// Expensive calculations
const isOutOfStock = useMemo(() => product.stock === 0, [product.stock]);

const isInCart = useMemo(() => items.some((item) => item.id === product.id), [items, product.id]);

// Complex transformations
const sortedProducts = useMemo(() => products.sort((a, b) => a.price - b.price), [products]);

// ✅ Applied to: ProductCard, ProductSlider, Header, Products Page
```

### useCallback

Memoize event handlers to prevent child re-renders:

```tsx
const handleAddToCart = useCallback(() => {
  addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
  });
}, [product, addItem]);

const handleSearch = useCallback(
  (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/products?search=${encodeURIComponent(query)}`);
  },
  [query, router]
);

// ✅ Applied to: ProductCard, Header, Home Page, Products Page, ProductSlider
```

---

## 🚀 Next.js Optimizations

### Dynamic Imports (Code Splitting)

```tsx
import dynamic from 'next/dynamic';

// Heavy components loaded on demand
const ProductSlider = dynamic(() => import('@/components/ProductSlider'), {
  loading: () => <SliderSkeleton />,
  ssr: true,
});

// Client-only components
const ChartComponent = dynamic(() => import('@/components/Chart'), {
  ssr: false,
});

// ✅ Applied to: ProductSlider in Home Page
```

### Image Optimization with Next.js Image

```tsx
import Image from 'next/image';

<Image
  src={product.imageUrl}
  alt={product.name}
  width={400}
  height={400}
  loading="lazy"
  placeholder="blur"
  blurDataURL={BLUR_PLACEHOLDER}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={isAboveTheFold} // For above-the-fold images
/>;
```

### Route Prefetching

```tsx
import Link from 'next/link';

// Automatic prefetch on hover
<Link href="/products" prefetch={true}>
  Products
</Link>;

// Manual prefetch
router.prefetch('/checkout');
```

---

## 🎯 Debouncing & Throttling

### useDebounce Hook

Delays execution until user stops typing:

```tsx
// lib/hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage - Products Page search
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

// debouncedSearch only updates 500ms after user stops typing
```

### useThrottle Hook

Limits function execution rate:

```tsx
// lib/hooks/useThrottle.ts
export function useThrottle<T extends (...args: unknown[]) => unknown>(callback: T, limit: number) {
  const inThrottle = useRef(false);

  return useCallback(
    (...args: Parameters<T>) => {
      if (!inThrottle.current) {
        callback(...args);
        inThrottle.current = true;
        setTimeout(() => {
          inThrottle.current = false;
        }, limit);
      }
    },
    [callback, limit]
  );
}
```

### useScrollToBottom Hook

Infinite scroll with throttling:

```tsx
// lib/hooks/useScrollToBottom.ts
import { useScrollToBottom } from '@/lib/hooks';

useScrollToBottom(
  () => {
    loadMoreProducts();
  },
  300, // threshold: 300px from bottom
  300 // throttle: 300ms
);
```

---

## 📦 Bundle Optimization

### Bundle Analysis

```bash
# Analyze bundle size
ANALYZE=true yarn build
```

### Tree Shaking

```tsx
// ✅ Good - Named imports enable tree shaking
import { formatPrice, formatDate } from '@3asoftwares/utils';

// ❌ Bad - Imports entire package
import * as utils from '@3asoftwares/utils';
```

### Lazy Loading Libraries

```tsx
// Load heavy libraries on demand
const loadChartJS = () => import('chart.js');

useEffect(() => {
  if (showChart) {
    loadChartJS().then((ChartJS) => {
      // Initialize chart
    });
  }
}, [showChart]);
```

---

## 🖼️ Image Optimization

### LazyImage Component

Custom lazy loading with Intersection Observer:

```tsx
// components/LazyImage.tsx
export const LazyImage = React.memo(({ src, alt, fallback, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  if (hasError && fallback) return fallback;

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : undefined}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      {...props}
    />
  );
});
```

### Usage

```tsx
import { LazyImage } from '@/components';

<LazyImage
  src="/product.jpg"
  alt="Product"
  className="h-full w-full object-cover"
  fallback={<PlaceholderIcon />}
/>;
```

---

## 💾 Caching Strategies

### React Query Caching

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 30 seconds
      gcTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

### Apollo Client Cache

```tsx
const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: ['category', 'search'],
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
```

### Service Worker (PWA)

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\..*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60, // 1 hour
        },
      },
    },
  ],
});
```

---

## ✅ Implementation Checklist

### Completed Implementations

| Optimization        | Files                                             | Status |
| ------------------- | ------------------------------------------------- | ------ |
| React.memo          | ProductCard, ProductSlider, LazyImage             | ✅     |
| useMemo             | ProductCard, ProductSlider, Header, Products Page | ✅     |
| useCallback         | ProductCard, Header, Home Page, Products Page     | ✅     |
| Debouncing          | Products Page (search, price filters)             | ✅     |
| Throttling          | useScrollToBottom hook                            | ✅     |
| Code Splitting      | ProductSlider dynamic import                      | ✅     |
| Lazy Loading        | LazyImage component, native loading="lazy"        | ✅     |
| React Query Cache   | All data fetching hooks                           | ✅     |
| Apollo Client Cache | GraphQL queries                                   | ✅     |

### New Files Created

| File                             | Purpose                          |
| -------------------------------- | -------------------------------- |
| `lib/utils/debounce.ts`          | Debounce utility function        |
| `lib/utils/throttle.ts`          | Throttle utility function        |
| `lib/hooks/useDebounce.ts`       | React hook for debouncing values |
| `lib/hooks/useThrottle.ts`       | React hook for throttling        |
| `lib/hooks/useScrollToBottom.ts` | Scroll detection with throttling |
| `components/LazyImage.tsx`       | Lazy loading image component     |

### Future Enhancements

- [ ] Add service worker for offline caching
- [ ] Implement virtual scrolling for long lists
- [ ] Add prefetching for product pages
- [ ] Implement request deduplication
- [ ] Add bundle analyzer to CI pipeline
- [ ] Implement progressive image loading (blur-up)

---

## 📊 Monitoring

### Before Production Checklist

- [ ] Run bundle analysis
- [ ] Enable image optimization
- [ ] Implement code splitting
- [ ] Add proper caching headers
- [ ] Enable gzip/brotli compression
- [ ] Test Core Web Vitals

### Ongoing Monitoring

- [ ] Monitor Lighthouse scores
- [ ] Track real user metrics (RUM)
- [ ] Review bundle size on PRs
- [ ] Profile React renders with DevTools

### Performance Testing Commands

```bash
# Run Lighthouse
npx lighthouse http://localhost:3004 --view

# Analyze bundle
yarn build && ls -la .next/static/chunks/

# Profile with React DevTools
# Install React Developer Tools browser extension
# Use Profiler tab to record renders
```

---

## 📖 Related Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - System architecture
- [TESTING.md](../TESTING.md) - Performance testing guidelines
- [NEXTJS.md](NEXTJS.md) - Next.js specific optimizations
- [REACT.md](REACT.md) - React best practices

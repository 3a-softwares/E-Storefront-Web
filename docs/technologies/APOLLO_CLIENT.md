# Apollo Client

## Overview

**Version:** 3.8.8  
**Website:** [https://www.apollographql.com/docs/react](https://www.apollographql.com/docs/react)  
**Category:** GraphQL Client

Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.

---

## Why Apollo Client?

### Benefits

| Benefit               | Description                                 |
| --------------------- | ------------------------------------------- |
| **Declarative Data**  | Describe data needs with GraphQL queries    |
| **Intelligent Cache** | Normalized caching reduces network requests |
| **Real-time Updates** | Subscriptions for live data                 |
| **Optimistic UI**     | Instant UI feedback before server confirms  |
| **Error Handling**    | Built-in error and loading states           |
| **DevTools**          | Powerful debugging with Apollo DevTools     |

### Why We Chose Apollo Client

1. **GraphQL Integration** - Native support for our GraphQL Gateway
2. **Caching** - Automatic cache management reduces API calls
3. **TypeScript** - Full type safety with GraphQL Code Generator
4. **React Hooks** - Modern hooks API (`useQuery`, `useMutation`)
5. **Ecosystem** - Large community and extensive documentation

---

## How to Use Apollo Client

### Client Setup

```typescript
// lib/apollo/client.ts
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
  credentials: 'include',
});

// Auth middleware
const authLink = new ApolloLink((operation, forward) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  }));

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
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
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
```

### Provider Setup

```tsx
// app/providers.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo/client';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
```

### Queries

```typescript
// lib/apollo/queries/products.ts
import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($search: String, $category: String, $page: Int, $limit: Int) {
    products(search: $search, category: $category, page: $page, limit: $limit) {
      products {
        id
        name
        slug
        price
        images
        stock
        category {
          id
          name
        }
      }
      total
      page
      totalPages
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      images
      stock
      category {
        id
        name
      }
      reviews {
        id
        rating
        comment
        user {
          name
        }
      }
    }
  }
`;
```

### Using Queries in Components

```tsx
'use client';

import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '@/lib/apollo/queries/products';

interface ProductsPageProps {
  category?: string;
  search?: string;
}

export function ProductsPage({ category, search }: ProductsPageProps) {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
    variables: {
      category,
      search,
      page: 1,
      limit: 12,
    },
  });

  if (loading) return <ProductsSkeleton />;
  if (error) return <ErrorMessage message={error.message} />;

  const { products, total, totalPages } = data.products;

  return (
    <div>
      <p>Found {total} products</p>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

### Mutations

```typescript
// lib/apollo/mutations/cart.ts
import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation AddToCart($input: CartItemInput!) {
    addToCart(input: $input) {
      id
      items {
        product {
          id
          name
          price
        }
        quantity
      }
      total
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      orderNumber
      status
      total
    }
  }
`;
```

### Using Mutations

```tsx
'use client';

import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '@/lib/apollo/mutations/cart';

export function CheckoutButton() {
  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER, {
    onCompleted: (data) => {
      router.push(`/orders/${data.createOrder.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCheckout = async () => {
    await createOrder({
      variables: {
        input: {
          items: cartItems,
          shippingAddressId: selectedAddress,
          paymentMethod: 'card',
        },
      },
    });
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Processing...' : 'Place Order'}
    </button>
  );
}
```

### Optimistic Updates

```tsx
const [addToCart] = useMutation(ADD_TO_CART, {
  optimisticResponse: {
    addToCart: {
      __typename: 'Cart',
      id: 'temp-id',
      items: [...currentItems, newItem],
      total: currentTotal + newItem.price,
    },
  },
  update: (cache, { data }) => {
    cache.modify({
      fields: {
        cart() {
          return data.addToCart;
        },
      },
    });
  },
});
```

---

## Cache Management

### Reading from Cache

```typescript
const cachedProduct = apolloClient.readQuery({
  query: GET_PRODUCT,
  variables: { id: productId },
});
```

### Writing to Cache

```typescript
apolloClient.writeQuery({
  query: GET_PRODUCT,
  variables: { id: productId },
  data: {
    product: updatedProduct,
  },
});
```

### Evicting from Cache

```typescript
apolloClient.cache.evict({ id: `Product:${productId}` });
apolloClient.cache.gc(); // Garbage collect
```

---

## Related Documentation

- [GRAPHQL.md](GRAPHQL.md) - GraphQL schema and queries
- [ZUSTAND.md](ZUSTAND.md) - Client state management
- [REACT_QUERY.md](REACT_QUERY.md) - REST API data fetching

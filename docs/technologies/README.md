# E-Storefront Web Technology Stack

Comprehensive technology documentation for E-Storefront Web application.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     E-Storefront Web Technology Stack                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                           UI LAYER                                     │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐   │ │
│  │   │   Tailwind CSS  │  │     DaisyUI     │  │    FontAwesome      │   │ │
│  │   │   Utility-first │  │   Components    │  │      Icons          │   │ │
│  │   └─────────────────┘  └─────────────────┘  └─────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                      │                                       │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                       FRAMEWORK LAYER                                  │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │   ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │   │                    Next.js 16.1.1 (App Router)                  │ │ │
│  │   │     Server Components │ SSR │ ISR │ API Routes │ Middleware    │ │ │
│  │   └─────────────────────────────────────────────────────────────────┘ │ │
│  │   ┌──────────────────────┐  ┌──────────────────────────────────────┐  │ │
│  │   │    React 18.2        │  │        TypeScript 5.x                │  │ │
│  │   │  Hooks │ Suspense    │  │   Type Safety │ Interfaces          │  │ │
│  │   └──────────────────────┘  └──────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                      │                                       │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                       STATE MANAGEMENT                                 │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │ │
│  │   │     Zustand      │  │   React Query    │  │   Apollo Client  │   │ │
│  │   │  Client State    │  │  Server State    │  │   GraphQL Data   │   │ │
│  │   │  Cart, UI, Auth  │  │  Caching, Sync   │  │   Queries/Mut    │   │ │
│  │   └──────────────────┘  └──────────────────┘  └──────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                      │                                       │
│                                      ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                           API LAYER                                    │ │
│  │                GraphQL Gateway (Apollo Federation)                     │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                       TESTING & QUALITY                                │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │   Jest │ React Testing Library │ Cypress │ ESLint │ Prettier │ Sonar  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         DEPLOYMENT                                     │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │           Vercel (Production) │ Docker (Development/Staging)          │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Documentation Index

### Core Technologies

| Document                    | Version | Category   |
| --------------------------- | ------- | ---------- |
| [Next.js](NEXTJS.md)        | 16.1.1  | Framework  |
| [React](REACT.md)           | 18.2.0  | UI Library |
| [TypeScript](TYPESCRIPT.md) | 5.x     | Language   |

### State Management

| Document                          | Version | Category       |
| --------------------------------- | ------- | -------------- |
| [Zustand](ZUSTAND.md)             | 4.4.7   | Client State   |
| [React Query](REACT_QUERY.md)     | 5.90.12 | Server State   |
| [Apollo Client](APOLLO_CLIENT.md) | 3.8.8   | GraphQL Client |
| [Recoil](RECOIL.md)               | 0.7.7   | State Library  |

### Styling

| Document                        | Version | Category       |
| ------------------------------- | ------- | -------------- |
| [Tailwind CSS](TAILWIND_CSS.md) | 3.4.0   | CSS Framework  |
| [DaisyUI](DAISYUI.md)           | 4.4.19  | Component Lib  |
| [CSS](CSS.md)                   | 3       | Styling        |
| [PostCSS](POSTCSS.md)           | 8.4.32  | CSS Processing |

### Icons & Assets

| Document                      | Version | Category |
| ----------------------------- | ------- | -------- |
| [FontAwesome](FONTAWESOME.md) | 7.1.0   | Icons    |

### Testing

| Document                                               | Version | Category        |
| ------------------------------------------------------ | ------- | --------------- |
| [Jest](JEST.md)                                        | 29.7    | Unit Testing    |
| [React Testing Library](REACT_TESTING_LIBRARY.md)      | 14.2.1  | Component Tests |
| [Cypress](CYPRESS.md)                                  | 13.6    | E2E Testing     |

### Code Quality

| Document                              | Version | Category          |
| ------------------------------------- | ------- | ----------------- |
| [ESLint & Prettier](ESLINT_PRETTIER.md) | 8.x     | Linting & Format |
| [SonarCloud](SONARCLOUD.md)           | -       | Code Analysis     |

### DevOps & Deployment

| Document                   | Version | Category         |
| -------------------------- | ------- | ---------------- |
| [Docker](DOCKER.md)        | -       | Containerization |
| [Vercel](VERCEL.md)        | -       | Deployment       |
| [GitHub Actions](CI_CD.md) | -       | CI/CD            |

### Additional Guides

| Document                                 | Description                          |
| ---------------------------------------- | ------------------------------------ |
| [GraphQL](GRAPHQL.md)                    | GraphQL schema and queries           |
| [State Management](STATE_MANAGEMENT.md)  | State management overview            |
| [Styling](STYLING.md)                    | Styling patterns and best practices  |
| [Performance](PERFORMANCE.md)            | Performance optimization guide       |

---

## Quick Reference

### Package Versions

```json
{
  "dependencies": {
    "next": "^16.1.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@apollo/client": "^3.8.8",
    "@tanstack/react-query": "^5.90.12",
    "zustand": "^4.4.7",
    "recoil": "^0.7.7",
    "@fortawesome/react-fontawesome": "^3.1.1",
    "graphql": "^16.8.1"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "daisyui": "^4.4.19",
    "jest": "^29.7.0",
    "cypress": "^13.6.0",
    "eslint": "^8.0.0",
    "prettier": "^3.2.0"
  }
}
```

---

## Related Documentation

- [Main Documentation](../README.md)
- [Architecture](../ARCHITECTURE.md)
- [API Integration](../API.md)
- [Testing Guide](../TESTING.md)

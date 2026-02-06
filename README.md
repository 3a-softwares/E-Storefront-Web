# E-Storefront Web

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Coverage](https://img.shields.io/badge/Coverage-17%25-yellow)](./coverage/lcov-report/index.html)

Customer-facing e-commerce storefront application built with Next.js, featuring product browsing, shopping cart, wishlist, checkout, and user authentication.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Customer Features

- 🛒 **Shopping Cart** - Add, update, remove items with persistent storage
- ❤️ **Wishlist** - Save favorite products for later
- 🔍 **Product Search** - Search with filters (category, price range, sorting)
- 📦 **Order Management** - Track orders and order history
- 👤 **User Authentication** - Email/password and Google OAuth login
- 📍 **Address Management** - Multiple shipping addresses
- ⭐ **Product Reviews** - Rate and review purchased products
- 🎫 **Support Tickets** - Customer support system

### Technical Features

- ⚡ **Performance Optimized** - React.memo, useMemo, useCallback, code splitting
- 📱 **PWA Support** - Offline capability with service worker
- 🎨 **Responsive Design** - Mobile-first with Tailwind CSS + DaisyUI
- 🔄 **Real-time Updates** - Apollo Client with cache management
- 🔐 **Secure Auth** - JWT tokens with automatic refresh
- 🧪 **Comprehensive Testing** - Jest unit tests + Cypress E2E
- 📊 **Code Quality** - ESLint, Prettier, SonarCloud integration

## 🛠 Tech Stack

| Category             | Technologies                                              |
| -------------------- | --------------------------------------------------------- |
| **Framework**        | Next.js 16.1.1 (App Router)                               |
| **Language**         | TypeScript 5.x                                            |
| **UI Library**       | React 18.2.0                                              |
| **State Management** | Zustand 4.4.7, Recoil 0.7.7, TanStack React Query 5.90.12 |
| **API Layer**        | Apollo Client 3.8.8 (GraphQL 16.8.1)                      |
| **Styling**          | Tailwind CSS 3.4.0, DaisyUI 4.4.19, PostCSS               |
| **Icons**            | FontAwesome 7.1.0                                         |
| **Testing**          | Jest 29.7, React Testing Library 14.2.1, Cypress 13.6     |
| **Code Quality**     | ESLint 8.x, Prettier 3.2, SonarCloud                      |
| **Containerization** | Docker, Docker Compose                                    |
| **Deployment**       | Vercel, Docker Hub                                        |
| **Shared Packages**  | @3asoftwares/types, @3asoftwares/ui, @3asoftwares/utils   |

## 🎨 Technology Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     E-Storefront Web Technology Stack                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                           UI LAYER                                     │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                        │ │
│  │   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐   │ │
│  │   │   Tailwind CSS  │  │     DaisyUI     │  │    FontAwesome      │   │ │
│  │   │   Utility-first │  │   Components    │  │      Icons          │   │ │
│  │   └─────────────────┘  └─────────────────┘  └─────────────────────┘   │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                      │                                       │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                       FRAMEWORK LAYER                                  │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                        │ │
│  │   ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │   │                    Next.js 16.1.1 (App Router)                  │ │ │
│  │   │     Server Components │ SSR │ ISR │ API Routes │ Middleware    │ │ │
│  │   └─────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                        │ │
│  │   ┌──────────────────────┐  ┌──────────────────────────────────────┐  │ │
│  │   │    React 18          │  │        TypeScript 5.x                │  │ │
│  │   │  Hooks │ Suspense    │  │   Type Safety │ Interfaces          │  │ │
│  │   └──────────────────────┘  └──────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                      │                                       │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                       STATE MANAGEMENT                                 │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                        │ │
│  │   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │ │
│  │   │     Zustand      │  │   React Query    │  │   Apollo Client  │   │ │
│  │   │  Client State    │  │  Server State    │  │   GraphQL Data   │   │ │
│  │   │  Cart, UI, Auth  │  │  Caching, Sync   │  │   Queries/Mut    │   │ │
│  │   └──────────────────┘  └──────────────────┘  └──────────────────┘   │ │
│  │                                                                        │ │
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
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

For detailed technology documentation, see [E-Storefront/docs/technologies](../E-Storefront/docs/technologies/).

## 📦 Prerequisites

- **Node.js** >= 20.x
- **yarn** >= 1.22.x (recommended)
- **Docker** (optional, for containerized development)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/3asoftwares/E-Storefront-Web.git
cd E-Storefront-Web
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration (see [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md) for details).

### 4. Start Development Server

```bash
yarn dev
```

Visit [http://localhost:3004](http://localhost:3004) to view the application.

### Docker Development

```bash
# Development mode
docker-compose up storefront-dev

# Production mode
docker-compose --profile production up storefront-prod
```

## 📁 Project Structure

```
E-Storefront-Web/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── providers.tsx       # App providers (Apollo, React Query, etc.)
│   ├── cart/               # Shopping cart page
│   ├── checkout/           # Checkout flow
│   ├── products/           # Product listing and details
│   ├── orders/             # Order history and details
│   ├── profile/            # User profile management
│   ├── login/              # Authentication pages
│   ├── signup/
│   ├── wishlist/           # User wishlist
│   └── ...                 # Other feature pages
├── components/             # Reusable React components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── ProductCard.tsx     # Product display card
│   ├── ProductSlider.tsx   # Featured products carousel
│   └── ...                 # Other components
├── lib/                    # Utilities and configurations
│   ├── apollo/             # Apollo Client setup
│   │   ├── client.ts       # Apollo Client configuration
│   │   └── queries/        # GraphQL queries and mutations
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
├── store/                  # State management
│   ├── cartStore.ts        # Zustand cart store
│   ├── categoryStore.ts    # Category state
│   └── recoilState.ts      # Recoil atoms
├── types/                  # TypeScript type definitions
├── tests/                  # Jest unit tests
├── cypress/                # Cypress E2E tests
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 📜 Available Scripts

| Command              | Description                           |
| -------------------- | ------------------------------------- |
| `yarn dev`           | Start development server on port 3004 |
| `yarn build`         | Build for production                  |
| `yarn start`         | Start production server               |
| `yarn lint`          | Run ESLint                            |
| `yarn lint:fix`      | Fix ESLint issues                     |
| `yarn type-check`    | TypeScript type checking              |
| `yarn test`          | Run Jest tests                        |
| `yarn test:watch`    | Run tests in watch mode               |
| `yarn test:coverage` | Generate coverage report              |
| `yarn cy:open`       | Open Cypress test runner              |
| `yarn cy:run`        | Run Cypress tests headlessly          |
| `yarn format`        | Format code with Prettier             |
| `yarn format:check`  | Check code formatting                 |

## 📚 Documentation

All documentation is located in the [`docs/`](docs/) folder:

### Core Documentation

| Document                                | Description                             |
| --------------------------------------- | --------------------------------------- |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture and design patterns |
| [API.md](docs/API.md)                   | GraphQL API reference and integration   |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md)     | Deployment guides (Vercel, Docker)      |
| [ENVIRONMENT.md](docs/ENVIRONMENT.md)   | Environment variables configuration     |
| [SECURITY.md](docs/SECURITY.md)         | Security policies and best practices    |
| [TESTING.md](docs/TESTING.md)           | Testing strategies and guidelines       |

### Technology Guides

| Document                                            | Description              |
| --------------------------------------------------- | ------------------------ |
| [Technologies Overview](docs/technologies/)         | Full tech stack docs     |
| [Next.js](docs/technologies/NEXTJS.md)              | Next.js 16 App Router    |
| [React](docs/technologies/REACT.md)                 | React 18 best practices  |
| [TypeScript](docs/technologies/TYPESCRIPT.md)       | TypeScript configuration |
| [Zustand](docs/technologies/ZUSTAND.md)             | Zustand state management |
| [React Query](docs/technologies/REACT_QUERY.md)     | TanStack React Query     |
| [Apollo Client](docs/technologies/APOLLO_CLIENT.md) | Apollo Client GraphQL    |
| [Recoil](docs/technologies/RECOIL.md)               | Recoil atomic state      |
| [Tailwind CSS](docs/technologies/TAILWIND_CSS.md)   | Tailwind CSS styling     |
| [DaisyUI](docs/technologies/DAISYUI.md)             | DaisyUI components       |
| [PostCSS](docs/technologies/POSTCSS.md)             | PostCSS configuration    |
| [FontAwesome](docs/technologies/FONTAWESOME.md)     | FontAwesome icons        |
| [Performance](docs/technologies/PERFORMANCE.md)     | Performance optimization |
| [Jest](docs/technologies/JEST.md)                   | Jest unit testing        |
| [Cypress](docs/technologies/CYPRESS.md)             | Cypress E2E testing      |
| [Vercel](docs/technologies/VERCEL.md)               | Vercel deployment        |

### Additional Documentation

| Document                                   | Description             |
| ------------------------------------------ | ----------------------- |
| [Contributing](docs/CONTRIBUTING.md)       | Contribution guidelines |
| [Changelog](docs/CHANGELOG.md)             | Version history         |
| [Getting Started](docs/GETTING-STARTED.md) | Quick start guide       |

## 🤝 Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on:

- Code of Conduct
- Development workflow
- Pull request process
- Coding standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://3asoftwares.com">3A Softwares</a>
</p>

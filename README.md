# Storefront App

## Overview

Customer-facing 3asoftwares storefront with product browsing, cart management, and checkout functionality - the main shopping experience for end users.

## Quick Start

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm
- Docker (optional)

### Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Docker Development

```bash
# Start with Docker Compose
docker compose up storefront-dev

# Or build and run manually
docker build -t storefront-dev .
docker run -p 3003:3003 storefront-dev
```

### Production Build

```bash
# Build production Docker image
docker build -f Dockerfile.prod -t storefront-prod \
  --build-arg NEXT_PUBLIC_AUTH_SERVICE_URL=https://auth.example.com \
  --build-arg NEXT_PUBLIC_GRAPHQL_URL=https://api.example.com/graphql \
  .

# Run production container
docker run -p 3003:3003 storefront-prod
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

### Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| **CI** | Push, PR | Lint, test, build, security scan |
| **CD** | Push to main | Build Docker image, deploy to staging/production |

### Required Secrets

Configure these in GitHub repository settings:

| Secret | Description |
|--------|-------------|
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | Auth service URL |
| `NEXT_PUBLIC_GRAPHQL_URL` | GraphQL API URL |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `STAGING_HOST` | Staging server hostname |
| `STAGING_USER` | Staging SSH username |
| `STAGING_SSH_KEY` | Staging SSH private key |
| `STAGING_DEPLOY_PATH` | Staging deployment path |
| `PRODUCTION_HOST` | Production server hostname |
| `PRODUCTION_USER` | Production SSH username |
| `PRODUCTION_SSH_KEY` | Production SSH private key |
| `PRODUCTION_DEPLOY_PATH` | Production deployment path |
| `CODECOV_TOKEN` | Codecov upload token |
| `SLACK_WEBHOOK_URL` | Slack notifications (optional) |

### Environment Variables

Configure these in GitHub repository variables:

| Variable | Description |
|----------|-------------|
| `STAGING_URL` | Staging environment URL |
| `PRODUCTION_URL` | Production environment URL |

## Tech Stack

### Frontend Framework

- **Next.js 16** - React framework with SSR/SSG
- **React 18** - UI library
- **TypeScript 5** - Type-safe development


### State Management

- **Zustand** - Cart and UI state
- **TanStack React Query** - Server state and caching
- **Recoil** - Additional state management

### API

- **Apollo Client** - GraphQL client
- **Axios** - REST API calls
- **GraphQL** - Query language

### Styling

- **Tailwind CSS 3.4** - Utility-first CSS
- **DaisyUI 4** - Component library

### Testing

- **Jest 29** - Test runner
- **React Testing Library 14** - Component testing

### Icons

- **FontAwesome** - Icon library

## Features

- ✅ Product catalog with search and filters
- ✅ Category-based browsing
- ✅ Product detail pages with reviews
- ✅ Shopping cart management
- ✅ User authentication
- ✅ Order placement
- ✅ Address management
- ✅ Order history
- ✅ Coupon/discount application
- ✅ Responsive design
- ✅ Dark/Light theme

## Project Structure

```
app/              # Next.js App Router pages
├── page.tsx      # Home page
├── products/     # Product pages
├── cart/         # Cart page
├── checkout/     # Checkout flow
├── orders/       # Order history
└── profile/      # User profile
components/       # Reusable components
├── Header.tsx
├── Footer.tsx
├── ProductCard.tsx
├── ProductReviews.tsx
└── ...
lib/              # Utilities and API clients
store/            # State management
public/           # Static assets
```

## Scripts

```bash
yarn dev         # Start development server (port 3003)
yarn build       # Build for production
yarn start       # Start production server
yarn lint        # Run ESLint
yarn test        # Run tests
yarn test:watch  # Run tests in watch mode
yarn test:coverage # Run tests with coverage
```

## Environment Variables

Create `.env.local` from `.env.example`:

```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:3011
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

## Port

- Development: `3003`

## Docker Commands

```bash
# Development
docker compose up storefront-dev

# Production (local test)
docker compose --profile production up storefront-prod

# Run tests in container
docker compose --profile test up storefront-test

# Build production image
docker build -f Dockerfile.prod -t storefront:latest .
```

## Dependencies on Shared Packages

- `@3asoftwares/types` - Shared TypeScript types
- `@3asoftwares/ui` - Shared UI components
- `@3asoftwares/utils` - Shared utilities

## License

MIT

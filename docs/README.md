# E-Storefront Web Documentation

Comprehensive documentation for the E-Storefront Web application.

---

## 📑 Table of Contents

### Getting Started

| Document                              | Description                   |
| ------------------------------------- | ----------------------------- |
| [Getting Started](GETTING-STARTED.md) | Quick start and prerequisites |
| [Environment](ENVIRONMENT.md)         | Environment variables config  |

### Architecture & API

| Document                        | Description                             |
| ------------------------------- | --------------------------------------- |
| [Architecture](ARCHITECTURE.md) | System architecture and design patterns |
| [API](API.md)                   | GraphQL API integration                 |

### Development

| Document                                | Description                   |
| --------------------------------------- | ----------------------------- |
| [Coding Standards](CODING-STANDARDS.md) | Code style and best practices |
| [Testing](TESTING.md)                   | Testing strategies            |
| [Contributing](CONTRIBUTING.md)         | Contribution guidelines       |

### Operations

| Document                    | Description                 |
| --------------------------- | --------------------------- |
| [Deployment](DEPLOYMENT.md) | Deploy to Vercel and Docker |
| [CI-CD](CI-CD.md)           | GitHub Actions pipelines    |
| [Security](SECURITY.md)     | Security policies           |

### Reference

| Document                      | Description           |
| ----------------------------- | --------------------- |
| [Changelog](CHANGELOG.md)     | Version history       |
| [Technologies](technologies/) | Technology stack docs |

---

## 🔗 Production URLs

| Environment | URL                                  | Description         |
| ----------- | ------------------------------------ | ------------------- |
| Production  | https://shop.3asoftwares.com         | Live storefront     |
| Staging     | https://staging-shop.3asoftwares.com | Staging environment |
| API         | https://api.3asoftwares.com/graphql  | GraphQL endpoint    |
| Auth        | https://auth.3asoftwares.com         | Auth service        |

---

## 📁 Documentation Structure

```
docs/
├── README.md              # This file - documentation index
├── GETTING-STARTED.md     # Quick start guide
├── ENVIRONMENT.md         # Environment configuration
├── ARCHITECTURE.md        # System architecture
├── API.md                 # GraphQL API docs
├── CODING-STANDARDS.md    # Coding standards
├── TESTING.md             # Testing guide
├── CONTRIBUTING.md        # Contribution guide
├── DEPLOYMENT.md          # Deployment (Vercel + Docker)
├── CI-CD.md               # CI/CD pipelines
├── SECURITY.md            # Security policies
├── CHANGELOG.md           # Version history
└── technologies/          # Technology-specific docs
    ├── README.md          # Tech stack overview
    ├── NEXTJS.md          # Next.js docs
    ├── REACT.md           # React docs
    ├── TYPESCRIPT.md      # TypeScript docs
    ├── ZUSTAND.md         # Zustand state management
    ├── APOLLO_CLIENT.md   # Apollo Client GraphQL
    ├── REACT_QUERY.md     # TanStack React Query
    ├── TAILWIND_CSS.md    # Tailwind CSS
    ├── DAISYUI.md         # DaisyUI components
    ├── JEST.md            # Jest testing
    ├── CYPRESS.md         # Cypress E2E
    ├── PERFORMANCE.md     # Performance optimization
    └── ...                # Other technologies
```

---

## 🛠 Quick Commands

```bash
# Development
yarn dev              # Start dev server (port 3004)
yarn build            # Build for production
yarn start            # Start production server

# Code Quality
yarn lint             # Run ESLint
yarn lint:fix         # Auto-fix lint issues
yarn type-check       # TypeScript check
yarn format           # Format with Prettier

# Testing
yarn test             # Run unit tests
yarn test:watch       # Watch mode
yarn test:coverage    # Coverage report
yarn cy:open          # Cypress UI
yarn cy:run           # Headless Cypress

# Docker
yarn docker:dev       # Development container
yarn docker:prod      # Production container
```

---

## 📖 Related Projects

| Project                                                                     | Description       |
| --------------------------------------------------------------------------- | ----------------- |
| [E-Storefront](https://github.com/3asoftwares/E-Storefront)                 | Backend services  |
| [E-Storefront-Mobile](https://github.com/3asoftwares/E-Storefront-Mobile)   | Mobile app (Expo) |
| [E-Storefront-Support](https://github.com/3asoftwares/E-Storefront-Support) | Support portal    |

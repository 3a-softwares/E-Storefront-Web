# Vercel

## Overview

**Website:** [https://vercel.com](https://vercel.com)  
**Category:** Deployment Platform

Vercel is a cloud platform for static sites and serverless functions that enables developers to deploy websites and web services instantly.

---

## Why Vercel?

### Benefits

| Benefit             | Description                                    |
| ------------------- | ---------------------------------------------- |
| **Next.js Native**  | Built by the creators of Next.js               |
| **Zero Config**     | Automatic detection and deployment             |
| **Edge Network**    | Global CDN for fast content delivery           |
| **Preview Deploys** | Every PR gets a unique preview URL             |
| **Serverless**      | Automatic scaling with serverless functions    |
| **Analytics**       | Built-in web analytics and performance metrics |

### Why We Chose Vercel

1. **Next.js Integration** - Best platform for Next.js apps
2. **Automatic Previews** - Every PR gets deployed for review
3. **Zero Downtime** - Instant rollbacks and deployments
4. **Environment Variables** - Easy secret management
5. **Team Collaboration** - Shared projects and comments

---

## Configuration

### vercel.json

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "yarn build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "devCommand": "yarn dev",
  "regions": ["iad1"],
  "git": {
    "deploymentEnabled": true
  }
}
```

### Environment Variables

Set in Vercel Dashboard → Settings → Environment Variables:

| Variable                       | Environment | Value                                 |
| ------------------------------ | ----------- | ------------------------------------- |
| `NEXT_PUBLIC_ENV`              | Production  | `production`                          |
| `NEXT_PUBLIC_GRAPHQL_URL`      | Production  | `https://api.3asoftwares.com/graphql` |
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | Production  | `https://auth.3asoftwares.com`        |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | All         | `<your-client-id>`                    |
| `NEXT_PUBLIC_SITE_URL`         | Production  | `https://shop.3asoftwares.com`        |

---

## Deployment

### Automatic Deployments

| Branch      | Environment | Domain                      |
| ----------- | ----------- | --------------------------- |
| `main`      | Production  | shop.3asoftwares.com        |
| `develop`   | Preview     | develop-shop.vercel.app     |
| `feature/*` | Preview     | feature-xxx-shop.vercel.app |

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Deploy from GitHub

1. Push to repository
2. Vercel automatically detects and builds
3. Preview URL generated for PRs
4. Production deploy on merge to main

---

## Features Used

### Preview Deployments

Every pull request automatically gets:

- Unique preview URL
- Full production-like environment
- Comments on PR with preview link
- Lighthouse performance scores

### Serverless Functions

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
}
```

### Edge Functions

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Runs at the edge, close to users
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

### Analytics

Enable in Vercel Dashboard:

- Web Analytics (page views, visitors)
- Speed Insights (Core Web Vitals)

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## Domains

### Custom Domain Setup

1. Go to Project Settings → Domains
2. Add custom domain: `shop.3asoftwares.com`
3. Configure DNS records:

| Type  | Name | Value                |
| ----- | ---- | -------------------- |
| CNAME | shop | cname.vercel-dns.com |
| A     | @    | 76.76.21.21          |

### SSL/TLS

- Automatic HTTPS with Let's Encrypt
- Free SSL certificates
- Auto-renewal

---

## Production URLs

| Environment | URL                             |
| ----------- | ------------------------------- |
| Production  | https://shop.3asoftwares.com    |
| Staging     | https://staging.3asoftwares.com |
| Preview     | https://preview-\*.vercel.app   |

---

## Best Practices

### 1. Environment Variables

```bash
# Never commit secrets
# Use Vercel Dashboard for sensitive values
# Use NEXT_PUBLIC_ prefix for client-side vars
```

### 2. Build Optimization

```json
// next.config.js
{
  "output": "standalone" // Smaller deployment bundle
}
```

### 3. Caching

```typescript
// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour
```

---

## Related Documentation

- [DEPLOYMENT.md](../DEPLOYMENT.md) - Full deployment guide
- [CI_CD.md](CI_CD.md) - CI/CD pipelines
- [DOCKER.md](DOCKER.md) - Docker deployment

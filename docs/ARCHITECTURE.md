# Plaqode Platform Architecture

## Overview
The Plaqode Platform is a **distributed monorepo** designed to scale multiple interconnected products while maintaining a shared identity and design system.

## 🌐 Ecosystem Map

```mermaid
graph TD
    User((User))
    
    subgraph "Frontend Layer (Vercel)"
        Web[Plaqode Web<br/>(Landing/Dashboard)<br/>:3000]
        QR_Web[QR Studio Web<br/>(Creator Tool)<br/>:3001]
        Card[Cardify<br/>(Digital Cards)<br/>:3002]
    end
    
    subgraph "Backend Layer (Fly.io)"
        Auth[Plaqode Auth<br/>(SSO Service)<br/>:3003]
        QR_API[QR Studio API<br/>(Generation Engine)<br/>:3005]
    end
    
    subgraph "Data Layer (Neon/Postgres)"
        Auth_DB[(Auth DB)]
        QR_DB[(QR DB)]
        Card_DB[(Cardify DB)]
    end

    User --> Web
    User --> QR_Web
    User --> Card
    
    Web --> Auth
    QR_Web --> QR_API
    QR_Web --> Auth
    Card --> Auth
    Card --> Card_DB
    
    Auth --> Auth_DB
    QR_API --> QR_DB
```

## 🔐 Authentication Flow (RS256)
We use asymmetric cryptography for a stateless, secure authentication flow.

1.  **Login**: User posts credentials to `Plaqode Auth` (:3003).
2.  **Token**: Auth Service signs a JWT using its **Private Key**.
3.  **Cookie**: The JWT is set as an `HttpOnly` cookie on the `.plaqode.com` domain (or `localhost`).
4.  **Verification**:
    *   `Cardify` or `QR Studio` receives a request.
    *   They read the cookie.
    *   They verify the signature using the shared **Public Key**.
    *   **Result**: Zero network latency for auth checks on the app side.

## 💾 Database Strategy
**"Isolated Prisma Clients"**

To prevent "monarch" monolith schemas, each application maintains its own Prisma schema and generates its own client.

*   `apps/plaqode-auth/prisma/schema.prisma` -> Generates client for Auth.
*   `apps/cardify/prisma/schema.prisma` -> Generates client for Cardify.

This allows services to evolve independently without breaking each other's database contracts.

## 📦 Shared Packages
*   `packages/ui`: Shared UI components (Buttons, Inputs, Toasts) using Tailwind & Radix.
*   `packages/typescript-config`: Shared `tsconfig` bases.

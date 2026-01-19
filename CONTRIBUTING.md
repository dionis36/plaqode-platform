# Contributing to Plaqode Platform

Welcome to the **Plaqode Platform** monorepo! We are building a unified ecosystem for digital business cards, dynamic QR codes, and centralized authentication.

## ⚡ Quick Start (Setup)

### 1. Prerequisites
You need the following installed:
- **Node.js** (v20+ recommended)
- **npm** (v10+, comes with Node.js)
- **PostgreSQL** (Running locally or via Docker)

### 2. Installation
```bash
# Clone the repo (if you haven't)
git clone https://github.com/plaqode/plaqode-platform.git
cd plaqode-platform

# Install dependencies
npm install
```

### 3. Environment Setup
You must configure `.env` files for each service.
```bash
# We have a helper script to copy examples (or do it manually)
cp apps/cardify/.env.example apps/cardify/.env
cp apps/plaqode-auth/.env.example apps/plaqode-auth/.env
cp apps/plaqode-web/.env.example apps/plaqode-web/.env
cp apps/qrstudio-api/.env.example apps/qrstudio-api/.env
cp apps/qrstudio-web/.env.example apps/qrstudio-web/.env
```
> **Action**: Go into each `.env` file and verify the `DATABASE_URL` matches your local Postgres setup.

### 4. Database & Keys
The platform uses **Isolated Prisma Clients** and **RS256 JWT Authentication**.
```bash
# 1. Generate Prisma Clients (Critical Step)
npx turbo run prisma:generate

# 2. Run Migrations (Setup DB Schema)
npx turbo run prisma:migrate

# 3. Generate Auth Keys (Required for Login)
npm run keys:generate --workspace=apps/plaqode-auth
npm run keys:generate --workspace=apps/qrstudio-api
```

### 5. Start Development
```bash
npm run dev
```

---

## 🏗️ Architecture & Stack

### Applications
| Service | Path | Port | Stack |
| :--- | :--- | :--- | :--- |
| **Plaqode Web** | `apps/plaqode-web` | `3000` | Next.js 15, Tailwind v4 |
| **QR Studio Web** | `apps/qrstudio-web` | `3001` | Next.js 14, React |
| **Cardify** | `apps/cardify` | `3002` | Next.js 14, standard Tailwind |
| **Plaqode Auth** | `apps/plaqode-auth` | `3003` | Fastify, Zod, Prisma |
| **QR Studio API** | `apps/qrstudio-api` | `3005` | Fastify, Sharp, GeoIP |

### Key Concepts
- **Monorepo**: Managed by **Turborepo**.
- **Auth**: Centralized in `@plaqode-platform/plaqode-auth`. All apps verify JWTs signed by this service using the Public Key.
- **Database**: Each service owns its own logical database (or schema) and has an isolated Prisma Client.

---

## 📝 Documentation Index
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Prod vs Local env vars, Vercel/Fly.io setup.
- **[CI/CD Guidelines](docs/CI_CD.md)** - workflows and build pipeline.
- **[Environment Setup](docs/ENVIRONMENT_SETUP.md)** - Detailed variable breakdown.

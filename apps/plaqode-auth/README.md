# Plaqode Auth (`apps/plaqode-auth`)

**Plaqode Auth** is the centralized authentication service (SSO) for the Plaqode Platform. It handles user identity, JWT issuance, and session management for all applications.

## 🛠️ Technology Stack
- **Runtime**: Node.js (v20+)
- **Framework**: Fastify
- **Validation**: Zod
- **Database**: PostgreSQL (via Prisma)
- **Auth**: RS256 Asymetric JWT (Keys required)

## 🚀 Getting Started

### 1. Environment Setup
```bash
cp .env.example .env
```
This service runs on **Port 3003**.

### 2. Generate Keys (Critical)
You must generate the RSA Keypair for signing tokens:
```bash
npm run keys:generate
```
This creates `keys/private.pem` and `keys/public.pem`.

### 3. Database Migration
```bash
npx prisma migrate dev
```

### 4. Run Service
```bash
npm run dev
# OR from root
npm run plaqode-auth:dev
```
Runs on **http://localhost:3003**.

## 🔌 API Endpoints
- `POST /auth/register`: Create new user.
- `POST /auth/login`: Issue HttpOnly cookie.
- `GET /auth/me`: Verify session and return user profile.

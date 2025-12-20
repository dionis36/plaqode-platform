# Environment Setup Guide

This document details the environment variables required for each application in the Plaqode Platform monorepo.

## Overview

Each application has its own `.env` file located in its directory:

```
apps/
├── cardify/.env
├── qrstudio-web/.env
├── qrstudio-api/.env
├── plaqode-web/.env
└── plaqode-auth/.env
```

## Cardify (`apps/cardify`)

### Database

```env
DATABASE_URL="postgresql://user:password@localhost:5432/cardify_db"
```

### Application

```env
NEXT_PUBLIC_APP_URL="http://localhost:3002"
```

### Optional

```env
# If using external services
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

---

## QR Studio Web (`apps/qrstudio-web`)

### Application

```env
NEXT_PUBLIC_API_URL="http://localhost:4001"
NEXT_PUBLIC_APP_URL="http://localhost:3001"
```

---

## QR Studio API (`apps/qrstudio-api`)

### Database

```env
DATABASE_URL="postgresql://user:password@localhost:5432/qrstudio_db"
```

### JWT Authentication

```env
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
```

### Application

```env
PORT=4001
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3001"
```

### Keys

After setting up, generate RSA keys:

```bash
cd apps/qrstudio-api
npm run keys:generate
```

---

## Plaqode Web (`apps/plaqode-web`)

### Application

```env
NEXT_PUBLIC_AUTH_API_URL="http://localhost:4000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Plaqode Auth (`apps/plaqode-auth`)

### Database

```env
DATABASE_URL="postgresql://user:password@localhost:5432/plaqode_auth_db"
```

### JWT Configuration

```env
# JWT Settings
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"

# Cookie Settings
COOKIE_DOMAIN="localhost"
COOKIE_SECURE="false"
COOKIE_SAME_SITE="lax"
```

### Application

```env
PORT=4000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000,http://localhost:3001,http://localhost:3002"
```

### Keys

Generate RSA key pairs for JWT signing:

```bash
cd apps/plaqode-auth
npm run keys:generate
```

This creates:
- `keys/private.pem` - Private key for signing tokens
- `keys/public.pem` - Public key for verifying tokens

---

## Database Setup

### Create Databases

```bash
# Connect to PostgreSQL
psql -U postgres

# Create databases
CREATE DATABASE cardify_db;
CREATE DATABASE qrstudio_db;
CREATE DATABASE plaqode_auth_db;

# Exit
\q
```

### Run Migrations

```bash
# Cardify
cd apps/cardify
npx prisma migrate dev

# QR Studio API
cd apps/qrstudio-api
npx prisma migrate dev

# Plaqode Auth
cd apps/plaqode-auth
npx prisma migrate dev
```

---

## Security Best Practices

### Development

- Use different database credentials for each service
- Keep `.env` files in `.gitignore` (already configured)
- Never commit actual `.env` files

### Production

- Use strong, unique secrets for each environment
- Enable HTTPS (`COOKIE_SECURE="true"`)
- Use environment-specific database URLs
- Rotate JWT secrets regularly
- Use proper CORS origins (no wildcards)

---

## Environment Variable Checklist

Before starting development, ensure:

- [ ] All `.env` files created from `.env.example`
- [ ] Database URLs configured and databases created
- [ ] JWT secrets set (unique per service)
- [ ] RSA keys generated for auth services
- [ ] CORS origins match your frontend URLs
- [ ] Ports don't conflict with other services

---

## Troubleshooting

### Database Connection Failed

1. Check PostgreSQL is running: `pg_isready`
2. Verify credentials in `.env`
3. Ensure database exists: `psql -U postgres -l`
4. Check DATABASE_URL format

### JWT Errors

1. Ensure keys are generated: `ls apps/plaqode-auth/keys/`
2. Regenerate if needed: `npm run keys:generate`
3. Check JWT_SECRET is set

### CORS Errors

1. Verify CORS_ORIGIN matches your frontend URL
2. Include protocol (http://)
3. No trailing slashes
4. Multiple origins: comma-separated

---

## Quick Setup Script

Create all `.env` files at once:

```bash
# From root directory
cp apps/cardify/.env.example apps/cardify/.env
cp apps/qrstudio-web/.env.example apps/qrstudio-web/.env
cp apps/qrstudio-api/.env.example apps/qrstudio-api/.env
cp apps/plaqode-web/.env.example apps/plaqode-web/.env
cp apps/plaqode-auth/.env.example apps/plaqode-auth/.env

echo "✅ All .env files created! Now edit them with your values."
```

Then edit each file with your specific configuration.

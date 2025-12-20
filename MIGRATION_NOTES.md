# Migration Notes

## Migration Date
December 20, 2025

## Overview

This document records the migration of three separate workspaces into the unified Plaqode Platform monorepo.

## Source Workspaces

### 1. Cardify-5
- **Original Location**: `C:\Users\DIO\Documents\PROJECT21\cardify-5`
- **New Location**: `apps/cardify`
- **Type**: Next.js application
- **Package Name**: `@plaqode-platform/cardify`
- **Port**: 3002 (unchanged)

### 2. QR Studio
- **Original Location**: `C:\Users\DIO\Documents\PROJECT23\qrstudio`
- **New Locations**:
  - Web: `apps/qrstudio-web`
  - API: `apps/qrstudio-api`
- **Type**: Turborepo monorepo (already)
- **Package Names**:
  - `@plaqode-platform/qrstudio-web`
  - `@plaqode-platform/qrstudio-api`
- **Ports**: 
  - Web: 3001 (changed from 3004)
  - API: 4001

### 3. Plaqode2
- **Original Location**: `C:\Users\DIO\Documents\PROJECT25\plaqode2`
- **New Locations**:
  - Web: `apps/plaqode-web`
  - Auth: `apps/plaqode-auth`
- **Type**: Multi-service project
- **Package Names**:
  - `@plaqode-platform/plaqode-web`
  - `@plaqode-platform/plaqode-auth`
- **Ports**:
  - Web: 3000 (default)
  - Auth: 4000

## Migration Process

### Phase 1: Root Setup ✅
- Created root `package.json` with npm workspaces
- Created `turbo.json` for build orchestration
- Created unified `.gitignore`
- Created base `tsconfig.json`
- Created root `README.md`

### Phase 2: Application Migration ✅

#### Cardify Migration
- Copied all source files excluding:
  - `node_modules/`
  - `.next/`
  - `.git/`
  - `.env` (kept `.env.example`)
  - `*.log` files
  - `*.tsbuildinfo`
- Updated package name to `@plaqode-platform/cardify`
- Port remains 3002

#### QR Studio Migration
- Copied web app from `apps/web` → `apps/qrstudio-web`
- Copied API from `apps/api` → `apps/qrstudio-api`
- Created `keys/` directory structure (without actual keys)
- Updated package names
- Changed web port from 3004 to 3001

#### Plaqode Migration
- Copied `platform-web` → `apps/plaqode-web`
- Copied `auth-service` → `apps/plaqode-auth`
- Created `keys/` directory structure for auth service
- Updated package names

### Phase 3: Shared Packages ✅
- Created `packages/typescript-config` with:
  - `base.json` - Base TypeScript config
  - `nextjs.json` - Next.js specific config
  - `node.json` - Node.js backend config

### Phase 4: Documentation ✅
- Created `docs/STARTUP_GUIDE.md`
- Created `docs/ENVIRONMENT_SETUP.md`
- Created `docs/PORT_ASSIGNMENTS.md`
- Created this `MIGRATION_NOTES.md`

## Files Excluded from Migration

### All Applications
- `node_modules/` - Will be reinstalled
- `.git/` - New repository
- `.env` files - Must be recreated from `.env.example`
- `*.log` files
- Build artifacts (`.next/`, `dist/`, `build/`)

### Specific Exclusions
- **Cardify**: `*.tsbuildinfo`, `bootstrap-plaqode.log`, `build_log*.txt`
- **QR Studio**: `.turbo/`, `.env.local`
- **Plaqode Auth**: Actual key files in `keys/` directory

## Important Changes

### Package Names
All packages now use the `@plaqode-platform/` scope:
- `cardify-5` → `@plaqode-platform/cardify`
- `web` → `@plaqode-platform/qrstudio-web`
- `api` → `@plaqode-platform/qrstudio-api`
- `platform-web` → `@plaqode-platform/plaqode-web`
- `auth-service` → `@plaqode-platform/plaqode-auth`

### Port Changes
- QR Studio Web: 3004 → 3001

### Directory Structure
```
Before:
PROJECT21/cardify-5/
PROJECT23/qrstudio/apps/web/
PROJECT23/qrstudio/apps/api/
PROJECT25/plaqode2/platform-web/
PROJECT25/plaqode2/auth-service/

After:
PROJECT27/plaqode-platform/apps/cardify/
PROJECT27/plaqode-platform/apps/qrstudio-web/
PROJECT27/plaqode-platform/apps/qrstudio-api/
PROJECT27/plaqode-platform/apps/plaqode-web/
PROJECT27/plaqode-platform/apps/plaqode-auth/
```

## Post-Migration Tasks

### Required Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Environment Files**
   ```bash
   # Copy .env.example to .env for each app
   cp apps/cardify/.env.example apps/cardify/.env
   cp apps/qrstudio-web/.env.example apps/qrstudio-web/.env
   cp apps/qrstudio-api/.env.example apps/qrstudio-api/.env
   cp apps/plaqode-web/.env.example apps/plaqode-web/.env
   cp apps/plaqode-auth/.env.example apps/plaqode-auth/.env
   ```

3. **Generate JWT Keys**
   ```bash
   cd apps/qrstudio-api && npm run keys:generate
   cd ../plaqode-auth && npm run keys:generate
   ```

4. **Setup Databases**
   ```bash
   # Create databases
   psql -U postgres -c "CREATE DATABASE cardify_db;"
   psql -U postgres -c "CREATE DATABASE qrstudio_db;"
   psql -U postgres -c "CREATE DATABASE plaqode_auth_db;"

   # Run migrations
   cd apps/cardify && npx prisma migrate dev
   cd ../qrstudio-api && npx prisma migrate dev
   cd ../plaqode-auth && npx prisma migrate dev
   ```

5. **Initialize Git**
   ```bash
   git init
   git add .
   git commit -m "Initial monorepo setup - migrated from 3 workspaces"
   ```

## Original Workspaces

The original workspaces remain **UNTOUCHED** at:
- `C:\Users\DIO\Documents\PROJECT21\cardify-5`
- `C:\Users\DIO\Documents\PROJECT23\qrstudio`
- `C:\Users\DIO\Documents\PROJECT25\plaqode2`

These serve as backups and can be safely archived or removed once the monorepo is verified to work correctly.

## Verification Checklist

- [ ] All dependencies installed successfully
- [ ] All apps build without errors
- [ ] All apps run in dev mode
- [ ] Database connections work
- [ ] JWT keys generated
- [ ] Environment variables configured
- [ ] All services accessible on assigned ports
- [ ] Turborepo caching works
- [ ] Git repository initialized

## Benefits Realized

1. **Unified Dependency Management**: Single `node_modules` at root
2. **Shared Tooling**: Common TypeScript, ESLint configs
3. **Simplified Development**: One `npm install`, one `npm run dev`
4. **Better Code Sharing**: Easy to extract shared packages
5. **Atomic Commits**: Cross-project changes in single commit
6. **Turborepo Caching**: Faster builds with intelligent caching

## Known Issues

None at this time.

## Future Improvements

1. Extract shared UI components to `packages/ui`
2. Extract QR generation utilities to `packages/qr-utils`
3. Extract authentication utilities to `packages/auth`
4. Set up CI/CD pipeline
5. Add pre-commit hooks (Husky)
6. Implement changesets for versioning

## Support

For issues or questions about the monorepo setup, refer to:
- [STARTUP_GUIDE.md](docs/STARTUP_GUIDE.md)
- [ENVIRONMENT_SETUP.md](docs/ENVIRONMENT_SETUP.md)
- [PORT_ASSIGNMENTS.md](docs/PORT_ASSIGNMENTS.md)

# Plaqode Platform - Startup Guide

Complete guide to running all services in the Plaqode Platform monorepo.

## Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL (for database services)

## Initial Setup

### 1. Install Dependencies

```bash
# From the root directory
npm install
```

This will install all dependencies for all applications in the monorepo.

### 2. Environment Variables

Each application requires its own environment configuration. Copy the `.env.example` file to `.env` in each app directory:

```bash
# Cardify
cd apps/cardify
cp .env.example .env
# Edit .env with your database credentials and other settings

# QR Studio Web
cd ../qrstudio-web
cp .env.example .env

# QR Studio API
cd ../qrstudio-api
cp .env.example .env

# Plaqode Web
cd ../plaqode-web
cp .env.example .env

# Plaqode Auth
cd ../plaqode-auth
cp .env.example .env
```

See [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md) for detailed configuration.

### 3. Database Setup

For applications using Prisma (Cardify, QR Studio API, Plaqode Auth):

```bash
# Cardify
cd apps/cardify
npx prisma generate
npx prisma migrate dev

# QR Studio API
cd ../qrstudio-api
npx prisma generate
npx prisma migrate dev

# Plaqode Auth
cd ../plaqode-auth
npx prisma generate
npx prisma migrate dev
```

### 4. Generate JWT Keys (for Auth Services)

```bash
# QR Studio API
cd apps/qrstudio-api
npm run keys:generate

# Plaqode Auth
cd ../plaqode-auth
npm run keys:generate
```

## Running Services

### Run All Services Concurrently

From the root directory:

```bash
npm run dev
```

This will start all 5 applications using Turborepo.

### Run Individual Services

```bash
# Cardify (port 3002)
npm run cardify:dev

# QR Studio Web (port 3001)
npm run qrstudio-web:dev

# QR Studio API (port 4001)
npm run qrstudio-api:dev

# Plaqode Web (port 3000)
npm run plaqode-web:dev

# Plaqode Auth (port 4000)
npm run plaqode-auth:dev
```

### Run Services Manually

You can also navigate to each app directory and run directly:

```bash
cd apps/cardify
npm run dev
```

## Service URLs

Once running, access the services at:

| Service | URL | Description |
|---------|-----|-------------|
| Plaqode Web | http://localhost:3000 | Main platform frontend |
| QR Studio Web | http://localhost:3001 | QR Studio frontend |
| Cardify | http://localhost:3002 | Cardify application |
| Plaqode Auth | http://localhost:4000 | Authentication API |
| QR Studio API | http://localhost:4001 | QR Studio backend API |

## Building for Production

### Build All Applications

```bash
npm run build
```

### Build Individual Applications

```bash
npm run build --workspace=apps/cardify
npm run build --workspace=apps/qrstudio-web
# etc.
```

## Common Tasks

### Linting

```bash
# Lint all apps
npm run lint

# Lint specific app
npm run lint --workspace=apps/cardify
```

### Database Management

```bash
# Run Prisma Studio (database GUI)
cd apps/cardify
npx prisma studio

# Create new migration
cd apps/plaqode-auth
npx prisma migrate dev --name your_migration_name

# Seed database
cd apps/qrstudio-api
npm run seed
```

### Clean Build Artifacts

```bash
npm run clean
```

## Troubleshooting

### Port Already in Use

If you get a port conflict error, check if another process is using the port:

```bash
# Windows
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <process_id> /F
```

### Database Connection Errors

1. Ensure PostgreSQL is running
2. Check your `.env` file has correct database credentials
3. Verify database exists: `psql -U postgres -l`
4. Run migrations: `npx prisma migrate dev`

### Module Not Found Errors

```bash
# Clear all node_modules and reinstall
rm -rf node_modules apps/*/node_modules packages/*/node_modules
npm install
```

### Prisma Client Errors

```bash
# Regenerate Prisma client
cd apps/[app-name]
npx prisma generate
```

## Development Workflow

1. **Start all services**: `npm run dev`
2. **Make changes** to your code
3. **Hot reload** will automatically refresh the app
4. **Test changes** in the browser
5. **Commit changes** when ready

## Next Steps

- Read [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md) for environment configuration
- See [PORT_ASSIGNMENTS.md](PORT_ASSIGNMENTS.md) for port details
- Check individual app READMEs for app-specific documentation

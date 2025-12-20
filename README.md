# Plaqode Platform Monorepo

Unified monorepo containing all Plaqode platform services and applications.

## 🏗️ Architecture

This monorepo contains 5 applications:

### Applications

- **Cardify** (`apps/cardify`) - QR code and card generation platform
- **QR Studio Web** (`apps/qrstudio-web`) - QR Studio frontend application
- **QR Studio API** (`apps/qrstudio-api`) - QR Studio backend service
- **Plaqode Web** (`apps/plaqode-web`) - Main platform frontend
- **Plaqode Auth** (`apps/plaqode-auth`) - Central authentication service

### Shared Packages

- **TypeScript Config** (`packages/typescript-config`) - Shared TypeScript configurations
- **ESLint Config** (`packages/eslint-config`) - Shared linting rules

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
# Install all dependencies
npm install
```

### Development

```bash
# Run all services concurrently
npm run dev

# Run individual services
npm run cardify:dev
npm run qrstudio-web:dev
npm run qrstudio-api:dev
npm run plaqode-web:dev
npm run plaqode-auth:dev
```

### Build

```bash
# Build all applications
npm run build

# Lint all applications
npm run lint
```

## 🌐 Port Assignments

| Application | Port | URL |
|------------|------|-----|
| Plaqode Web | 3000 | http://localhost:3000 |
| QR Studio Web | 3001 | http://localhost:3001 |
| Cardify | 3002 | http://localhost:3002 |
| Plaqode Auth | 4000 | http://localhost:4000 |
| QR Studio API | 4001 | http://localhost:4001 |

## 📝 Environment Setup

Each application requires its own environment variables. Copy `.env.example` to `.env` in each app directory:

```bash
# For each app
cd apps/[app-name]
cp .env.example .env
# Edit .env with your values
```

See `docs/ENVIRONMENT_SETUP.md` for detailed configuration.

## 📚 Documentation

- [Startup Guide](docs/STARTUP_GUIDE.md) - Detailed setup instructions
- [Environment Setup](docs/ENVIRONMENT_SETUP.md) - Environment variable configuration
- [Port Assignments](docs/PORT_ASSIGNMENTS.md) - Service port mappings
- [Migration Notes](MIGRATION_NOTES.md) - Migration history and details

## 🛠️ Technology Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Fastify, Node.js
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: JWT, bcrypt
- **Build Tool**: Turborepo
- **Package Manager**: npm workspaces

## 📦 Project Structure

```
plaqode-platform/
├── apps/
│   ├── cardify/          # QR/Card generation app
│   ├── qrstudio-web/     # QR Studio frontend
│   ├── qrstudio-api/     # QR Studio backend
│   ├── plaqode-web/      # Platform frontend
│   └── plaqode-auth/     # Auth service
├── packages/
│   ├── typescript-config/
│   └── eslint-config/
└── docs/
```

## 🤝 Contributing

This is a monorepo managed with Turborepo and npm workspaces. When adding dependencies:

```bash
# Add to root
npm install <package> -w root

# Add to specific app
npm install <package> -w apps/[app-name]
```

## 📄 License

ISC

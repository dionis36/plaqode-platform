# Port Assignments

This document lists all port assignments for services in the Plaqode Platform monorepo.

## Port Overview

| Application | Port | Protocol | Type | Status |
|------------|------|----------|------|--------|
| **Plaqode Web** | 3000 | HTTP | Frontend | Active |
| **QR Studio Web** | 3001 | HTTP | Frontend | Active |
| **Cardify** | 3002 | HTTP | Frontend | Active |
| **Plaqode Auth** | 4000 | HTTP | Backend API | Active |
| **QR Studio API** | 4001 | HTTP | Backend API | Active |

## Frontend Applications (3000-3002)

### Plaqode Web - Port 3000
- **URL**: http://localhost:3000
- **Type**: Next.js Application
- **Purpose**: Main platform frontend
- **Dependencies**: Plaqode Auth (4000)

### QR Studio Web - Port 3001
- **URL**: http://localhost:3001
- **Type**: Next.js Application
- **Purpose**: QR Studio frontend interface
- **Dependencies**: QR Studio API (4001)

### Cardify - Port 3002
- **URL**: http://localhost:3002
- **Type**: Next.js Application
- **Purpose**: QR code and card generation platform
- **Dependencies**: Own PostgreSQL database

## Backend Services (4000-4001)

### Plaqode Auth - Port 4000
- **URL**: http://localhost:4000
- **Type**: Fastify API
- **Purpose**: Central authentication service
- **Endpoints**:
  - `POST /auth/register` - User registration
  - `POST /auth/login` - User login
  - `POST /auth/refresh` - Refresh access token
  - `POST /auth/logout` - User logout
  - `GET /auth/me` - Get current user
- **Database**: PostgreSQL (plaqode_auth_db)

### QR Studio API - Port 4001
- **URL**: http://localhost:4001
- **Type**: Fastify API (or similar)
- **Purpose**: QR Studio backend service
- **Endpoints**: QR generation, management, analytics
- **Database**: PostgreSQL (qrstudio_db)

## Port Configuration

### Changing Ports

If you need to change a port, update the following files:

#### Frontend Apps (Next.js)

Edit `package.json` in the app directory:

```json
{
  "scripts": {
    "dev": "next dev -p YOUR_NEW_PORT",
    "start": "next start -p YOUR_NEW_PORT"
  }
}
```

#### Backend Services

Edit the `.env` file in the app directory:

```env
PORT=YOUR_NEW_PORT
```

### CORS Configuration

If you change frontend ports, update CORS settings in backend services:

**Plaqode Auth** (`apps/plaqode-auth/.env`):
```env
CORS_ORIGIN="http://localhost:3000,http://localhost:3001,http://localhost:3002"
```

**QR Studio API** (`apps/qrstudio-api/.env`):
```env
CORS_ORIGIN="http://localhost:3001"
```

## Port Conflicts

### Checking Port Usage

**Windows:**
```bash
netstat -ano | findstr :3000
```

**Linux/Mac:**
```bash
lsof -i :3000
```

### Killing Processes

**Windows:**
```bash
taskkill /PID <process_id> /F
```

**Linux/Mac:**
```bash
kill -9 <process_id>
```

## Reserved Ports

The following ports are reserved for future services:

- **3003-3009**: Reserved for additional frontend apps
- **4002-4009**: Reserved for additional backend services
- **5432**: PostgreSQL default port
- **6379**: Redis (if needed in future)

## Development vs Production

### Development
- All services run on localhost
- HTTP protocol
- Ports as listed above

### Production
- Services may run on different hosts
- HTTPS protocol (443)
- Reverse proxy (Nginx/Caddy) handles routing
- Internal services may use different ports

## Service Dependencies

```
┌─────────────────┐
│  Plaqode Web    │──────┐
│  (Port 3000)    │      │
└─────────────────┘      │
                         ▼
┌─────────────────┐  ┌──────────────────┐
│ QR Studio Web   │  │  Plaqode Auth    │
│  (Port 3001)    │  │  (Port 4000)     │
└─────────────────┘  └──────────────────┘
         │
         ▼
┌─────────────────┐
│ QR Studio API   │
│  (Port 4001)    │
└─────────────────┘

┌─────────────────┐
│    Cardify      │  (Standalone)
│  (Port 3002)    │
└─────────────────┘
```

## Quick Reference

```bash
# Start all services
npm run dev

# Access services
open http://localhost:3000  # Plaqode Web
open http://localhost:3001  # QR Studio Web
open http://localhost:3002  # Cardify

# API endpoints
curl http://localhost:4000/health  # Plaqode Auth
curl http://localhost:4001/health  # QR Studio API
```

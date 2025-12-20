# Platform Web

Next.js platform for Plaqode - unified dashboard for Cardify and QR Studio.

## Features

- **Public Pages**: Landing page with Plaqode branding
- **Authentication**: Login/signup with JWT cookies
- **User Dashboard**: Product overview and access management
- **Admin Panel**: User management (admin-only)
- **Role-based Access**: Public, User, and Admin levels

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

3. Run development server:
```bash
npm run dev
```

The app will run on: **http://localhost:3000**

## Structure

- `/` - Public landing page
- `/auth/login` - Login page
- `/app` - User dashboard (protected)
- `/app/admin` - Admin panel (admin-only)

## Authentication Levels

- **Public**: Anyone can access (/, /about, /services)
- **User**: Requires login (/app, /app/cardify, /app/qrstudio)
- **Admin**: Requires admin role (/app/admin)

## Integration

The platform integrates with:
- **Auth Service** (port 3001) - JWT authentication
- **Cardify** (port 3002) - Business card creator
- **QR Studio** (port 3004) - QR code generator

# Auth Service

Central authentication service for the Plaqode Platform.

## Features

- JWT-based authentication (RS256)
- User registration and login
- Role-based access control
- Product access management
- Refresh token rotation
- httpOnly cookie-based sessions

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Generate RSA keys:
```bash
npm run keys:generate
```

4. Set up database:
```bash
npm run prisma:migrate
```

5. Run development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user

### Admin
- `GET /auth/users` - List all users (admin only)
- `POST /auth/users/:id/roles` - Assign role (admin only)
- `POST /auth/users/:id/products` - Grant product access (admin only)

### Public
- `GET /auth/public-key` - Get JWT public key

## Environment Variables

See `.env.example` for all available configuration options.

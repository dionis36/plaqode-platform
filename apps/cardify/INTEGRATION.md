# Cardify Integration Documentation

## Overview

Cardify has been successfully integrated with the Plaqode Platform authentication system.

## Changes Made

### Cardify (Port 3002)

#### Files Created:
1. **`lib/auth-context.tsx`** - Authentication context with SSO
2. **`components/auth/AuthGuard.tsx`** - Loading state and access check
3. **`components/layout/UserHeader.tsx`** - User info and back to platform link

#### Files Modified:
1. **`package.json`** - Changed port to 3002
2. **`app/layout.tsx`** - Wrapped with AuthProvider, AuthGuard, and UserHeader
3. **`.env.example`** - Added platform integration variables

#### Environment Variables Required:
```env
# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3002

# Platform Integration
NEXT_PUBLIC_PLATFORM_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:3001

# Database (existing)
DATABASE_URL=postgresql://...
```

### Platform-Web (Port 3000)

#### Environment Variables Added:
```env
NEXT_PUBLIC_CARDIFY_URL=http://localhost:3002
```

## How It Works

### Authentication Flow:
1. User clicks "Launch Cardify" from platform dashboard
2. Opens Cardify at `http://localhost:3002`
3. Cardify checks authentication via `/auth/me` endpoint
4. If not authenticated → Redirects to platform login
5. If no Cardify access → Redirects to platform with error
6. If authenticated with access → Shows Cardify app

### Access Control:
- Only users with `cardify` product can access Cardify
- Authentication is checked on every page load
- Cookies are shared between platform (3000) and Cardify (3002)

## Running Locally

### Start All Services:

```bash
# Terminal 1 - Auth Service
cd auth-service
npm run dev
# Runs on http://localhost:3001

# Terminal 2 - Platform Web
cd platform-web
npm run dev
# Runs on http://localhost:3000

# Terminal 3 - Cardify
cd cardify-5
npm run dev
# Runs on http://localhost:3002
```

### Access Flow:
1. Go to `http://localhost:3000`
2. Login with credentials
3. Click "Launch Cardify" from dashboard
4. Cardify opens in new tab/window

## Testing

### Test Scenarios:

**1. No Authentication:**
- Open `http://localhost:3002` directly
- Should redirect to `http://localhost:3000/auth/login`

**2. No Cardify Access:**
- Login as user without Cardify product
- Try to access Cardify
- Should redirect to platform with error message

**3. With Cardify Access:**
- Login as user with Cardify product (e.g., admin@plaqode.com)
- Click "Launch Cardify"
- Should open Cardify and work normally

**4. Existing Functionality:**
- All Cardify features work as before
- Templates, editor, export all functional

## Troubleshooting

### Issue: Cardify redirects to login even when logged in
**Solution:** Check that `COOKIE_DOMAIN=localhost` in auth-service `.env`

### Issue: "No Cardify access" error
**Solution:** Grant Cardify product access via admin panel

### Issue: Port 3002 already in use
**Solution:** Stop other services on port 3002 or change port in `package.json`

## Security Notes

- Cookies are httpOnly and secure
- Product access is verified on every request
- No breaking changes to existing Cardify functionality
- All authentication handled by platform auth-service

## Next Steps

- Test all features thoroughly
- Deploy to staging/production
- Update production environment variables
- Monitor for any issues

---

**Integration completed successfully!** ✅

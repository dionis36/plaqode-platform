# Deployment Notes & Environment Configuration

This guide details the specific environment variables required for **Development (Localhost)** vs **Production (Vercel/Fly.io)**.

> [!IMPORTANT]
> **Source of Truth**: These variables have been audited against the codebase (`src/lib/env.ts` and usage).
> **Consistency**: Ensure URLs match exactly (no trailing slashes, correct HTTPS).

## 1. Frontend Applications (Vercel)

### A. Plaqode Web (`apps/plaqode-web`)
**Port**: `3000`

| Variable Name | Localhost Value | Production Value (Reference) | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://plaqode-platform-plaqode-web.vercel.app` | Main Platform URL. |
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | `http://localhost:3001` | `https://plaqode-auth-v1.fly.dev` | Auth API. |
| `NEXT_PUBLIC_QRSTUDIO_API_URL` | `http://localhost:3005` | `https://plaqode-api-v1.fly.dev` | QR Backend API. |
| `NEXT_PUBLIC_QRSTUDIO_URL` | `http://localhost:3001` | `https://plaqode-platform-qrstudio-web.vercel.app` | Creator App URL. |
| `NEXT_PUBLIC_CARDIFY_URL` | `http://localhost:3002` | `https://plaqode-platform-cardify.vercel.app` | Cardify App URL. |
| `AUTH_SERVICE_INTERNAL_URL` | `http://localhost:3001` | `https://plaqode-auth-v1.fly.dev` | Server-to-Server Auth URL. |
| `NEXT_PUBLIC_ALLOWED_REDIRECT_HOSTS` | `localhost:3000,localhost:3001,localhost:3002` | `plaqode-platform-plaqode-web.vercel.app, plaqode-platform-cardify.vercel.app, plaqode-platform-qrstudio-web.vercel.app` | Security Allowlist. |
| `COOKIE_DOMAIN` | `localhost` | `.vercel.app` (or custom `.plaqode.com`) | **Critical**: Must start with dot for subdomains. |
| `RESEND_API_KEY` | `re_...` | `re_...` (Your Real Key) | Contact Form Email. |
| `NEXT_PUBLIC_GA_ID` | `""` | `""` | Google Analytics (Optional). |

### B. Creator App (`apps/qrstudio-web`)
**Port**: `3001`

| Variable Name | Localhost Value | Production Value (Reference) | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_QRSTUDIO_URL` | `http://localhost:3001` | `https://plaqode-platform-qrstudio-web.vercel.app` | This App URL. |
| `NEXT_PUBLIC_PLATFORM_URL` | `http://localhost:3000` | `https://plaqode-platform-plaqode-web.vercel.app` | Main Platform Link. |
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | `http://localhost:3003` | `https://plaqode-auth-v1.fly.dev` | Auth API. |
| `NEXT_PUBLIC_QRSTUDIO_API_URL` | `http://localhost:3005` | `https://plaqode-api-v1.fly.dev` | QR Backend API. |
| `NEXT_PUBLIC_GA_ID` | `""` | `""` | Google Analytics. |

### C. Cardify (`apps/cardify`)
**Port**: `3002`

> [!WARNING]
> **URL Consistency Flag**: Your config used `plaqode.com` for `NEXT_PUBLIC_APP_URL` but `vercel.app` elsewhere. The table below uses `vercel.app` to match the other apps for consistency, assuming no custom domain is active yet. If you HAVE set up `cardify.plaqode.com`, use that instead.

| Variable Name | Localhost Value | Production Value (Reference) | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3002` | `https://plaqode-platform-cardify.vercel.app` | This App URL. |
| `NEXT_PUBLIC_PLATFORM_URL` | `http://localhost:3000` | `https://plaqode-platform-plaqode-web.vercel.app` | Main Platform Link. |
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | `http://localhost:3003` | `https://plaqode-auth-v1.fly.dev` | Auth API. |
| `DATABASE_URL` | `postgresql://...` | `postgresql://...` (Neon DB) | **Critical**: Required for Build. |
| `JWT_SECRET` | `secret` | `temp_secret_123` | Session Encryption. |

---

## 2. Backend Services (Fly.io)

### A. Auth Service (`apps/plaqode-auth`)
**Service**: `plaqode-auth-v1`

| Variable Name | Localhost Value | Production Value | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | `3003` | `3003` | Internal Port. |
| `WEB_URL` | `http://localhost:3000` | `https://plaqode-platform-plaqode-web.vercel.app` | Redirect base for emails. |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | `https://plaqode-platform-plaqode-web.vercel.app,https://plaqode-platform-qrstudio-web.vercel.app` | CORS. |
| `COOKIE_DOMAIN` | `localhost` | `.vercel.app` | Session Cookie Domain. |
| `JWT_PRIVATE_KEY_PATH` | `./keys/private.pem` | `/etc/secrets/private.pem` | Auth Key. |
| `JWT_PUBLIC_KEY_PATH` | `./keys/public.pem` | `/etc/secrets/public.pem` | Auth Key. |

### B. QR Studio API (`apps/qrstudio-api`)
**Service**: `plaqode-api-v1`

| Variable Name | Localhost Value | Production Value | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | `3005` | `3005` | Internal Port. |
| `FRONTEND_URL` | `http://localhost:3001` | `https://plaqode-platform-qrstudio-web.vercel.app` | For redirects. |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | `https://plaqode-platform-plaqode-web.vercel.app,https://plaqode-platform-qrstudio-web.vercel.app` | CORS. |
| `JWT_PUBLIC_KEY` | *(Optional)* | `-----BEGIN PUBLIC KEY...` | Injected Key. |


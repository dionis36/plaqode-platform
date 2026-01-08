# Deployment Notes & Environment Configuration

This guide details the specific environment variables required for **Development (Localhost)** vs **Production (Vercel/Fly.io)**.

> [!IMPORTANT]
> **Source of Truth**: These variables have been audited against the codebase (`src/lib/env.ts` and usage).
> **Consistency**: Ensure URLs match exactly (no trailing slashes, correct HTTPS).

## 1. Frontend Applications (Vercel)

### A. Plaqode Web (`apps/plaqode-web`)
**Port**: `3000`

| Variable Name | Localhost Value | Production Value (Custom Domain) | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://plaqode.com` | Main Platform URL. |
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | `http://localhost:3001` | `https://auth.plaqode.com` | Auth API. |
| `NEXT_PUBLIC_QRSTUDIO_API_URL` | `http://localhost:3005` | `https://api.plaqode.com` | QR Backend API. |
| `NEXT_PUBLIC_QRSTUDIO_URL` | `http://localhost:3001` | `https://app.plaqode.com` | Creator App URL. |
| `NEXT_PUBLIC_CARDIFY_URL` | `http://localhost:3002` | `https://card.plaqode.com` | Cardify App URL. |
| `AUTH_SERVICE_INTERNAL_URL` | `http://localhost:3001` | `https://auth.plaqode.com` | Server-to-Server Auth URL. |
| `NEXT_PUBLIC_ALLOWED_REDIRECT_HOSTS` | `localhost:3000,localhost:3001,localhost:3002` | `plaqode.com, app.plaqode.com, card.plaqode.com` | Security Allowlist. |
| `COOKIE_DOMAIN` | `localhost` | `.plaqode.com` | **Critical**: Must start with dot. |
| `RESEND_API_KEY` | `re_...` | `re_...` (Your Real Key) | Contact Form Email. |
| `NEXT_PUBLIC_GA_ID` | `""` | `""` | Google Analytics (Optional). |
| `EMAIL_FROM` | `Plaqode <support@plaqode.com>` | `Plaqode <support@plaqode.com>` | **Verified** Sender identity. |
| `CONTACT_EMAIL_TO` | `nasuwadio36@gmail.com` | `nasuwadio36@gmail.com` | Admin inbox for contact form. |

### B. Creator App (`apps/qrstudio-web`)
**Port**: `3001`

| Variable Name | Localhost Value | Production Value (Custom Domain) | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_QRSTUDIO_URL` | `http://localhost:3001` | `https://app.plaqode.com` | This App URL. |
| `NEXT_PUBLIC_PLATFORM_URL` | `http://localhost:3000` | `https://plaqode.com` | Main Platform Link. |
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | `http://localhost:3003` | `https://auth.plaqode.com` | Auth API. |
| `NEXT_PUBLIC_QRSTUDIO_API_URL` | `http://localhost:3005` | `https://api.plaqode.com` | QR Backend API. |
| `NEXT_PUBLIC_GA_ID` | `""` | `""` | Google Analytics. |

### C. Cardify (`apps/cardify`)
**Port**: `3002`

| Variable Name | Localhost Value | Production Value (Custom Domain) | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3002` | `https://card.plaqode.com` | This App URL. |
| `NEXT_PUBLIC_PLATFORM_URL` | `http://localhost:3000` | `https://plaqode.com` | Main Platform Link. |
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | `http://localhost:3003` | `https://auth.plaqode.com` | Auth API. |
| `DATABASE_URL` | `postgresql://...` | `postgresql://...` (Neon DB) | **Critical**: Required for Build. |
| `JWT_SECRET` | `secret` | `temp_secret_123` | Session Encryption. |

---

## 2. Backend Services (Fly.io)

### A. Auth Service (`apps/plaqode-auth`)
**Service**: `plaqode-auth-v1`

| Variable Name | Localhost Value | Production Value | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | `3003` | `3003` | Internal Port. |
| `WEB_URL` | `http://localhost:3000` | `https://plaqode.com` | Redirect base for emails. |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | `https://plaqode.com,https://app.plaqode.com,https://www.plaqode.com` | CORS. |
| `COOKIE_DOMAIN` | `localhost` | `.plaqode.com` | Session Cookie Domain. |
| `JWT_PRIVATE_KEY_PATH` | `./keys/private.pem` | `/etc/secrets/private.pem` | Auth Key. |
| `JWT_PUBLIC_KEY_PATH` | `./keys/public.pem` | `/etc/secrets/public.pem` | Auth Key. |
| `RESEND_API_KEY` | `re_...` | `re_...` (Set via Secrets) | Email Service Key. |
| `EMAIL_FROM` | `Plaqode <support@plaqode.com>` | `Plaqode <support@plaqode.com>` | **Verified** Sender identity. |

### B. QR Studio API (`apps/qrstudio-api`)
**Service**: `plaqode-api-v1`

| Variable Name | Localhost Value | Production Value | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | `3005` | `3005` | Internal Port. |
| `FRONTEND_URL` | `http://localhost:3001` | `https://app.plaqode.com` | For redirects. |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | `https://plaqode.com,https://app.plaqode.com,https://www.plaqode.com` | CORS. |
| `JWT_PUBLIC_KEY` | *(Optional)* | `-----BEGIN PUBLIC KEY...` | Injected Key. |

## 3. Deployment Commands

### Update Fly.io Secrets (Auth Service)
Run this command to update the email configuration for the backend:
```powershell
fly secrets set RESEND_API_KEY="re_..." EMAIL_FROM="Plaqode <support@plaqode.com>" -a plaqode-auth-v1
```

### Update Vercel Environment Variables
Go to **Project Settings** > **Environment Variables** for `plaqode-web` and add:
- `EMAIL_FROM`: `Plaqode <support@plaqode.com>`
- `CONTACT_EMAIL_TO`: `nasuwadio36@gmail.com`
- `RESEND_API_KEY`: `re_...` (If not already set)


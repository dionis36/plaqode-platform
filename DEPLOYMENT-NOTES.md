# Deployment Notes & Environment Configuration

This guide details the specific environment variables and configurations required when moving from a **Local Environment** to **Production** (Vercel, Railway, etc.).

> [!IMPORTANT]
> **Security First**: Never check in `.env` files. Use your hosting provider's Secrets Management.

## 1. Global Security Requirements

### Keys Management (Critical)
The authentication system uses RSA keys (Private/Public) for signing JWTs.
-   **Local**: Keys are stored in `file system` at `./keys/`.
-   **Production**: You **MUST** inject these keys via Environment Variables or a mounted secure volume.
    -   **`plaqode-auth`**: Needs `JWT_PRIVATE_KEY_PATH` (or inject content directly/base64 encoded if code supports it - currently code expects a PATH).
    -   **Recommendation**: In Docker/Railway, mount the keys as secret files and point the `_PATH` env vars to them `/etc/secrets/private.pem`.

### CORS & Cookies
-   **Cookies**: We use `httpOnly` cookies. In production, `DOMAIN` must be set to `.plaqode.com` to share cookies between `api.plaqode.com` and `plaqode.com`.
-   **CORS**: `ALLOWED_ORIGINS` must include all your frontend domains.

---

## 2. Frontend (`apps/plaqode-web`)
**Type**: Next.js App
**Deployment**: Vercel (Recommended)

| Variable Name | Local Value | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://plaqode.com` | Main URL. |
| `NEXT_PUBLIC_QRSTUDIO_API_URL` | `http://localhost:3005` | `https://api.plaqode.com` | Backend API URL for rewrites and data. |
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | `http://localhost:3001` | `https://auth.plaqode.com` | Auth Service URL. |
| `NEXT_PUBLIC_ALLOWED_REDIRECT_HOSTS` | *(Optional)* | `another-app.plaqode.com` | Comma-separated list of extra domains allowed for login redirects. |
| `NEXT_PUBLIC_GA_ID` | `""` | `G-XXXXXXXX` | Google Analytics ID. |

### Configuration Notes
-   **Redirects**: `lib/auth-context.tsx` checks allowed hosts. By default, `plaqode.com`, `create.plaqode.com`, and `cardify.plaqode.com` are allowed. Use `NEXT_PUBLIC_ALLOWED_REDIRECT_HOSTS` to add more.

---

## 3. Backend API (`apps/qrstudio-api`)
**Type**: Node.js / Fastify
**Deployment**: Railway / Render (Docker)

| Variable Name | Local Value | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `HOST` | `0.0.0.0` | `0.0.0.0` | Binding address. |
| `PORT` | `3005` | `3005` | Service port. |
| `FRONTEND_URL` | `http://localhost:3000` | `https://plaqode.com` | Redirect destination for scanned QRs. |
| `DATABASE_URL` | `postgresql://...` | `postgresql://...` | DB Connection string. |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | `https://plaqode.com,https://create.plaqode.com` | CORS allowed origins. |

---

## 4. Auth Service (`apps/plaqode-auth`)
**Type**: Node.js / Fastify
**Deployment**: Railway / Render (Docker)

| Variable Name | Local Value | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `HOST` | `0.0.0.0` | `0.0.0.0` | Binding address. |
| `PORT` | `3001` | `3001` | Service port. |
| `DATABASE_URL` | `postgresql://...` | `postgresql://...` | DB Connection string. |
| `JWT_PRIVATE_KEY_PATH` | `./keys/private.pem` | `/etc/secrets/private.pem` | **CRITICAL**: Path to private key file. |
| `JWT_PUBLIC_KEY_PATH` | `./keys/public.pem` | `/etc/secrets/public.pem` | **CRITICAL**: Path to public key file. |
| `COOKIE_DOMAIN` | *(undefined)* | `.plaqode.com` | **CRITICAL**: Root domain for cookie sharing. |
| `COOKIE_SECURE` | `false` | `true` | Must be true for HTTPS. |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | `https://plaqode.com,https://create.plaqode.com` | CORS allowed origins. |
| `RESEND_API_KEY` | `re_...` | `re_...` | Email service key. |
| `WEB_URL` | `http://localhost:3000` | `https://plaqode.com` | Used in email links. |

---

## 5. Creator App (`apps/qrstudio-web`)
**Type**: Next.js App
**Deployment**: Vercel

| Variable Name | Local Value | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3003` | `https://create.plaqode.com` | App URL. |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3005` | `https://api.plaqode.com` | Backend API URL. |

---

## 6. Pre-Flight Checklist
- [ ] **Keys**: Securely upload `private.pem` and `public.pem` to your hosting provider (Secrets/Mounts).
- [ ] **Database**: Run `prisma migrate deploy` on production DB.
- [ ] **DNS**: Map all subdomains (`api`, `auth`, `create`, `cardify`) in your DNS provider.
- [ ] **CORS**: Verify `ALLOWED_ORIGINS` covers all your frontend domains.
- [ ] **Cookies**: Verify `COOKIE_DOMAIN` is set to `.plaqode.com` (note the dot).


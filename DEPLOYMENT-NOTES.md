# Deployment Notes & Environment Configuration

This guide details the specific environment variables and configurations required when moving from a **Local Environment** to **Production** (Vercel, Fly.io, Railway, etc.).

> [!IMPORTANT]
> **Source of Truth**: This document reflects the *actual* code defaults found in the repository.
> **Security**: Never check in `.env` files. Use your hosting provider's Secrets Management.

## 1. Global Security & Keys
**Critical**: The authentication system uses RSA keys.
-   **Local**: Keys are stored at `./keys/`.
-   **Production**: You **MUST** inject these via Environment Variables or volume mounts.

## 2. Frontend Applications

> [!TIP]
> **Chicken & Egg Problem**: Since you haven't deployed the backend yet, the frontend won't have a real API to talk to.
> Use these **Bootstrap Values** for your *very first* deploy to Vercel just to get the build green.
>
> | Variable Name | Initial Bootstrap Value |
> | :--- | :--- |
> | `NEXT_PUBLIC_APP_URL` | `https://project-name.vercel.app` (Your Vercel URL) |
> | `NEXT_PUBLIC_QRSTUDIO_API_URL` | `https://temp.fly.dev` |
> | `NEXT_PUBLIC_AUTH_SERVICE_URL` | `https://temp.fly.dev` |
> | `NEXT_PUBLIC_CARDIFY_URL` | `https://cardify-temp.vercel.app` |
> | `NEXT_PUBLIC_QRSTUDIO_URL` | `https://qrstudio-temp.vercel.app` |
> | `AUTH_SERVICE_INTERNAL_URL` | `https://temp.fly.dev` |
> | `COOKIE_DOMAIN` | `.vercel.app` |
> | `NEXT_PUBLIC_ALLOWED_REDIRECT_HOSTS` | `plaqode.vercel.app,cardify.vercel.app` |

### A. Plaqode Web (`apps/plaqode-web`)
**Port**: `3000`
**Deployment**: Vercel

| Variable Name | Local Value | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://plaqode.com` | Main URL. |
| `NEXT_PUBLIC_QRSTUDIO_API_URL` | `http://localhost:3005` | `https://api.plaqode.com` | Backend API URL. |
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | `http://localhost:3001` | `https://auth.plaqode.com` | Auth Service URL (Frontend fetch). |
| `NEXT_PUBLIC_CARDIFY_URL` | `http://localhost:3002` | `https://cardify.plaqode.com` | Link to Cardify App. |
| `NEXT_PUBLIC_QRSTUDIO_URL` | `http://localhost:3001` | `https://create.plaqode.com` | Link to Creator App. |
| `AUTH_SERVICE_INTERNAL_URL` | `http://localhost:3001` | `http://plaqode-auth.internal:3003` | Server-side API calls (Docker/Internal). |
| `COOKIE_DOMAIN` | `localhost` | `.plaqode.com` | Root domain for cookie sharing. |
| `NEXT_PUBLIC_GA_ID` | `""` | `G-XXXXXXXX` | Google Analytics ID. |
| `NEXT_PUBLIC_ALLOWED_REDIRECT_HOSTS` | *(Optional)* | `another.plaqode.com` | Extra allowed redirect domains. |
| `RESEND_API_KEY` | `re_...` | `re_...` | For server-side contact form. |

### B. Creator App (`apps/qrstudio-web`)
**Port**: `3001`
**Deployment**: Vercel

| Variable Name | Local Value | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3001` | `https://create.plaqode.com` | App URL. |
| `NEXT_PUBLIC_PLATFORM_URL` | `http://localhost:3000` | `https://plaqode.com` | Link back to main platform. |
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | `http://localhost:3003` | `https://auth.plaqode.com` | Auth Service URL. |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3005` | `https://api.plaqode.com` | Backend QR API URL. |

### C. Cardify (`apps/cardify`)
**Port**: `3002`
**Deployment**: Vercel

| Variable Name | Local Value | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3002` | `https://cardify.plaqode.com` | App URL. |
| `NEXT_PUBLIC_PLATFORM_URL` | `http://localhost:3000` | `https://plaqode.com` | Link back to main platform. |
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | `http://localhost:3003` | `https://auth.plaqode.com` | Auth Service URL. |
| `DATABASE_URL` | `postgresql://...` | `postgresql://...` | DB Connection. |
| `PEXELS_API_KEY` | *(Optional)* | `563492...` | For Image Stock Search. |
| `JWT_SECRET` | `secret` | `complex_string` | Session validation. |

---

## 3. Backend Services

### A. Auth Service (`apps/plaqode-auth`)
**Port**: `3003` (Default in code) or `4000` (Suggested in Docs)
**Deployment**: Fly.io / Railway

| Variable Name | Local Value | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | `3003` | `3003` | Service port. |
| `DATABASE_URL` | `postgresql://...` | `postgresql://...` | DB Connection. |
| `JWT_PRIVATE_KEY_PATH` | `./keys/private.pem` | `/etc/secrets/private.pem` | **CRITICAL**: Private Key. |
| `JWT_PUBLIC_KEY_PATH` | `./keys/public.pem` | `/etc/secrets/public.pem` | **CRITICAL**: Public Key. |
| `COOKIE_DOMAIN` | `.plaqode.com` | `.plaqode.com` | Cookie Domain (must start with dot). |
| `COOKIE_SECURE` | `false` | `true` | Must be true for HTTPS. |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | `https://plaqode.com,https://create.plaqode.com` | CORS Whitelist. |
| `RESEND_API_KEY` | `re_...` | `re_...` | Email sending key. |
| `WEB_URL` | `http://localhost:3000` | `https://plaqode.com` | Base URL for email links. |
| `EMAIL_FROM` | `onboarding@resend.dev` | `noreply@plaqode.com` | Sender address. |
| `RATE_LIMIT_MAX` | `100` | `1000` | Requests per window. |

### B. QR Studio API (`apps/qrstudio-api`)
**Port**: `3005` (Default in dev script) or `4001` (Suggested in Docs)
**Deployment**: Fly.io / Railway

| Variable Name | Local Value | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | `3005` | `3005` | Service port. |
| `DATABASE_URL` | `postgresql://...` | `postgresql://...` | DB Connection. |
| `JWT_PUBLIC_KEY_PATH` | `./keys/public.pem` | `/etc/secrets/public.pem` | For validating tokens. |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | `https://plaqode.com,https://create.plaqode.com` | CORS Whitelist. |

---

## 4. Pre-Flight Checklist
- [ ] **Review Ports**: Ensure your Production Environment variables (`PORT`) match what you expose in your `Dockerfile` or Cloud Config.
- [ ] **Generate Keys**: Use `openssl` to generate fresh RSA keys for production.
- [ ] **Set Origins**: Double check `ALLOWED_ORIGINS` includes *all* your Vercel domains.

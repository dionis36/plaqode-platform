# Deployment Notes & Environment Configuration

This guide details the specific environment variables and configurations required when moving from a **Local Environment** to **Production** (Vercel, Railway, etc.).

## 1. Frontend (`apps/plaqode-web`)
**Deployment Platform:** Vercel (Recommended)

| Variable Name | Local Value (`.env.local`) | Production Value (Vercel Settings) | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://plaqode.com` | **CRITICAL:** Used to generate the visible QR code links (e.g., `plaqode.com/r/abc`). Must match `FRONTEND_URL` in backend. |
| `NEXT_PUBLIC_QRSTUDIO_API_URL` | `http://localhost:3005` | `https://api.plaqode.com` | Used by the Frontend to talk to the API and for URL rewrites. |

### Configuration Files
-   **`next.config.mjs`**: Contains a `rewrite` rule that proxies `/q/:path*` to `NEXT_PUBLIC_QRSTUDIO_API_URL`.
    -   *No changes needed if Env Vars are set correctly.*
-   **`app/app/qrcodes/[id]/page.tsx`**: Generates the display link.
    -   *Automatically uses `NEXT_PUBLIC_APP_URL`.*

---

## 2. Backend (`apps/qrstudio-api`)
**Deployment Platform:** Railway / Render / DigitalOcean (Node.js Service)

| Variable Name | Local Value (`.env`) | Production Value (Cloud Settings) | Description |
| :--- | :--- | :--- | :--- |
| `HOST` | `0.0.0.0` | `0.0.0.0` | Binding address (required for most cloud containers). |
| `PORT` | `3005` | `3005` (or provided by host) | The port the API listens on. |
| `FRONTEND_URL` | `http://localhost:3000` | `https://plaqode.com` | **CRITICAL:** Points to the MAIN APP (plaqode-web). The API redirects scanned users here (e.g., `https://plaqode.com/r/abc`). |
| `DATABASE_URL` | `postgresql://...` | `postgresql://...` | Connection string to your Production Database (Supabase/Neon/Railway). |

### Important Backend Notes
1.  **Geolocation**: Ensure your hosting provider allows outbound requests (for `geoip-lite` updates) if applicable, though the library is mostly offline.
2.  **Proxy Headers**: If behind a load balancer (like common cloud setups), ensure your server trusts `X-Forwarded-For` headers so correct IPs are logged.
    -   *If you see all IPs as 127.0.0.1 or ::1, you need to configure Fastify `trustProxy: true`.*

## 3. Deployment Checklist
- [ ] **Database**: Run `prisma migrate deploy` on your production database (for both `qrstudio-api` and `plaqode-auth` if they share valid schemas, otherwise run for each service).
- [ ] **Frontend**: Add `plaqode.com` to your Vercel Domains.
- [ ] **Backend (API)**: Map `api.plaqode.com` to your backend service.
- [ ] **Auth Service**: Map `auth.plaqode.com` (or similar internal URL) and ensure `plaqode-web` can reach it via `NEXT_PUBLIC_AUTH_SERVICE_URL`.
- [ ] **DNS**:
    -   `plaqode.com` -> Vercel IP
    -   `api.plaqode.com` -> Backend Service IP/CNAME

---

## 4. Creator App (`apps/qrstudio-web`)
**Deployment Platform:** Vercel (Recommended) - Separate Project

| Variable Name | Local Value (`.env.local`) | Production Value (Vercel Settings) | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3001` | `https://create.plaqode.com` (or similar) | The URL of this creator app itself. |

---

## 5. Auth Service (`apps/plaqode-auth`)
**Deployment Platform:** Railway / Render / DigitalOcean (Node.js Service)

| Variable Name | Local Value (`.env`) | Production Value (Cloud Settings) | Description |
| :--- | :--- | :--- | :--- |
| `HOST` | `0.0.0.0` | `0.0.0.0` | Binding address. |
| `PORT` | `3001` | `3001` (or provided by host) | Port the Auth API listens on. |
| `DATABASE_URL` | `postgresql://...` | `postgresql://...` | Connection string to your Production Database (Must match other services if sharing DB). |
| `JWT_SECRET` | `super-secret` | `ReallYlongRandoMStrinG...` | **CRITICAL**: Used to sign session tokens. |
| `RESEND_API_KEY` | `re_...` | `re_...` | **CRITICAL**: Required for sending password reset emails. Get from Resend.com. |
| `EMAIL_FROM` | `onboarding@resend.dev` | `noreply@plaqode.com` | The sender address for emails. Must be verified in Resend for Production. |
| `WEB_URL` | `http://localhost:3000` | `https://plaqode.com` | Used to construct link URLs in emails (e.g. password reset links). |


# CI/CD Setup Guide (Native Cloud Builds)

This guide outlines how to set up Continuous Integration (CI) and Continuous Deployment (CD) for the Plaqode Monorepo.

## 🚀 Phase 1 — Now (Budget $0)
We are prioritizing **Zero Cost** and **High Performance** for the initial launch.

*   **Frontend**: [Vercel](https://vercel.com) (Generous Free Tier for Next.js)
*   **Backend**: [Fly.io](https://fly.io) (Waived bills <$5/mo = Free for small apps)
*   **Database**: [Neon](https://neon.tech) (Free Tier Serverless Postgres)

> [!NOTE]
> **Why this stack?**: Vercel provides the best Next.js experience. Fly.io offers significantly faster "wake up" times than Render's free tier, making the API feel responsive even with low traffic. Neon separates storage from compute, allowing the DB to scale to zero (cost-wise) when not in use.

---

## 1. Continuous Integration (CI)
We use **GitHub Actions** to ensure every Pull Request is healthy before merging.

### Action: Create `ci.yml`
Create a file at `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: ["main"]
  pull_request:
    types: [opened, synchronize]

jobs:
  build-and-test:
    name: Build & Test
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      # Turbo Cache (Optional but Recommended for speed)
      # You would need to enable Remote Caching on Vercel for this to be truly effective across runs
      
      - name: Lint, Test, and Build (Dry Run)
        # Filters to only run tasks for changed apps/packages
        run: npx turbo run lint test build --filter="...[origin/main]"
```

---

## 2. Continuous Deployment (CD) - Phase 1

### A. Frontend Apps (`plaqode-web`, `qrstudio-web`, `cardify`)
**Platform**: Vercel

1.  **Project Setup**:
    *   Go to Vercel Dashboard -> Add NewProject.
    *   Import `plaqode-platform` repo.
    *   **Framework Preset**: Next.js (Auto-detected).
    *   **Root Directory**: 
        *   For Main App: Edit to `apps/plaqode-web`.
        *   For Creator App: Create *another* project and set Root to `apps/qrstudio-web`.
        *   For Cardify App: Create *another* project and set Root to `apps/cardify`.
2.  **Environment Variables**:
    *   Copy values from `DEPLOYMENT-NOTES.md` into Vercel Project Settings -> Environment Variables.
3.  **Deploy**:
    *   Push to `main`. Vercel creates a deployment automatically.
    *   **Result**: Live URL (e.g., `plaqode.com`).

### B. Backend Services (`qrstudio-api`, `plaqode-auth`)
**Platform**: Fly.io (Free Tier Strategy)

**Does Fly.io require Docker?**
Technically, yes, Fly.io runs everything as a Firecracker VM (micro-container). However, you have two options:
1.  **"Magic" Mode (Default)**: If you run `fly launch` without a Dockerfile, Fly's "Builders" (buildpacks) will try to auto-detect your Node.js app and build it for you.
2.  **"Manual" Mode (Recommended for Control)**: You provide a `Dockerfile`, and Fly uses that exact recipe.

**Step-by-Step Deployment (Manual Mode - Recommended)**

1.  **Install Fly CLI**: `PowerShell -Command "iwr https://fly.io/install.ps1 -useb | iex"`
2.  **Login**: `fly auth login`
3.  **Prepare Dockerfile**:
    Create a `Dockerfile` in `apps/qrstudio-api` (and `plaqode-auth`):
    ```dockerfile
    FROM node:20-alpine
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci --omit=dev
    COPY . .
    RUN npm run build
    EXPOSE 8080
    CMD ["npm", "start"]
    ```
4.  **Launch**:
    *   `cd apps/qrstudio-api`
    *   `fly launch --no-deploy`
    *   *Note*: When asked to "Copy configuration to the new app?", say **Yes**.
5.  **Configure Secrets**:
    *   `fly secrets set JWT_PRIVATE_KEY_PATH="/app/keys/private.pem" ...`
6.  **Deploy**:
    *   `fly deploy`

### C. Database
**Platform**: Neon

1.  Create 3 Projects in Neon console (one for each service that needs a DB):
    *   `plaqode-auth-db`
    *   `qrstudio-api-db`
    *   `cardify-db`
2.  Get the Connection String for each.
3.  Add these strings to their respective Environment Variables:
    *   `plaqode-auth` (Fly.io) -> `DATABASE_URL`
    *   `qrstudio-api` (Fly.io) -> `DATABASE_URL`
    *   `cardify` (Vercel) -> `DATABASE_URL`

---

## 3. Future Roadmap: Docker Strategy
While Phase 1 uses "Native" builds, scaling may require Docker.

### When to switch to Docker?
1.  **Complex Dependencies**: If you need system-level libraries not present in standard Vercel/Fly runtimes (e.g., specific versions of `FFmpeg`, `Canvas`).
2.  **Vendor Lock-in Concerns**: Docker containers can run anywhere (AWS ECS, Google Cloud Run, DigitalOcean App Platform), freeing you from Vercel/Fly specific logic.
3.  **Reproducibility**: "It works on my machine" -> Docker makes sure the *OS* is the same too.

### Implementation Plan
1.  **Create Dockerfiles**: Add a `Dockerfile` to each `apps/*` directory.
    *   Use highly optimized base images like `node:20-alpine` or `gcr.io/distroless/nodejs`.
2.  **Docker Compose**: Create `docker-compose.yml` in the root for local dev orchestration of DB + API + Frontend.
3.  **CI Update**: Update GitHub Actions to `docker build` and push to GitHub Container Registry (GHCR).
4.  **Deploy**: Update Fly.io/Render to pull the image from GHCR instead of building from source.

---

## 4. Post-Deployment Analysis & Monitoring

### 📊 Error Tracking: Sentry
Catch crashes in real-time.
1.  Create Sentry Project.
2.  install `@sentry/nextjs` (Frontend) and `@sentry/node` (Backend).
3.  Add `SENTRY_DSN` to env vars.
4.  **Benefit**: You get email alerts when a user hits a crash (500 error).

### ⚡ Performance: Vercel Analytics
1.  Enable "Analytics" tab in Vercel Dashboard.
2.  **Benefit**: See "Real Experience Score" (Core Web Vitals) from actual visitors.

### 💓 Uptime: BetterStack / UptimeRobot
1.  Set up a monitor for `https://api.plaqode.com/health`.
2.  **Benefit**: Get alerted if your API goes down completely.

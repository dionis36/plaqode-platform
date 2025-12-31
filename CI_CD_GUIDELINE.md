# CI/CD Setup Guide (Native Cloud Builds)

This guide outlines how to set up Continuous Integration (CI) and Continuous Deployment (CD) for the Plaqode Monorepo using GitHub Actions and Native Cloud Providers (Vercel/Railway).

> [!NOTE]
> **Why No Docker?**: We are utilizing "Native Native Builds" (Buildpacks/Nixpacks). This simplifies management as the hosting platform (Vercel/Railway) handles the OS and Runtime environment management for you.

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

## 2. Continuous Deployment (CD)

### A. Frontend Apps (`plaqode-web`, `qrstudio-web`)
**Platform**: Vercel

1.  **Project Setup**:
    *   Go to Vercel Dashboard -> Add NewProject.
    *   Import `plaqode-platform` repo.
    *   **Framework Preset**: Next.js (Auto-detected).
    *   **Root Directory**: 
        *   For Main App: Edit to `apps/plaqode-web`.
        *   For Creator App: Create *another* project and set Root to `apps/qrstudio-web`.
2.  **Environment Variables**:
    *   Copy values from `DEPLOYMENT-NOTES.md` into Vercel Project Settings -> Environment Variables.
3.  **Deploy**:
    *   Push to `main`. Vercel creates a deployment automatically.
    *   **Result**: Live URL (e.g., `plaqode.com`).

### B. Backend Services (`qrstudio-api`, `plaqode-auth`)
**Platform**: Railway (Recommended) or Render
**Method**: Native Buildpacks (Nixpacks)

1.  **Project Setup**:
    *   Go to Railway Dashboard -> New Project -> GitHub Repo.
    *   Select `plaqode-platform`.
2.  **Service Configuration**:
    *   Railway will detect the Monorepo. You might need to add the repo twice (once for each service) or configure monorepo settings.
    *   **Service 1 (API)**:
        *   **Root Directory**: `/apps/qrstudio-api`
        *   **Build Command**: `npm run build`
        *   **Start Command**: `npm run dev` (or `npm start` if compiled to JS)
    *   **Service 2 (Auth)**:
        *   **Root Directory**: `/apps/plaqode-auth`
3.  **Variables**:
    *   Add `JWT_PRIVATE_KEY_PATH` etc.
    *   **Tip**: For file-based keys, Railway allows you to paste the content into a Variable, or use their "Config Files" feature to mount `private.pem` at a specific path.

---

## 3. Post-Deployment Analysis & Monitoring

Once deployed, you need to know if it works.

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

---

## 4. Recommendation Note
**Why this approach works**: Next.js and Node.js are standard technologies. Platforms like Vercel and Railway have spent years optimizing their "Native" build pipelines to support them out of the box.  
**When to switch**: Only enable Docker if you encounter "It works on my machine but not on the server" issues specifically related to system libraries (like Image Processing libraries `sharp` or `canvas`), as Docker guarantees the OS files are identical. For now, Native Builds are faster to maintain.

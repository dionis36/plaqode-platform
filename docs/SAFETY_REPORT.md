# Safety & Isolation Report

**Objective:** Ensure the development of `marquee-web` and `marquee-api` remains completely isolated from the production environment (Vercel, Fly.io) and does not trigger existing CI/CD pipelines until ready.

---

## 1. Preventing GitHub Actions Triggers

**Current State:** Your `ci.yml` is currently configured to run **only on pushes to `main`**.
```yaml
on:
  push:
    branches: ["main"]
```
This means pushing to `feature/marquee-ems` **AUTOMATICALLY ignored** by GitHub Actions. You do not need to change anything here! Your feature branch is safe by default.

**Note:** If you open a **Pull Request** from `feature/marquee-ems` to `main`, the CI *will* run (as configured in `pull_request`). This is usually desired (to check if your code breaks anything before merging), but if you want to prevent even PR checks, you would adding `branches-ignore` to the `pull_request` section.

---

## 2. Preventing Vercel Deployments

**Problem:** Vercel automatically creates a "Preview Deployment" for **every push to every branch**. This is likely what you are worried about.
**Solution:** We will create a `vercel.json` file in the root directory to effectively "block" these builds.

### Action: Create `vercel.json`
We will create this file with an `ignoreCommand`.

```json
{
  "git": {
    "ignoreCommand": "if [ \"$VERCEL_GIT_COMMIT_REF\" == \"feature/marquee-ems\" ]; then exit 0; else exit 1; fi"
  }
}
```
**How this works:**
- **`exit 0`**: Tells Vercel "Stop! Do not build this."
- **`exit 1`**: Tells Vercel "Proceed with the build."
- When you push to `feature/marquee-ems`, Vercel receives the webhook, runs this command, sees `exit 0`, and **cancels the build immediately**. No resources used, no new url.

---

## 3. Local Isolation (Ports & DB)

**Problem:** Running `npm run dev` might start all apps, causing port conflicts.
**Solution:**

### A. Port Assignment
We have assigned new ports to avoid conflicts:
- **`marquee-web`**: Port **3004** (Reserved)
- **`marquee-api`**: Port **3006** (Reserved)

### B. Database Isolation
- **DO NOT** use the production Neon connection string in `apps/marquee-api/.env`.
- Use a local Docker Postgres instance OR create a dedicated **Neon Branch** (e.g., `dev/marquee`).
- We will add `apps/marquee-web/.env` and `apps/marquee-api/.env` to `.gitignore` to ensure secrets never leak.

---

## Summary of Next Steps
1.  **Create** `vercel.json` (I will do this next).
2.  **Create Branch** `feature/marquee-ems`.
3.  **Start Coding** safely.

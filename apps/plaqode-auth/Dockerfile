# 🐳 CLASS: Dockerfile 101 for Monorepos (Auth Service)
# Goal: Create a lightweight, runnable image of our app.

# --- Stage 1: The Builder (Compiling the code) ---
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Context matters! We copy the root files first to respect the Monorepo lockfile.
COPY package.json package-lock.json turbo.json ./
COPY apps/plaqode-auth/package.json ./apps/plaqode-auth/

# 2. Install ALL dependencies
RUN npm ci

# 3. Copy the actual source code
COPY apps/plaqode-auth ./apps/plaqode-auth

# 4. Build the App
WORKDIR /app/apps/plaqode-auth
RUN npx prisma generate
RUN npm run build

# --- Stage 2: The Runner (Production Image) ---
FROM node:20-alpine AS runner
WORKDIR /app

# Install OpenSSL for Prisma
RUN apk -U add openssl

# 5. Copy only what we need from the Builder
# We assume 'dist' is where the compiled JS lives
COPY --from=builder /app/apps/plaqode-auth/dist ./dist
COPY --from=builder /app/apps/plaqode-auth/src/generated ./dist/src/generated
COPY --from=builder /app/apps/plaqode-auth/package.json ./package.json
COPY --from=builder /app/apps/plaqode-auth/keys ./keys
COPY --from=builder /app/apps/plaqode-auth/prisma ./prisma

# (Simplification: We copy all node_modules to avoid missing usage)
COPY --from=builder /app/node_modules ./node_modules

# 6. Open the Door (Port)
ENV PORT=3003
EXPOSE 3003

# 7. Start the Engine
CMD ["node", "dist/src/index.js"]

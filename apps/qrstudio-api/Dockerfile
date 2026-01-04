# 🐳 CLASS: Dockerfile 101 for Monorepos
# Goal: Create a lightweight, runnable image of our app.

# --- Stage 1: The Builder (Compiling the code) ---
FROM node:20-slim AS builder
WORKDIR /app
# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

# Context matters! We copy the root files first to respect the Monorepo lockfile.
COPY package.json package-lock.json turbo.json ./
COPY apps/qrstudio-api/package.json ./apps/qrstudio-api/
# Install ALL dependencies (Fast and Reliable)
RUN npm ci
# Copy the actual source code
COPY apps/qrstudio-api ./apps/qrstudio-api
# Build the App
WORKDIR /app/apps/qrstudio-api
RUN npx prisma generate
RUN npm run build

# --- Stage 2: The Dependency Installer (Production Only) ---
# We isolate this to ensure we get exactly what the api needs, no hoisting verification needed
FROM node:20-slim AS deps
WORKDIR /app
COPY apps/qrstudio-api/package.json ./
# Install ONLY production dependencies
RUN npm install --omit=dev

# --- Stage 3: The Runner (Production Image) ---
FROM node:20-slim AS runner
WORKDIR /app

# Install OpenSSL for Prisma Runtime
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# 1. Copy the Compiled Code from Builder
COPY --from=builder /app/apps/qrstudio-api/dist ./dist
COPY --from=builder /app/apps/qrstudio-api/src/generated ./dist/generated
COPY --from=builder /app/apps/qrstudio-api/package.json ./package.json
COPY --from=builder /app/apps/qrstudio-api/keys ./keys

# 2. Copy the Clean Production Node Modules from Deps
COPY --from=deps /app/node_modules ./node_modules

# 3. Environment & Port
ENV PORT=3005
ENV NODE_ENV=production
EXPOSE 3005

# 4. Start the Engine
CMD ["node", "dist/app.js"]

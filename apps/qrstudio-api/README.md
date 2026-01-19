# QR Studio API (`apps/qrstudio-api`)

**QR Studio API** is the high-performance backend engine for dynamic QR code generation, tracking, and management.

## 🛠️ Technology Stack
- **Runtime**: Node.js
- **Framework**: Fastify
- **Image Processing**: `sharp`
- **Analytics**: `geoip-lite` / `ua-parser-js`
- **Database**: PostgreSQL (via Prisma)

## 🚀 Getting Started

### 1. Environment Setup
```bash
cp .env.example .env
```
Runs on **Port 3005**.

### 2. Database Migration
```bash
npx prisma migrate dev
```

### 3. Run Service
```bash
npm run dev
# OR from root
npm run qrstudio-api:dev
```
Runs on **http://localhost:3005**.

## 📊 Core Responsibilities
- **QR Generation**: Creating SVG/PNG codes with logos and custom colors.
- **Dynamic Redirects**: Handling the short-url redirects (`scans/[id]`).
- **Analytics**: Tracking scan location, device, and time.

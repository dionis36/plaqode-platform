# Cardify (`apps/cardify`)

**Cardify** is a Next.js application that enables users to create, customize, and share digital business cards. It features a rich editor with real-time preview and export capabilities.

## 🛠️ Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS v3 + Tailwind Merge
- **Animation**: Framer Motion
- **Canvas**: `react-konva` (for image generation)
- **Database**: PostgreSQL (via shared Prisma)

## 🚀 Getting Started

### 1. Environment Setup
Copy the example file and configure it:
```bash
cp .env.example .env
```
Ensure `DATABASE_URL` points to your local/neon instance.

### 2. Install Dependencies
from the root:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev --workspace=apps/cardify
# OR
cd apps/cardify && npm run dev
```
Runs on **http://localhost:3002**.

## 🔑 Key Features
- **Profile Editor**: Drag-and-drop customization.
- **QR Integration**: Generates unique QR codes for each card.
- **Plaqode Auth**: Integrates with the central auth service for user management.

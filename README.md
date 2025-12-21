# Plaqode Platform Monorepo

Welcome to the **Plaqode Platform Repository**. This monorepo houses the complete ecosystem for **Plaqode**, a next-generation platform for digital connectivity solutions in Tanzania. It unifies multiple interconnected services including digital business cards, dynamic QR code management, and a central identity system.

## 🏗️ Architecture Overview

The platform is architected as a **high-performance monorepo** using **Turborepo** and **npm workspaces**. It consists of distinct, specialized applications that communicate to provide a seamless user experience.

### 📦 Applications

| Application | Service Name | Path | Tech Stack | Port | Description |
|:--- |:--- |:--- |:--- |:--- |:--- |
| **Plaqode Web** | `@plaqode-platform/plaqode-web` | `apps/plaqode-web` | Next.js 15, Tailwind v4, Framer Motion | **3000** | The main landing page, user dashboard, and central hub for the ecosystem. |
| **QR Studio Web** | `@plaqode-platform/qrstudio-web` | `apps/qrstudio-web` | Next.js 14, React, Tailwind | **3001** | Dedicated frontend interface for advanced QR code generation and analytics. |
| **Cardify** | `@plaqode-platform/cardify` | `apps/cardify` | Next.js 14, Prisma, PostgreSQL | **3002** | Digital Business Card platform allowing users to create, customize, and share smart profiles. |
| **Plaqode Auth** | `@plaqode-platform/plaqode-auth` | `apps/plaqode-auth` | Fastify, Node.js, Prisma | **3003** | Centralized Authentication Service (SSO). Handles user identity, JWT issuance, and session management for all apps. |
| **QR Studio API** | `@plaqode-platform/qrstudio-api` | `apps/qrstudio-api` | Fastify, Node.js, Prisma | **3005** | High-performance API backend for generating, tracking, and managing dynamic QR codes. |

---

## 🛠️ Technology Stack

We use a modern, robust, and scalable technology stack:

*   **Frontend Ecosystem:**
    *   **Frameworks:** Next.js (v14/v15), React 18/19
    *   **Styling:** TailwindCSS (v3 & v4), PostCSS
    *   **Animations:** GSAP, Framer Motion
    *   **State Management:** React Context, custom hooks

*   **Backend & Data:**
    *   **Runtime:** Node.js (v20+)
    *   **Framework:** Fastify (High performance)
    *   **Database:** PostgreSQL
    *   **ORM:** Prisma (Isolated clients per microservice)
    *   **Auth:** JWT (JSON Web Tokens), HttpOnly Cookies

*   **DevOps & Tooling:**
    *   **Monorepo:** Turborepo
    *   **Package Manager:** npm workspaces
    *   **Language:** TypeScript (Strict mode)

---

## 🚀 Getting Started

Follow these instructions to set up the Plaqode Platform locally.

### 1. Prerequisites

Ensure you have the following installed:
*   **Node.js** (v20.0.0 or higher) - [Download](https://nodejs.org/)
*   **npm** (comes with Node.js)
*   **PostgreSQL** (Running locally or a cloud URL)

### 2. Installation

Clone the repository and install dependencies from the root directory:

```bash
git clone https://github.com/your-username/plaqode-platform.git
cd plaqode-platform
npm install
```

### 3. Environment Setup

Access the `apps` directory and configure environment variables for each service.
**Note:** You must set up a `.env` file in each application folder (`apps/cardify`, `apps/plaqode-auth`, etc.).

Example `.env` structure for **Apps** (refer to `.env.example` in each folder):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/my_db?schema=public"

# Auth
NEXT_PUBLIC_AUTH_SERVICE_URL="http://localhost:3003"
NEXT_PUBLIC_PLATFORM_URL="http://localhost:3000"
```

### 4. Database Setup

To prevent conflicts, each service generates its own isolated Prisma Client.

```bash
# Generate clients for all services
npx turbo run prisma:generate

# OR migrate databases individually
cd apps/cardify && npx prisma migrate dev
cd apps/plaqode-auth && npx prisma migrate dev
cd apps/qrstudio-api && npx prisma migrate dev
```

### 5. Running the Platform

You can run the entire platform concurrently with a single command from the root:

```bash
npm run dev
```

This will start:
*   **Plaqode Web** at [http://localhost:3000](http://localhost:3000)
*   **QR Studio Web** at [http://localhost:3001](http://localhost:3001)
*   **Cardify** at [http://localhost:3002](http://localhost:3002)
*   **Auth Service** at [http://localhost:3003](http://localhost:3003)
*   **QR API** at [http://localhost:3005](http://localhost:3005)

---

## 👨‍💻 Development Workflow

### Adding Dependencies

Since this is a monorepo, use the workspace flag to install packages:

```bash
# Install to valid workspace (e.g., cardify)
npm install lucide-react -w apps/cardify

# Install to root (shared dev dependencies)
npm install turbo -w root
```

### Prisma Workflow

We use **Isolated Prisma Clients** to manage multiple database schemas in a single repo.
*   **Cardify Client:** Located in `apps/cardify/lib/generated/client`
*   **Auth Client:** Located in `apps/plaqode-auth/src/generated/client`
*   **QR API Client:** Located in `apps/qrstudio-api/src/generated/client`

**Always** restart the development server after running `prisma generate`.

---

## 📄 License

This project is proprietary software. All rights reserved by **Plaqode**.

<div align="center">
  <h1>Plaqode</h1>
  <p>
    <strong>The Unified Ecosystem for Digital Identity & Dynamic QR Solutions</strong>
  </p>

  <p>
    <a href="https://plaqode.com">
      <img src="https://img.shields.io/badge/Live-plaqode.com-blue?style=for-the-badge&logo=vercel" alt="Live Deployment">
    </a>
  </p>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-14%2F15-black?style=flat-square&logo=next.js" alt="Next.js"></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind"></a>
    <a href="https://turbo.build"><img src="https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=flat-square&logo=turborepo" alt="Turborepo"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript" alt="TypeScript"></a>
    <a href="https://prisma.io"><img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma" alt="Prisma"></a>
  </p>

  <p>
    <a href="#-the-ecosystem"><strong>Explore the Apps</strong></a> ·
    <a href="./docs/DEPLOYMENT.md"><strong>Deployment Details</strong></a> ·
    <a href="./docs/ARCHITECTURE.md"><strong>Architecture</strong></a>
  </p>
</div>

<br />

## ⚡ Overview

**Plaqode** is a high-performance monorepo engine powering a suite of digital connectivity tools. From creating contactless digital business cards to generating advanced dynamic QR codes with analytics, Plaqode unifies these experiences under a single, secure identity layer.

Deployed live at **[plaqode.com](https://plaqode.com)**.

---

## 🌍 The Ecosystem

| Application | Description | Stack Highlights | Port |
| :--- | :--- | :--- | :--- |
| **[🟦 Cardify](./apps/cardify)** | **Digital Business Card Builder**<br>Drag-and-drop editor for professional profiles. | Next.js 14, `react-konva`, Framer Motion | `:3002` |
| **[🟩 QR Studio](./apps/qrstudio-web)** | **Dynamic QR Creator**<br>Generate, customize, and track QR codes. | Next.js 14, React Context, Tailwind | `:3001` |
| **[⬛ Plaqode Web](./apps/plaqode-web)** | **Central Dashboard**<br>The main landing and unification hub. | Next.js 15, Tailwind v4, Radix UI | `:3000` |
| **[🔐 Auth Service](./apps/plaqode-auth)** | **SSO & Identity**<br>Secure, stateless authentication provider. | Fastify, Zod, RS256 JWTs | `:3003` |
| **[⚙️ QR API](./apps/qrstudio-api)** | **QR Engine**<br>High-speed generation & analytics tracking. | Fastify, Sharp, GeoIP, NanoID | `:3005` |

---

## 🚀 Key Features

### 🎨 Visual Excellence
- **Unified Design System**: Shared UI packages (`@plaqode-platform/ui`) ensure consistent branding across apps.
- **Modern Interactions**: Powered by **Framer Motion** and **GSAP** for fluid, app-like experiences.
- **Responsive Builders**: Intricate WYSIWYG editors that work flawlessly on mobile and desktop.

### 🛡️ Robust Architecture
- **Stateless Authentication**: Uses RS256 Keypairs. The Auth Service signs tokens, and apps verify them independently ensuring zero-latency auth checks.
- **Type Safety**: End-to-end TypeScript coverage with shared configurations.
- **Isolated Databases**: Each service manages its own schema, preventing monolithic bottlenecks.

### 🛠️ Developer Experience
- **One Command Start**: `npm run dev` boots the entire platform.
- **Cached Builds**: Turborepo ensures you never build the same code twice.
- **Standardized Configs**: Shared ESLint, TypeScript, and Tailwind settings.

---

## 💻 Quick Start

Ready to dive in?

1.  **Clone & Install**
    ```bash
    git clone https://github.com/plaqode/plaqode-platform.git
    npm install
    ```

2.  **Configure Environment**
    See **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** for exact configurations.
    ```bash
    cp apps/plaqode-auth/.env.example apps/plaqode-auth/.env
    # ... (repeat for other apps)
    ```

3.  **Ignite the Engine**
    ```bash
    # Generate database clients and auth keys
    npx turbo run prisma:generate
    npm run keys:generate --workspace=apps/plaqode-auth

    # specific launch
    npm run dev
    ```

👉 **[Read the Full Contributing Guide](./CONTRIBUTING.md)** for detailed setup instructions.

---

## 📚 Documentation

- **[System Architecture](./docs/ARCHITECTURE.md)**: Diagrams and deep dive into the Auth flow.
- **[Deployment](./docs/DEPLOYMENT.md)**: Production secrets and Vercel/Fly.io configurations.
- **[CI/CD Pipelines](./docs/CI_CD.md)**: GitHub Actions and build workflows.

---

<div align="center">
  <p>
    Built with ❤️ by <strong>Dio</strong>
  </p>
  <p>
    Proprietary Software © 2026
  </p>
</div>

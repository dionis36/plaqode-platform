# QR Studio Web (`apps/qrstudio-web`)

**QR Studio Web** is the frontend interface for the QR Code Creator tool. It provides a wizard-like experience for generating various types of QR codes (URL, WiFi, vCard, etc.).

## 🛠️ Technology Stack
- **Framework**: Next.js 14
- **State**: React Context
- **Styling**: TailwindCSS
- **Communication**: Interacts with `qrstudio-api` and `plaqode-auth`.

## 🚀 Getting Started

### 1. Environment Setup
```bash
cp .env.example .env
```
Runs on **Port 3001**.
Review `NEXT_PUBLIC_QRSTUDIO_API_URL` to ensure it points to port 3005.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
# OR from root
npm run qrstudio-web:dev
```
Runs on **http://localhost:3001**.

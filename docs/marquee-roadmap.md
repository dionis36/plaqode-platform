# Marquee Development Roadmap

This document outlines the phased development strategy for the **Marquee Event Management System (EMS)** within the Plaqode monorepo. It breaks down the implementation into manageable phases with clear deliverables, ensuring a structured approach to building the MVP and future enhancements.

---

## Phase 1: Foundation & Infrastructure (Weeks 1-2)
**Goal:** Establish the technical groundwork, project structure, and core integration points within the monorepo.

### Deliverables
- [ ] **Version Control & Isolation**
    - Create and switch to branch **`feature/marquee-ems`**.
    - Ensure strict port usage: `marquee-web` on **3004** and `marquee-api` on **3006**.
- [ ] **Project Scaffolding**
    - Create `apps/marquee-web` (Next.js 14+ App Router).
    - Create `apps/marquee-api` (Fastify + TypeScript).
    - Update `turbo.json` and root `package.json` to include new workspaces.
- [ ] **Database Setup**
    - Initialize Prisma schema in `apps/marquee-api/prisma`.
    - Define core models: `User`, `Event`, `Ticket` (Preliminary).
    - Configure local database (PostgreSQL/SQLite) and connection strings.
- [ ] **Authentication Integration**
    - Integrate `plaqode-auth` with `marquee-web` (Client-side auth state).
    - Implement JWT validation middleware in `marquee-api`.
    - Verify end-to-end login flow: Login on Auth App -> Redirect to Marquee -> Valid Session.
- [ ] **UI Design System Setup**
    - Configure `packages/ui` support in `marquee-web`.
    - Setup Tailwind CSS and global styles.
    - Create basic layout shell (Sidebar, Header, Footer).

---

## Phase 2: Core Event Management (MVP - Part A) (Weeks 3-5)
**Goal:** Enable organizers to create and publish events, and users to view them.

### Deliverables
- [ ] **Backend: Event Operations**
    - API: `POST /events` (Create Event).
    - API: `GET /events` & `GET /events/:id` (List/Details).
    - API: `PUT /events/:id` (Update) & `DELETE /events/:id` (Cancel).
    - Implement file upload service for Event Banners/Images (using `fastify-multipart`).
- [ ] **Frontend: Organizer Dashboard**
    - **Create Event Wizard:** Multi-step form (Details, Date/Time, Location, Media).
    - **My Events:** List view of created events with status indicators (Draft/Published).
    - **Event Dashboard:** Overview page for a specific event.
- [ ] **Frontend: Public Discovery**
    - **Home Page:** Featured/Upcoming events feed.
    - **Event Details Page:** Public view with banner, description, and "Get Tickets" button (placeholder).

---

## Phase 3: Ticketing & Registration (MVP - Part B) (Weeks 6-8)
**Goal:** Allow users to register for events and generate tickets.

### Deliverables
- [ ] **Backend: Ticketing Logic**
    - Define `TicketType` model (e.g., GA, VIP).
    - Implement inventory management (tickets remaining).
    - API: `POST /registrations` (Book tickets).
    - **QR Code Service:** Generate unique QR codes for each issued ticket.
- [ ] **Frontend: Booking Flow**
    - **Ticket Selection:** UI to select ticket types and quantities.
    - **Checkout:** Collection of attendee details.
    - **Confirmation Page:** Success state with digital ticket view.
- [ ] **Email System**
    - Integrate email provider (Postmark/Resend/AWS SES).
    - automated "Order Confirmation" email with QR code attachment.

---

## Phase 4: Operations & On-Site Tools (MVP - Part C) (Weeks 9-10)
**Goal:** Tools for event day operations (Check-in/Scanning).

### Deliverables
- [ ] **Backend: Check-in API**
    - API: `POST /checkin/scan` (Validate QR token).
    - Logic: Prevent duplicate scans, validate event timeframe.
- [ ] **Frontend: Organizer Check-in Tools**
    - **Scanner UI:** Web-based QR scanner (using `html5-qrcode` or similar).
    - **Attendee List:** Searchable table of all registrants with manual "Check-in" toggle.
    - **Real-time Stats:** Simple counter for "Checked In" vs "Total Registered".

---

## Phase 5: Testing, Polish & Launch (MVP - Final) (Week 11)
**Goal:** Ensure stability, security, and deployment readiness.

### Deliverables
- [ ] **QA & Bug Fixes**
    - End-to-end testing of User Flow: Register -> Login -> Create Event -> Book Ticket -> Scan Ticket.
    - Mobile responsiveness audit.
- [ ] **Security Auditing**
    - API Rate limiting.
    - Input validation (Zod schemas).
    - Permission checks (ensure Users can't edit others' events).
- [ ] **Deployment**
    - `marquee-web` -> Vercel.
    - `marquee-api` -> Fly.io / VPS.
    - Domain configuration.

---

## Phase 6: Post-MVP Enhancements (Future)
**Goal:** Advanced features typically required for enterprise or large-scale events.

### Planned Deliverables
- [ ] **Features**
    - Paid Tickets (Stripe Integration).
    - Custom Form Builder (for registration questions).
    - Waitlists.
    - Mobile App (React Native) for offline scanning.
    - Session/Schedule Management for conferences.

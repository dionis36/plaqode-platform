# Feedback & Review QR Tool Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: 🔴 **CRITICAL FAILURE (Public Preview Missing)**

### 🚨 Critical Deficiencies
1.  **Missing Public Components**:
    -   `FeedbackPreview.tsx` and `ReviewPreview.tsx` are MISSING from `apps/plaqode-web`.
    -   Scanning these QR codes leads to a 404/Blank page.
2.  **Feedback Submission Logic**:
    -   The `FeedbackPreview` in Studio has a `textarea` and a "Submit" button, but it simply sets a local state `isSubmitted(true)`.
    -   **NO API CALL** is made. The feedback is lost immediately.
    -   *Requirement*: Needs `mailto` link or a backend API route. Given the "Admin Email" field in the form, the intent was likely a `mailto` fallback or a transactional email service.

### ✅ Working Features
-   **Forms**: `FeedbackForm` and `ReviewForm` are well-structured and save data correctly.
-   **Review Tool Links**: The structure for Google/Yelp/TripAdvisor links is robust.

---

## 2. Upgrade Requirements
### Phase 1: Port Review Tool (Easy Fix)
-   [ ] **Create Public Preview**:
    -   Copy `ReviewPreview.tsx` to Public app.
    -   **Fix Links**: Ensure `href="#"` is replaced with actual `reviewData.google`, etc.

### Phase 2: Fix Feedback Tool (Logic Required)
-   [ ] **Create Public Preview**:
    -   Copy `FeedbackPreview.tsx` to Public app.
-   [ ] **Implement Submission**:
    -   *Option A (Simple)*: "Submit" opens `mailto:admin@email.com?subject=Feedback&body=...`.
    -   *Option B (Robust)*: POST to `/api/feedback`.
    -   *Decision*: For MVP, use **Option A (Mailto)** if no backend service is ready. However, `FeedbackForm` asks for "Admin Email", implying the system sends it.
    -   *Better approach*: Since `plaqode-web` is a Next.js app, we can create a `mailto` link dynamic construction.
    -   *Correction*: The form asks for "Admin Email" to *receive* feedback. A `mailto` opens the *user's* email client. This is often annoying.
    -   *Pivot*: We should probably just log it to console or show a "Demo Only" message if no backend is available, OR wire it to a simple API endpoint if one exists.
    -   *For Upgrade*: We will implement a `mailto` fallback for now: `window.location.href = mailto:...`.

## 3. Implementation Steps
### Step 1: Port ReviewPreview
-   Copy `apps/qrstudio-web/.../preview/ReviewPreview.tsx` -> `apps/plaqode-web/.../preview/ReviewPreview.tsx`.
-   Update `href`s to use real data.

### Step 2: Port FeedbackPreview
-   Copy `apps/qrstudio-web/.../preview/FeedbackPreview.tsx` -> `apps/plaqode-web/.../preview/FeedbackPreview.tsx`.
-   Implement `handleSubmit` to trigger a `mailto` or a real API call.

## 4. Verification Checklist
-   [ ] **Review**: Scan -> Click Google Link -> Opens Google Maps.
-   [ ] **Feedback**: Scan -> Fill stars & text -> Click Submit -> Opens Email Client (Mailto) or shows Success.

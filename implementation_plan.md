# Implementation Plan - New QR Tools

## Goal
Implement 6 new QR Code tools to expand the platform's capabilities:
1.  **Google Reviews** (Direct review link)
2.  **Audio / MP3** (Audio player page)
3.  **Video** (Video player page)
4.  **Business Page** (Mini-website for business info)
5.  **Feedback Form** (Private feedback collection)
6.  **Coupon / Offer** (Digital discount landing page)

## User Review Required
> [!IMPORTANT]
> **Backend Update Required**: The `qrstudio-api` enforces strict validation on the `type` field. I will need to update `src/routes/qr.routes.ts` to allow the new tool types.

## Proposed Changes

### 1. Backend: `apps/qrstudio-api`
#### [MODIFY] [qr.routes.ts](file:///c:/Users/DIO/Documents/PROJECT27/plaqode-platform/apps/qrstudio-api/src/routes/qr.routes.ts)
*   Update `createQrSchema` `type` enum to include: `'review', 'audio', 'video', 'business', 'feedback', 'coupon'`.

### 2. Frontend: `apps/qrstudio-web` (Wizard & Creation)
#### [MODIFY] [store.ts](file:///c:/Users/DIO/Documents/PROJECT27/plaqode-platform/apps/qrstudio-web/src/components/wizard/store.ts)
*   Add default payload structures for the 6 new tools to `WizardState`.

#### [NEW] Tool Implementation
For **EACH** of the 6 tools, I will create:
1.  **Page**: `src/app/create/[tool]/page.tsx` (Wizard entry point).
2.  **Form**: `src/components/wizard/forms/[Tool]Form.tsx` (Configuration form).
3.  **Preview**: `src/components/wizard/preview/[Tool]Preview.tsx` (Mobile preview component).

**Tool 1: Google Reviews**
*   **Path**: `src/app/create/review`
*   **Fields**: Google Place ID (or search), Yelp URL, TripAdvisor URL.
*   **Preview**: "Rate Us" buttons.

**Tool 2: Audio**
*   **Path**: `src/app/create/audio`
*   **Fields**: Audio Title, Description, Cover Art, Audio File (Upload/URL).
*   **Preview**: HTML5 Audio Player with cover art.

**Tool 3: Video**
*   **Path**: `src/app/create/video`
*   **Fields**: Video Title, Description, YouTube/Vimeo URL or Upload.
*   **Preview**: Video Player embed.

**Tool 4: Business Page**
*   **Path**: `src/app/create/business`
*   **Fields**: Logo, Banner, Name, Desc, Address (Map), Hours, Contact Buttons, Social Links.
*   **Preview**: Full business landing page.

**Tool 5: Feedback**
*   **Path**: `src/app/create/feedback`
*   **Fields**: Question text, Rating scale, Email to receive alerts.
*   **Preview**: Star rating input + Comment box.

**Tool 6: Coupon**
*   **Path**: `src/app/create/coupon`
*   **Fields**: Offer Banner, Title, Description, Code, Valid Until, Terms.
*   **Preview**: Coupon card with "Redeem" button (visual only).

### 3. Frontend: `apps/plaqode-web` (Dashboard & Catalog)
#### [MODIFY] [MyQRCodes.tsx](file:///c:/Users/DIO/Documents/PROJECT27/plaqode-platform/apps/plaqode-web/components/dashboard/MyQRCodes.tsx)
*   Update `getIconForType` helper to return appropriate Lucide icons for new types.
*   Update `getLabelForType` helper.

#### [MODIFY] [ToolsCatalog.tsx](file:///c:/Users/DIO/Documents/PROJECT27/plaqode-platform/apps/plaqode-web/components/services/ToolsCatalog.tsx)
*   Add the 6 new tools to the public catalog list so users can discover them.

## Verification Plan

### Manual Verification
1.  **Backend**: Restart `qrstudio-api` and verify no startup errors.
2.  **Creation Flow**:
    *   Navigate to each new route (e.g., `/create/review`).
    *   Verify the form loads correctly.
    *   Enter data and verify the mobile preview updates in real-time.
    *   Click "Next/Create" to submit.
3.  **Submission**:
    *   Verify the network request to `/qrcodes` returns `201 Created`.
4.  **Dashboard**:
    *   Go to `/app/qrcodes` (Dashboard).
    *   Verify the new QR codes appear in the list with the correct **Icon** and **Name**.

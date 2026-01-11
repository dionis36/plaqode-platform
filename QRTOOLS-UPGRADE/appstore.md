# App Store QR Tool Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: 🔴 **CRITICAL FAILURE**

### 🚨 Critical Deficiencies
1.  **Inert Download Buttons**:
    -   In both Studio and Public previews, the Store Badges (Google Play, App Store, Amazon) are rendered as `div`s.
    -   They have `cursor-pointer` and hover effects, but **NO `onClick` handler and NO `<a>` wrapper**.
    -   **Impact**: Tapping the "Get it on Google Play" badge does absolutely nothing. The page is a dead end.

### ✅ Working Features
-   **Form**: Correctly collects App Name, Developer, Description, Logo, and platform URLs.
-   **UI Design**: 
    -   The specific SVG badges for Google Play, App Store, and Amazon are high-quality and verified correct.
    -   Header gradient and glassmorphism effects are implemented well.

---

## 2. Upgrade Requirements
### Phase 1: Fix Links (Critical)
-   [ ] **Wire up Badges**:
    -   Wrap the Store Badge rendering in an `<a>` tag:
        ```tsx
        <a href={platform.url} target="_blank" rel="noopener noreferrer" ...>
          {badge}
        </a>
        ```
    -   Ensure `platform.url` is validated (Regex in form seems okay: `^https?://.+`).

### Phase 2: Smart Redirection (Future Consideration)
-   *Note*: A true "App Store QR" often detects the device OS and redirects automatically.
-   *Current behavior*: Provides a landing page with all options. This is actually *content-safe* and preferred for a passive QR code that might be scanned by anyone.
-   *Upgrade*: Keep the landing page approach as it allows cross-platform sharing (e.g. Android user scans, sees options, sends link to iPhone friend).

## 3. Implementation Steps
### Step 1: Fix Public Preview
Modify `apps/plaqode-web/components/qrcodes/preview/AppStorePreview.tsx`.
-   Locate the map loop over `platforms`.
-   Replace the `div` wrapper with an `<a>` tag using the `platform.url`.

### Step 2: Fix Studio Preview
Modify `apps/qrstudio-web/src/components/wizard/preview/AppStorePreview.tsx`.
-   Apply the same fix to ensure the creator can test the links in the preview (opening in new tab).

## 4. Verification Checklist
-   [ ] **Badges**: Click "App Store" badge -> Opens the exact URL entered in form.
-   [ ] **Responsiveness**: Badges stack correctly on small screens (flex-col is already implemented).

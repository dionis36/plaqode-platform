# Business Page QR Tool Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: 🔴 **CRITICAL FAILIURE**

### 🚨 Critical Deficiencies
1.  **Missing Scanner Implementation**:
    - `BusinessPagePreview.tsx` does **NOT EXIST** in `apps/plaqode-web`.
    - This means if a user scans a Business Page QR code, they likely see a 404 error or a broken generic page.
    - **Impact**: Feature is essentially unimplemented for the public.
2.  **Weak Validation**:
    - `Website` field in form has no validation. User can enter "www.google.com" (without https://) which breaks links.

### ✅ Working Features (Studio Side)
- **Form**: Excellent structure (`hours` object, dynamic `social_links` array).
- **Preview (Studio)**: The studio preview `apps/qrstudio-web/.../BusinessPagePreview.tsx` looks great with a banner, logo, and hours table.

---

## 2. Upgrade Requirements
### Phase 1: Create Scanner Page (End User)
- [ ] **Port Preview Component**:
    - Copy `BusinessPagePreview.tsx` from `qrstudio-web` to `plaqode-web`.
    - Adapt imports (e.g., `react-icons` vs `lucide-react`) if necessary.
    - Ensure it is registered in the main `QRCodeViewer` or `page.tsx` logic for the `/view/[id]` route.

### Phase 2: Functional Actions
- [ ] **Action Buttons**:
    - **Call**: Ensure `tel:` links work.
    - **Email**: Ensure `mailto:` links work.
    - **Directions**: The address card should be clickable -> Open Google Maps (`https://www.google.com/maps/search/?api=1&query={encoded_address}`).
- [ ] **Social Links**: Ensure they open in a new tab (`target="_blank"`).

### Phase 3: Form Logic
- [ ] **URL Auto-Correction**:
    - If user types `google.com`, auto-prepend `https://`.
- [ ] **Hours Validation**:
    - Ensure format is consistent (Time picker vs Free text?). Current free text is flexible but prone to messiness. Keep free text for now but add examples.

## 3. Implementation Steps
### Step 1: Create Component
Create `apps/plaqode-web/components/qrcodes/preview/BusinessPagePreview.tsx`.
- Paste content from Studio preview.
- Add "Get Directions" logic to the address section.

### Step 2: Register Component
Update `apps/plaqode-web/components/qrcodes/QRCodePreviewFactory.tsx` (or equivalent registry found in `QRCodeViewer.tsx`) to map `type: 'business'` to the new component.

### Step 3: Social & Map Logic
- Add helper: `getBlockUrl(address)` returning the Google Maps link.
- Ensure all external links use `rel="noopener noreferrer"`.

## 4. Verification Checklist
- [ ] **Scanner**: Scan Business QR -> Page loads (Not 404).
- [ ] **Map**: Click Address -> Opens Google Maps App.
- [ ] **Call**: Click "Call" -> Opens Phone App.
- [ ] **Design**: Banner image scales correctly on mobile.

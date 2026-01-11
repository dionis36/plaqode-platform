# Coupon QR Tool Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: 🟢 **GOOD**

### 🚨 Critical Deficiencies
*   **Resolved**: Scanner implementation is now live.
*   **Resolved**: Redeem button now links correctly.
*   **Resolved**: Image input is now user-friendly (upload vs URL).

### ✅ Working Features (Studio Side)
- **UI Design**: The coupon card design (ticket style, dashed lines, copy button) is excellent.
- **Form**: Good coverage (Code, Valid Until, Terms, Button Label).

---

## 2. Upgrade Requirements
### Phase 1: Create Scanner Page
- [x] **Port Preview Component**:
    - Copy `CouponPreview.tsx` to `plaqode-web`.
    - Ensure dependencies (Lucide icons, `date-fns`) are available.

### Phase 2: Functional Actions
- [x] **Fix Redeem Button**:
    - Connect `href` to `couponData.offer_url`.
    - Add `target="_blank" rel="noopener noreferrer"`.
    - If no URL is provided, hide the button or make it just copy the code? (Current logic hides it if no URL, which is good).

### Phase 3: Validation & Polish
- [x] **Image Handling**:
    - Replaced URL input with `ImageUpload` component.
    - Standardized preview image container to `aspect-video` to prevent broken layouts.

## 3. Implementation Steps
### Step 1: Create Component
- [x] Create `apps/plaqode-web/components/qrcodes/preview/CouponPreview.tsx`.

### Step 2: Register Component
- [x] Update `ViewerClient` in the public app.
- [x] Update `QrContentPreviewModal` in the dashboard.

### Step 3: Polish
- [x] Add "Image Upload" feature.

## 4. Verification Checklist
- [x] **Scanner**: Scan Coupon -> Page loads (Not 404).
- [x] **Actions**: Click "Copy Code" -> Copies to clipboard.
- [x] **Redeem**: Click "Redeem Now" -> Opens `offer_url`.
- [x] **Image**: Upload image -> Shows correctly in preview.

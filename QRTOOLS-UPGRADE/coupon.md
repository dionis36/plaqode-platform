# Coupon QR Tool Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: 🔴 **CRITICAL FAILURE**

### 🚨 Critical Deficiencies
1.  **Missing Scanner Implementation**:
    - `CouponPreview.tsx` does **NOT EXIST** in `apps/plaqode-web`.
    - Like Business Page, this tool functions in the studio but leads to nowhere for the end-user.
2.  **Redeem Button Logic**:
    - The `Redeem Now` button in the studio preview has `href="#"`. It doesn't actually go to the `offer_url`.

### ✅ Working Features (Studio Side)
- **UI Design**: The coupon card design (ticket style, dashed lines, copy button) is excellent.
- **Form**: Good coverage (Code, Valid Until, Terms, Button Label).

---

## 2. Upgrade Requirements
### Phase 1: Create Scanner Page
- [ ] **Port Preview Component**:
    - Copy `CouponPreview.tsx` to `plaqode-web`.
    - Ensure dependencies (Lucide icons, `date-fns`) are available.

### Phase 2: Functional Actions
- [ ] **Fix Redeem Button**:
    - Connect `href` to `couponData.offer_url`.
    - Add `target="_blank" rel="noopener noreferrer"`.
    - If no URL is provided, hide the button or make it just copy the code? (Current logic hides it if no URL, which is good).

### Phase 3: Validation & Polish
- [ ] **Date Validation**:
    - Ensure `Valid Until` date is not in the past during creation.
- [ ] **Scallop Edge Effect**:
    - The preview mentions "Top Scallop Border (Simulated via CSS mask... sticking to simple flex for now)".
    - *Nice to have*: Add a real CSS mask for that authentic coupon look.

## 3. Implementation Steps
### Step 1: Create Component
Create `apps/plaqode-web/components/qrcodes/preview/CouponPreview.tsx`.
- Copy code from Studio.
- Fix the `href="#"` issue.

### Step 2: Register Component
Update `QRCodePreviewFactory` in the public app to render this component for `type: 'coupon'`.

### Step 3: Polish
- Add a "Confetti" effect when the user clicks "Copy Code" (using `canvas-confetti` if available, or just a nice toast).

## 4. Verification Checklist
- [ ] **Scanner**: Scan Coupon -> Page loads (Not 404).
- [ ] **Actions**: Click "Copy Code" -> Copies to clipboard.
- [ ] **Redeem**: Click "Redeem Now" -> Opens `offer_url`.
- [ ] **Expiry**: If date is passed, show "EXPIRED" badge? (Logic needed).

# Menu QR Tool Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: ✅ **Feature Complete & Consistent**

### ✅ Working Features
- **Consistency**: `MenuPreview.tsx` in `apps/plaqode-web` is highly consistent with the Studio version.
- **Functionality**:
    - Categories & Items rendering is robust.
    - Currency support (USD/TSH).
    - Unavailability toggles work (greys out items).
    - Design customization (gradients, colors) is applied correctly.
    - Hero section adapts to cover images or gradients.

### ⚠️ Minor Issues / Polish
- **Empty State**:
    - If a user deletes all categories, the page shows "Add categories...". It might be nice to show a "Coming Soon" or fallback to the mockup data if completely empty.
- **Scrollbar**:
    - The preview hides scrollbars (`div::-webkit-scrollbar { display: none; }`), which is good for mobile aesthetics but verified it works on all browsers.

---

## 2. Upgrade Requirements
### Phase 1: Visual Enhancements (Low Priority)
- [ ] **Sticky Category Navigation**:
    - The category bar is sticky (`sticky top-0`). Ensure it z-indexes correctly over content on mobile.
- [ ] **Image Support for Items**:
    - Currently, only the Restaurant has images. Menu Items are text-only. *Future Feature*: Add image support for individual dishes.

### Phase 2: Code Quality
- [ ] **Type Sharing**:
    - Extract `MenuData`, `MenuCategory`, `MenuItem` interfaces to a shared package to avoid duplication between Studio and Public apps.

## 3. Implementation Steps
### No Critical Fixes Required
The Menu tool is in excellent shape. No immediate action is required unless "Item Images" is prioritized.

## 4. Verification Checklist
- [ ] **Scanner**: Scan Menu -> Loads correctly.
- [ ] **Interaction**: Click "Call" / "Website" -> Works.
- [ ] **Responsiveness**: Hero image scales correctly on mobile.

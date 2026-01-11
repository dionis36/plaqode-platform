# Social Media QR Tool Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: ⚠️ **PARTIALLY BROKEN**

### 🚨 Critical Deficiencies
1.  **Scanner Links Logic**:
    - The `SocialMediaPagePreview.tsx` (in `plaqode-web`) renders nice cards for each social link, but the `div` wrapper **is not an `<a>` tag and has no `onClick` handler**.
    - **Impact**: Touching/clicking the social cards **does absolutely nothing**. The user is trapped on the page.
2.  **Weak URL Validation**:
    - Form uses a regex for `http(s)://`, but if a user pastes `instagram.com/myprofile`, it will likely fail or require manual correction by the user.

### ✅ Working Features
- **UI/UX**: The "Link in Bio" design is excellent—clean, gradients, large touch targets.
- **Form**: Comprehensive platform list (Tier 1, 2, 3), drag-and-drop ordering (via `useFieldArray`), and gallery support.

---

## 2. Upgrade Requirements
### Phase 1: Fix Scanner Actions
- [ ] **Make Cards Clickable**:
    - Wrap the social card `div` in an `<a>` tag (`href={link.url}`).
    - Add `target="_blank" rel="noopener noreferrer"`.
- [ ] **Data Validation**:
    - Ensure `galleryImages` logic handles empty strings robustly (it seems to do so partially).

### Phase 2: Form Enhancements
- [ ] **Smart URL Inputs**:
    - If platform is "Instagram", allow user to just type `@username` and auto-format to `https://instagram.com/username` on save/blur.
    - *Decision*: For now, stick to full URL but fix the validation message to be clearer: "Must start with https://".

### Phase 3: Visual Polish
- [ ] **Gallery Lightbox**:
    - Current gallery images are static. Clicking them should ideally open a fullscreen lightbox view (using `yet-another-react-lightbox` or similar if available, or just simple modal).
    - *Scope*: Low priority. Main fix is the links.

## 3. Implementation Steps
### Step 1: Fix Preview Component
Modify `apps/plaqode-web/components/qrcodes/preview/SocialMediaPagePreview.tsx`.
- Change the `div` container for social links to an `<a>` tag.
- Apply `target="_blank"` attributes.

### Step 2: Form Tweaks
Modify `apps/qrstudio-web/src/components/wizard/forms/SocialMediaPageForm.tsx`.
- Update regex message to "URL must start with http:// or https://".

## 4. Verification Checklist
- [ ] **Scanner**: Click Instagram Card -> Opens Instagram App/Web in new tab.
- [ ] **Scanner**: Click Website Card (Custom Label) -> Opens Website.
- [ ] **Design**: Gradient background renders correctly on mobile.

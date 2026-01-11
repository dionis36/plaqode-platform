# vCard QR Tool Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: 🔴 **CRITICAL ISSUES FOUND**

### ✅ Working Features
- **UI Structure**: Good breakdown of sections (Personal, Contact, Social, Address).
- **Styling**: Theme engine (Colors, Gradients) works well.
- **Social Icons**: Nice visual picker for social networks.
- **State Management**: Real-time preview updates work via `useWizardStore`.

### 🚨 Critical Deficiencies (Must Fix)
1.  **"Save Contact" Button is Broken**:
    - The button in both `qrstudio-web` and `plaqode-web` has **NO `onClick` handler**. It is purely cosmetic.
    - **Impact**: End-users cannot actually save the contact details.
2.  **Weak Validation**:
    - Only `Mobile Number` is required.
    - `First Name` is optional (A vCard without a name is useless).
    - No format validation for Emails or URLs (User can type "hello" in website).

### ⚠️ Improvements Needed
- **Code Duplication**: `VCardPreview.tsx` is duplicated across `qrstudio-web` and `plaqode-web`. Logic changes (like adding the VCF generator) must be manually synced.
- **VCF Standard**: No VCF generation logic exists. Need to ensure VCF 3.0/4.0 compliance for iOS/Android compatibility.

---

## 2. Upgrade Requirements
### Phase 1: Fix Core Funtionality (Scanner UX)
- [ ] **Implement VCF Generator**:
    - Use a utility (e.g., `vcards-js` or custom string builder) to compile form data into a `.vcf` string.
    - Fields to map: Name, Org, Title, Phone (Mobile/Work), Email, URL, Address, Social URLs (as `X-SOCIALPROFILE` or Notes), Note.
    - **Crucial**: iOS requires correctly formatted Base64 photos for avatars in VCF.
- [ ] **Activate "Save Contact" Button**:
    - Add `onClick` to trigger VCF download.
    - Filename should be `{FirstName}_{LastName}.vcf`.

### Phase 2: Form & Validation (Creator UX)
- [ ] **Validation Rules** (Update `VCardForm.tsx`):
    - **Required**: `First Name` (or Company Name if personal is empty), `Mobile Number`.
    - **Patterns**: valid Email, valid URL (starting with `http` or auto-fix).
- [ ] **UX Enhancements**:
    - Show validation errors clearly.
    - Auto-prepend `https://` to website/social inputs if missing.

### Phase 3: Visual Polish
- [ ] **Sticky CTAs**: Make the "Save Contact" button sticky at the bottom on mobile for easy access.
- [ ] **Feedback**: Add a toast/notification when "Save Contact" is clicked ("Downloading contact card...").

## 3. Implementation Plan
### Step 1: Shared Logic
Create a shared utility for VCF generation to be used by the Preview component.
File: `packages/ui/src/utils/vcard-generator.ts` (or similar location)

### Step 2: Update Scanner (Plaqode Web)
Modify `apps/plaqode-web/components/qrcodes/preview/VCardPreview.tsx`:
- Import VCF generator.
- Implement download handler.
- Verify on iOS and Android.

### Step 3: Update Creator (QR Studio)
Modify `apps/qrstudio-web/src/components/wizard/forms/VCardForm.tsx`:
- Add Zod schema or React Hook Form rules.
- Test validation edges.

## 4. Verification Checklist
- [ ] **Functionality**: Click "Save Contact" -> Download `.vcf` file.
- [ ] **Data Check**: Import `.vcf` to phone -> Check Name, Avatar, Phone, Email, Address, Socials exist.
- [ ] **Validation**: Try to submit empty form -> Blocked by "Required" errors.
- [ ] **Visual**: Page looks "Premium" on mobile (no layout shifts).

# Basic QR Tools Audit (Text, URL, Email, Message)

## 1. Overview
**Date**: 2026-01-11
**Scope**: `Text`, `URL`, `Email`, `Message` (SMS/WhatsApp/Telegram) components.

## 2. Audit Findings

### A. Text Tool
**Status**: ✅ **Feature Complete**
-   **Form**: `TextForm.tsx` works correctly.
-   **Preview**: `TextPreview.tsx` (Public) exists and matches Creator.
-   **Functionality**: Displays text. No actions required. Good to go.

### B. URL Tool
**Status**: ✅ **Feature Complete**
-   **Form**: `URLForm.tsx` works correctly.
-   **Preview**: `URLPreview.tsx` (Public) exists and includes redirect logic.
-   **Functionality**:
    -   Displays landing page with logo/title.
    -   Auto-redirects (countdown).
    -   Manual link "Click here" works.

### C. Email Tool
**Status**: 🔴 **CRITICAL DEFICIENCY (Broken Action)**
-   **Form**: `EmailForm.tsx` collects To, Subject, Body, CC, BCC.
-   **Preview**: `EmailPreview.tsx` (Public) renders these details beautifully.
-   **Issue**: The "Open Email App" button is **inert**. It lacks an `onClick` or `<a>` wrapper.
-   **Fix**: Wrap the button in an `<a>` tag with a dynamic `mailto:` link.
    -   *Format*: `mailto:to?subject=...&body=...&cc=...&bcc=...`

### D. Message Tool
**Status**: 🔴 **CRITICAL DEFICIENCY (Broken Action)**
-   **Form**: `MessageForm.tsx` collects Phone, Message, Platform (SMS/WhatsApp/Telegram).
-   **Preview**: `MessagePreview.tsx` renders details nicely.
-   **Issue**: The Action Button ("Send SMS", etc.) is **inert**.
-   **Fix**:
    -   **SMS**: `<a href="sms:number?body=message">`
    -   **WhatsApp**: `<a href="https://wa.me/number?text=message">`
    -   **Telegram**: `<a href="https://t.me/username">` (or `tg://` but `https://t.me` is safer for web).

---

## 3. Upgrade Plan

### Phase 1: Fix Email Actions
-   [ ] **Modify `EmailPreview.tsx`**:
    -   Construct `mailto` string dynamically.
    -   Wrap button in `<a href={mailtoLink}>`.

### Phase 2: Fix Message Actions
-   [ ] **Modify `MessagePreview.tsx`**:
    -   Implement `getLink(platform, data)` helper.
    -   Wrap button in `<a href={link}>`.

## 4. Verification
-   [ ] **Email**: Scan -> Click "Open Email" -> Default Mail App opens with pre-filled fields.
-   [ ] **SMS**: Scan -> Click "Send SMS" -> Messages App opens.
-   [ ] **WhatsApp**: Scan -> Click "Open WhatsApp" -> WhatsApp Web/App opens.

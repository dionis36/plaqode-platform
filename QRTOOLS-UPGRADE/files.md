# Files QR Tool Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: ⚠️ **FUNCTIONALLY BROKEN (Actions)**
**Rebranding**: Renaming from "PDF" to "Files" to reflect multi-format support.

### 🚨 Critical Deficiencies
1.  **Inert Action Buttons**:
    -   In both Studio and Public previews, the "View File" and "Download" buttons are **purely cosmetic**.
    -   They lack `onClick` handlers or `href` attributes.
    -   **Impact**: Users cannot open or download the file they just scanned.
2.  **Naming Inconsistency**:
    -   Codebase uses `PDFForm`, `PDFPreview`, `pdf_file` payload key, even though it supports Images, Audio, and Video.
    -   This causes confusion (e.g., uploading an MP3 to a "PDF" tool).

### ✅ Working Features
-   **Multi-Format Support**: The form *already* properly handles:
    -   **Documents**: PDF, DOC, DOCX, XLS, PPT.
    -   **Images**: JPG, PNG, GIF, SVG, WEBP.
    -   **Audio/Video**: MP3, MP4.
    -   **Archives**: ZIP, RAR.
-   **File Processing**: Converts to Base64 and detects MIME types correctly.
-   **Thumbnailing**: Advanced client-side PDF thumbnailing exists.

---

## 2. Upgrade Requirements
### Phase 1: Functional Fixes (Critical)
-   [ ] **Enable File Access**:
    -   Convert "View File" buttons to `<a>` tags with `href={dataUri}`.
    -   Add `download` attribute for the secondary button.
-   [ ] **Dynamic Labels**:
    -   Ensure button says "Play Audio" for MP3s, "View Image" for pictures, etc. (Logic partially exists, needs verification).

### Phase 2: Refactor & Rename (The "Files" Transition)
-   [ ] **Rename Components**:
    -   `PDFForm.tsx` -> `FileForm.tsx`
    -   `PDFPreview.tsx` -> `FilePreview.tsx`
-   [ ] **Update Payload Schema** (Careful Migration):
    -   Front-end currently uses `pdf_file`.
    -   *Decision*: Keep the `pdf_file` key in the JSON blob to maintain backward compatibility with any existing QR codes (if any), OR migrate if we are still in pre-production.
    -   *Recommendation*: Alias it or update the types to `file_payload` but keep the key `pdf_file` for now to minimize database migration risk, or do a clean break if this is a new feature. **Since we are upgrading, let's stick to the existing data key `pdf_file` but rename interface properties in the UI code.**

### Phase 3: UI Polish
-   [ ] **Scanner Experience**:
    -   For Audio/Video: Embed a simple HTML5 player `<audio>` or `<video>` in the preview if the file is small enough?
    -   *Limit*: Current implementation stores Base64. Large video playback might be laggy. Stick to "Download" for valid MVP.

## 3. Implementation Steps
### Step 1: Component Renaming
-   Rename `apps/qrstudio-web/src/components/wizard/forms/PDFForm.tsx` -> `FileForm.tsx`.
-   Rename `apps/qrstudio-web/src/components/wizard/preview/PDFPreview.tsx` -> `FilePreview.tsx`.
-   Rename `apps/plaqode-web/components/qrcodes/preview/PDFPreview.tsx` -> `FilePreview.tsx`.
-   Update imports in `QRCodePreviewFactory` and `Wizard` steps.

### Step 2: Fix Preview Logic
-   **Wire up the buttons**:
    ```tsx
    <a
      href={`data:${fileType};base64,${fileData}`}
      download={fileName} // For download button
      ...
    >
    ```

### Step 3: UI Label Audit
-   Scan `FileForm.tsx` for "PDF" strings and replace with "File" or "Document".

## 4. Verification Checklist
-   [ ] **Refactor**: Application builds without errors after renaming.
-   [ ] **Functionality**:
    -   Upload MP3 -> Preview shows Music Icon -> "Download" saves as .mp3.
    -   Upload PDF -> Preview shows Thumbnail -> "View" opens PDF.

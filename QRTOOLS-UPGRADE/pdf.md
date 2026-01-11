# PDF QR Tool Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: ⚠️ **FUNCTIONALLY BROKEN (Actions)**

### 🚨 Critical Deficiencies
1.  **Inert Action Buttons**:
    -   In both Studio and Public previews, the "Read PDF" / "View File" and "Download" buttons are **purely cosmetic**.
    -   They are `<button>` elements with no `onClick` handlers and no parent `<a>` tags.
    -   **Impact**: Users cannot open or download the file they just scanned.
2.  **Fullscreen Mode Inert**:
    -   If `fullscreen_mode` is enabled, the UI changes to a "Direct Link" view, but it still **does nothing**.

### ✅ Working Features
-   **File Handling**: Form correctly converts files to Base64 and stores metadata (size, type, name).
-   **Thumbnail Generation**: Client-side PDF thumbnail generation using `pdfjs-dist` is implemented and looks sophisticated.
-   **UI Design**: Clean, distinctive file icons, metadata display.

---

## 2. Upgrade Requirements
### Phase 1: Enable File Access
-   [ ] **Implement Download/View Logic**:
    -   Convert "Read PDF" button to an `<a>` tag.
    -   **Href**: `data:${fileType};base64,${fileData}`.
    -   **Attributes**: `target="_blank"` (for viewing) or `download={fileName}` (for downloading).
-   [ ] **Fix Fullscreen Auto-Open**:
    -   The "Fullscreen Mode" implies the file should open immediately.
    -   *Constraint*: Browsers often block auto-opening of data URIs or popups.
    -   *Alternative*: Make the whole page a giant "Click to Open" button or ensure the central button works.

### Phase 2: Optimization
-   [ ] **Large File Handling**:
    -   Storing >5MB files as Base64 strings in the JSON payload might be heavy for the client.
    -   *Future Consideration*: Upload to cloud storage (S3/R2) and store URL instead. (Out of scope for this immediate fix, but worth noting).

## 3. Implementation Steps
### Step 1: Fix Public Preview
Modify `apps/plaqode-web/components/qrcodes/preview/PDFPreview.tsx`.
-   Change buttons to `<a>` tags.
-   Use `download` attribute for the "Download" button.
-   Verify Data URI construction is safe/correct for all file types.

### Step 2: Fix Studio Preview
Match the fixes in `apps/qrstudio-web/src/components/wizard/preview/PDFPreview.tsx` so the creator can test the buttons.

## 4. Verification Checklist
-   [ ] **PDF**: Scan -> Click "Read PDF" -> Opens PDF in browser native viewer.
-   [ ] **Download**: Click "Download" -> prompt to save file with correct name.
-   [ ] **Image**: Upload JPG -> "View File" opens image in new tab.

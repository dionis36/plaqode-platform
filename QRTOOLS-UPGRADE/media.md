# Media QR Tools (Audio & Video) Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: 🔴 **CRITICAL FAILURE (Public Preview Missing)**

### 🚨 Critical Deficiencies
1.  **Missing Public Components**:
    -   `AudioPreview.tsx` and `VideoPreview.tsx` DO NOT EXIST in `apps/plaqode-web/components/qrcodes/preview/`.
    -   **Impact**: Scanning an Audio or Video QR will result in a blank page or 404 error for the end-user.
2.  **Redundancy**:
    -   The `Files` tool (formerly `PDF`) naturally handles MP3/MP4/Mov files.
    -   `AudioForm` and `VideoForm` are essentially subset duplicates of `FileForm` but with specific UI fields (Cover Art for audio, Youtube/Vimeo support for video).

### ✅ Working Features
-   **Forms**: exist in Studio (`AudioForm.tsx`, `VideoForm.tsx`) and correctly save data.
-   **Studio Preview**: likely exists for both (confirmed `AudioPreview.tsx` and `VideoPreview.tsx` in `apps/qrstudio-web/.../preview`).

---

## 2. Upgrade Requirements
### Phase 1: Port Previews (Critical)
-   [ ] **Create Public Previews**:
    -   Copy `AudioPreview.tsx` and `VideoPreview.tsx` from `qrstudio-web` to `plaqode-web`.
    -   Ensure imports (icons, Next.js Image) are adjusted.
-   [ ] **Functionality Check**:
    -   **Audio**: Ensure playback works (HTML5 `<audio>` tag).
    -   **Video**: Ensure YouTube/Vimeo embeds work (iframe) and direct MP4 links work (`<video>` tag).

### Phase 2: Consolidation Strategy (Decision Required)
-   *Option A*: Keep them separate. "Audio" allows for "Album Art" and "Artist Name" which "File" (generic) doesn't explicitly highlight. "Video" supports YouTube/Vimeo links which "File" does not (Files handles uploads).
-   *Recommendation*: **Keep them separate** for better UX. The "Video" tool's ability to embed YouTube/Vimeo is distinct from "uploading a video file". The "Audio" tool's metadata (Artist/Title) is music-specific.

## 3. Implementation Steps
### Step 1: Port AudioPreview
-   Copy `apps/qrstudio-web/.../preview/AudioPreview.tsx` -> `apps/plaqode-web/.../preview/AudioPreview.tsx`.
-   Verify `<audio controls>` implementation.

### Step 2: Port VideoPreview
-   Copy `apps/qrstudio-web/.../preview/VideoPreview.tsx` -> `apps/plaqode-web/.../preview/VideoPreview.tsx`.
-   Verify `iframe` logic for YouTube/Vimeo.

## 4. Verification Checklist
-   [ ] **Audio**: Scan -> Play MP3 -> Works.
-   [ ] **Video - YouTube**: Scan -> Play embedded YouTube video -> Works.
-   [ ] **Video - Upload**: Scan -> Play uploaded MP4 -> Works.

# WiFi QR Tool Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: 🔴 **BROKEN / UNUSABLE**

### 🚨 Critical Deficiencies (Must Fix)
1.  **Missing SSID Input (Form)**:
    - **Severity**: BLOCKER
    - The `WiFiForm.tsx` file defines `ssid` in the type, but **there is NO input field** in the JSX to actually enter the Network Name.
    - Users can select Security and Password, but cannot specify *which* network to connect to.
2.  **"Connect to Network" Button (Scanner)**:
    - **Severity**: HIGH
    - The button in `WiFiPreview.tsx` has no `onClick` handler.
    - Browsers cannot directly trigger WiFi connections via JavaScript. The button implies a function that doesn't exist.

### ✅ Working Features
- **Security Logic**: Correctly handles WPA/WEP/Open logic for password field visibility.
- **Theming**: Gradient and color selection works.
- **Security Badges**: Logic to show "Secured" or "Open" badges is sound.

---

## 2. Upgrade Requirements
### Phase 1: Fix Core Functionality (Creator UX)
- [ ] **Add SSID Input Field**:
    - Location: `WiFiForm.tsx` inside "WiFi network details" accordion.
    - Validation: **Required**.
    - Type: Text input.
    - Placeholder: "MyHomeNetwork".

### Phase 2: Fix Scanner UX (End User)
- [ ] **Refine "Connect" Action**:
    - Since we cannot force-connect, change the primary action to **"Copy Password"**.
    - Show a toast message: "Password copied! Go to Settings > WiFi and paste it."
- [ ] **Add "Scan to Connect" QRC**:
    - Display the raw QR code image (generated client-side via `qrcode.react` or similar) on the landing page again?
    - *Decision*: For now, stick to "Copy Password" as it's the most reliable web-based interaction.
    - Rename button from "Connect to Network" to **"Copy Password"**.

### Phase 3: Visual Polish
- [ ] **Instructional Text**: Add a small help text: "To connect, copy the password and select **{ssid}** in your WiFi settings."

## 3. Implementation Steps
### Step 1: Update Form
Modify `apps/qrstudio-web/src/components/wizard/forms/WiFiForm.tsx`:
- Add SSID input field before Security Type.
- Register with `required: 'Network name (SSID) is required'`.

### Step 2: Update Scanner
Modify `apps/plaqode-web/components/qrcodes/preview/WiFiPreview.tsx` (and the Studio preview):
- Change Button Text: "Copy Password".
- Add `onClick` -> `navigator.clipboard.writeText(password)`.
- Use `sonner` or `toast` for feedback.

## 4. Verification Checklist
- [ ] **Form**: Can enter SSID "Home-WiFi-5G".
- [ ] **Validation**: Form cannot be saved without SSID.
- [ ] **Scanner**: Click "Copy Password" -> Clipboard contains correct password.

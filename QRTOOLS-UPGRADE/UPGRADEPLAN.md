# QR Tool Master Upgrade Roadmap

**Date**: 2026-01-11
**Objective**: Systematically upgrade all 17 QR tools to production quality, prioritizing broken functionality and missing components.

## 1. 🛡️ The Upgrade Protocol (Standard Operating Procedure)
**MUST FOLLOW for every single tool upgrade:**

1.  **Public Parity Check**: The `Preview` component in `apps/qrstudio-web` (Creator) MUST have an exact twin in `apps/plaqode-web` (Public Viewer).
2.  **Action Verification**: Every button (Save, Download, Link, Email) MUST be clickable and perform the expected action. No inert buttons allowed.
3.  **Validation Hardening**: Form inputs in Creator must have robust regex validation (Url, Email, Phone) to prevent broken QR codes.
4.  **Mobile Responsiveness**: Public views must be optimized for mobile screens (the primary use case for scanning).
5.  **Fallback Data**: Public views should gracefully handle missing data fields without crashing or showing "undefined".
6.  **"Powered By" Branding**: Consistent footer branding across all tools.

---

## 2. 🗺️ Roadmap & Priority Ranking

### 🚨 Phase 1: Critical Rescue (Missing Public Components)
*These tools currently result in a 404/Blank page for end-users. They are completely unusable.*

#### 1. Business Page
*   **Status**: ✅ **GOOD**
*   **Must Consider**:
    *   Directions Button: Must open Google Maps with lat/long or address query.
    *   Operating Hours: Handle complex opening/closing logic or just display static text nicely.
    *   Contact Links: Phone should be `tel:`, Email `mailto:`, Website `https://`.

#### 2. Coupon
*   **Status**: ✅ **GOOD**
*   **Must Consider**:
    *   "Redeem" Logic: Should it just show the code? Or copy to clipboard? (Copy to clipboard is best for simple coupons).
    *   Expiry: Visual indicator if the coupon date has passed.
    *   Countdown: Optional "Time remaining" badge.

#### 3. Media (Audio / Video)
*   **Status**: 🔴 **MISSING PREVIEW**
*   **Must Consider**:
    *   **Audio**: Needs a custom HTML5 audio player or embed styling (SoundCloud/Spotify).
    *   **Video**: Must support YouTube/Vimeo embeds (iframe) AND direct MP4 files (video tag).
    *   **Autoplay**: Generally avoid autoplay on mobile; let user initiate.

#### 4. Feedback & Review
*   **Status**: ✅ **GOOD**
*   **Must Consider**:
    *   **Review**: Ensure deep links to Google Review/Yelp are correct.
    *   **Feedback**: "Submit" button needs a destination.
        *   *MVP Fix*: `mailto:` link populated with user's feedback.
        *   *Ideal*: API endpoint (deferred to Phase 3 if backend not ready).

---

### Phase 2: Functional Repair (Broken Actions)
*These tools display correctly, but the main "Action" buttons do nothing.*

#### 5. Social Media
*   **Status**: ✅ **GOOD**
*   **Must Consider**:
    *   The card container itself should be the `<a>` tag.
    *   Strict URL validation: Ensure user entered `https://instagram.com/user`, not just `@user`.

#### 6. vCard (Contact)
*   **Status**: ✅ **GOOD**
*   **Must Consider**:
    *   **VCF Generation**: Must generate a valid `.vcf` file blob strictly client-side.
    *   **iOS Compatibility**: VCard versions (3.0 vs 4.0). Use 3.0 for broadest compatibility.
    *   Fields: Ensure Photo (Base64) is handled correctly if possible, or omitted if too large.

#### 7. Event
*   **Status**: ✅ **GOOD**
*   **Must Consider**:
    *   **ICS Generation**: Generate standard `.ics` file blob.
    *   **Timezones**: Ensure start/end times are formatted correctly (UTC vs Local).
    *   **Google Calendar Link**: Provide an alternative "Open in Google Calendar" URL for Android users.

#### 8. Files (PDF/Download)
*   **Status**: ✅ **GOOD**
*   **Must Consider**:
    *   **Data URI**: Files are currently stored as Base64.
    *   **Download Attribute**: `<a href="data:..." download="filename">`.
    *   **Viewer**: PDF viewer implementation (using `iframe` or `react-pdf`) vs simple "Download" button.

#### 9. App Store
*   **Status**: ⚠️ **BROKEN BADGES**
*   **Must Consider**:
    *   Smart Redirect: (Optional) Detect OS and redirect to relevant store automatically?
    *   Simple Fix: Just ensure the badges link to the URLs provided by the creator.

#### 10. Email & SMS
*   **Status**: ⚠️ **BROKEN ACTIONS**
*   **Must Consider**:
    *   **Email**: `mailto:` scheme construction.
    *   **SMS**: `sms:` scheme (iOS relies on `&` vs `?` separator sometimes, stick to standard).
    *   **WhatsApp**: `https://wa.me/` link generation.

---

### Phase 3: Polish & Consistency (Enhancements)
*Fully functional tools that are ready for production but could use visual tweaks.*

#### 11. WiFi
*   **Status**: ✅ **GOOD**
*   **Must Consider**:
    *   "Connect" Button: Android supports WiFi configuration via QR. iOS does not (it only prompts to join when scanning the raw QR code strings, not a web page).
    *   *Correction*: A web page *cannot* force a phone to join WiFi. The "Connect" button usually just copies the password to clipboard or shows the raw QR code image for scanning.

#### 12. Menu
*   **Status**: ✅ **EXCELLENT (GOLD STANDARD)**
*   **Must Consider**:
    *   Use this as the template for other "List" type tools.
    *   Check image optimization/loading speeds.

#### 13. Text & URL
*   **Status**: ✅ **GOOD**
*   **Must Consider**:
    *   URL Redirect: Countdown timer animation is a nice touch (already present).

---

## 3. General Implementation Checklist
For each tool upgrade in the roadmap above:

- [ ] Open `QRTOOLS-UPGRADE/[tool].md` for specific issue details.
- [ ] **Creator App**: Edit `apps/qrstudio-web/src/components/wizard/forms/[Tool]Form.tsx` (Add validation).
- [ ] **Creator App**: Edit `apps/qrstudio-web/src/components/wizard/preview/[Tool]Preview.tsx` (Fix preview interaction).
- [ ] **Public App**: **Copy/Create** `apps/plaqode-web/components/qrcodes/preview/[Tool]Preview.tsx`.
- [ ] **Verify**: Run `dev` and test local preview and actions.
- [ ] **Mark Complete**: Update this roadmap.

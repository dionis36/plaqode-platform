# Event QR Tool Audit & Upgrade Plan

## 1. Current Implementation Audit
**Date**: 2026-01-11
**Status**: 🔴 **CRITICAL ISSUES FOUND**

### 🚨 Critical Deficiencies
1.  **"Add to Calendar" Button is Inert**:
    - The most important feature—adding the event to the user's calendar—is **missing**. The button exists in `EventPreview.tsx` but has no `onClick` handler.
    - **Impact**: The entire tool is useless for the end-user.
2.  **Date/Time Validation**:
    - `EventForm.tsx` has basic HTML validation (`required`), but no logic to ensure `End Date` >= `Start Date`.
    - No validation for `End Time` > `Start Time` if on the same day.

### ✅ Working Features
- **Form Fields**: Comprehensive coverage (Location, URL, Timezone, Reminders, Organizer).
- **Timezone Support**: Good list of international timezones.
- **UI**: Clean preview with Calendar icon and clear details.

---

## 2. Upgrade Requirements
### Phase 1: Scanner Functionality (The "Magic" Moment)
- [ ] **Implement ICS Generator**:
    - Create a utility to generate an `.ics` (iCalendar) file string.
    - Must handle converting the selected Timezone to UTC (zulu time) or proper local floating time.
    - Fields: `SUMMARY`, `DTSTART`, `DTEND`, `LOCATION`, `DESCRIPTION`, `URL`.
- [ ] **Dual Calendar Actions**:
    - **Primary Action**: "Add to Calendar" (Downloads .ics file - universal support).
    - **Secondary**: "Google Calendar" link (for convenience on Android/Web).
    - **Apple Wallet**: (Stretch goal) - `.pkpass` but that requires backend signing. We will stick to `.ics`.

### Phase 2: Form Logic (Creator UX)
- [ ] **Smart Date Validation**:
    - If user picks Start Date `2024-01-01`, End Date should default to same.
    - Prevent picking an End Date *before* Start Date.
- [ ] **Timezone Detection**:
    - Confirm `browserTimezone` initialization works reliably.

### Phase 3: Visuals
- [ ] **Countdown Timer**: Add a "Starts in X days/hours" badge on the landing page if the event is upcoming.

## 3. Implementation Steps
### Step 1: ICS Utility
Create `packages/ui/src/utils/ics-generator.ts`.
- Function `generateICS(event: EventData): string`.

### Step 2: Scanner Update
Modify `apps/plaqode-web/components/qrcodes/preview/EventPreview.tsx`.
- Connect "Add to Calendar" to `downloadICS()`.
- Add "Add to Google Calendar" link generator.

### Step 3: Form Update
Modify `apps/qrstudio-web/src/components/wizard/forms/EventForm.tsx`.
- Improve Zod/React Hook Form validation rules for dates.

## 4. Verification Checklist
- [ ] **Form**: Try to set End Date < Start Date -> Error shown.
- [ ] **Scanner (iOS)**: Click "Add to Calendar" -> Native iOS Calendar sheet opens.
- [ ] **Scanner (Android)**: Click "Add to Calendar" -> Downloads ICS, prompts to add.
- [ ] **Data Integrity**: Timezone conversion is correct (Event at 9AM NY appears as 9AM NY for everyone or correct local time?).

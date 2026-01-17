# Color Pickers List

## 1. Property Panel
**File:** `apps/cardify/components/editor/PropertyPanel.tsx`

**Component Used:** `ColorPicker` (Unified Component) [x]
- Replaced `ColorPickerWithSwatch`.

**Usage Locations:**
- [x] **Text Color:** Label "Color" (line ~380)
- [x] **Icon Color:** Label "Icon Color" (line ~419, 429)
- [x] **Icon Background:** Label "Background" (line ~422)
- [x] **Icon Border:** Label "Border Color" (line ~432)
- [x] **Shape Fill:** Label "Fill Color" (line ~564)
- [x] **Shape Stroke/Border:** Label "Stroke Color" / "Border Color" (line ~578)
- [x] **Shadow:** Label "Shadow Color" (line ~695)

---

## 2. Left Panel
The Left Panel in Cardify is composed of multiple sub-panels managed by `EditorSidebar.tsx`.

### A. Background Panel
**File:** `apps/cardify/components/editor/BackgroundPanel.tsx`

**Component Used:** `ColorPicker` (Unified Component) [x]
- Replaced `ColorPickerInput`.

**Usage Locations:**
- [x] **Solid Background:** Label "Custom Color" (line ~130)
- [x] **Gradient Stops:** Inputs in "Color Stops" section (line ~196)
- [x] **Pattern Background:** Label "Background Color" (line ~259)
- [x] **Pattern Foreground:** Label "Pattern Color" (line ~265)
- [x] **Texture Base:** Label "Base Color" (line ~301)
- [x] **Texture Overlay:** Label "Overlay Tint" (line ~306)

### B. QR Code Designer (Sidebar Panel)
**File:** `apps/cardify/components/editor/QRCodeDesigner.tsx`

**Component Used:** `ColorPicker` (Unified Component) [x]

**Usage Locations:**
- [x] **Foreground:** Label "Foreground Color" (line ~437)
- [x] **Background:** Label "Background Color" (line ~443)

---

## 3. QRTools Pages (Wizard Forms)
**Files:** `apps/qrstudio-web/src/components/wizard/forms/*.tsx`

**Component Used:** `ColorPicker` (Unified Component) [x]
- Replaced Native `<input type="color" />`

**Forms Upgraded:**
- [x] `AppStoreForm.tsx`
- [x] `AudioForm.tsx`
- [x] `BusinessPageForm.tsx`
- [x] `CouponForm.tsx`
- [x] `EmailForm.tsx`
- [x] `EventForm.tsx`
- [x] `FeedbackForm.tsx`
- [x] `FileForm.tsx`
- [x] `GalleryForm.tsx`
- [x] `MenuForm.tsx`
- [x] `MessageForm.tsx`
- [x] `ReviewForm.tsx`
- [x] `SocialMediaPageForm.tsx`
- [x] `TextForm.tsx` (Note: TextForm might have been renamed or merged, verified existence)
- [x] `URLForm.tsx`
- [x] `VCardForm.tsx`
- [x] `VideoForm.tsx`
- [x] `WiFiForm.tsx`

---

## 4. QRTools QRCode Design Page
**File:** `apps/qrstudio-web/src/components/wizard/steps/DesignControls.tsx`
- [x] Uses `HexColorPicker` from `react-colorful` directly (Inline implementation).

**File:** `apps/qrstudio-web/src/app/create/[template]/design/DesignClient.tsx`
- [x] Upgraded to `ColorPicker` (Unified Component).

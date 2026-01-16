# Color Pickers List

## 1. Property Panel
**File:** `apps/cardify/components/editor/PropertyPanel.tsx`

**Component Used:** `ColorPickerWithSwatch` (Internal Helper Component)
- Wraps a native `<input type="color" />` and a text input.

**Usage Locations:**
- **Text Color:** Label "Color" (line ~380)
- **Icon Color:** Label "Icon Color" (line ~419, 429)
- **Icon Background:** Label "Background" (line ~422)
- **Icon Border:** Label "Border Color" (line ~432)
- **Shape Fill:** Label "Fill Color" (line ~564)
- **Shape Stroke/Border:** Label "Stroke Color" / "Border Color" (line ~578)
- **Shadow:** Label "Shadow Color" (line ~695)

---

## 2. Left Panel
The Left Panel in Cardify is composed of multiple sub-panels managed by `EditorSidebar.tsx`.

### A. Background Panel
**File:** `apps/cardify/components/editor/BackgroundPanel.tsx`

**Component Used:** `ColorPickerInput` (Internal Helper Component)
- Wraps a native `<input type="color" />`.

**Usage Locations:**
- **Solid Background:** Label "Custom Color" (line ~130)
- **Gradient Stops:** Inputs in "Color Stops" section (line ~196)
- **Pattern Background:** Label "Background Color" (line ~259)
- **Pattern Foreground:** Label "Pattern Color" (line ~265)
- **Texture Base:** Label "Base Color" (line ~301)
- **Texture Overlay:** Label "Overlay Tint" (line ~306)

### B. QR Code Designer (Sidebar Panel)
**File:** `apps/cardify/components/editor/QRCodeDesigner.tsx`

**Component Used:** `ColorPicker` (Imported from `@/components/editor/ColorPicker`)
- **File:** `apps/cardify/components/editor/ColorPicker.tsx`
- likely wraps native input or a library.

**Usage Locations:**
- **Foreground:** Label "Foreground Color" (line ~437)
- **Background:** Label "Background Color" (line ~443)

---

## 3. QRTools Pages (Wizard Forms)
**Files:** `apps/qrstudio-web/src/components/wizard/forms/*.tsx`
(e.g., `CouponForm.tsx`, `AudioForm.tsx`, `FeedbackForm.tsx`, etc.)

**Component Used:** Native `<input type="color" />`
- These are implemented directly within the form components, usually paired with a text input.

**Usage Locations (Common across forms):**
- **Primary Theme Color:** Label "Primary color"
- **Secondary Theme Color:** Label "Secondary color"

**Example Files:**
- `apps/qrstudio-web/src/components/wizard/forms/CouponForm.tsx`
- `apps/qrstudio-web/src/components/wizard/forms/AudioForm.tsx`
- `apps/qrstudio-web/src/components/wizard/forms/FeedbackForm.tsx`
- ...and other forms in that directory.

---

## 4. QRTools QRCode Design Page
**File:** `apps/qrstudio-web/src/components/wizard/steps/DesignControls.tsx`

**Component Used:** `HexColorPicker` (from `react-colorful` library)

**Usage Locations:**
- **QR Foreground:** Label "QR Foreground Color" (line ~44)

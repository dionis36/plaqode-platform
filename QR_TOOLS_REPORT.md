# QR Tools Analysis & Expansion Report

## 1. Current QR Tools Overview
**Source**: `apps/plaqode-web/components/services/ToolsCatalog.tsx`

The Service Page currently advertises the following **12 Tools**:
1.  **Menu**: Digital restaurant menu
2.  **URL**: Link to any website or page
3.  **Text**: Display plain text messages
4.  **VCard**: Share contact details instantly
5.  **Email**: Send pre-filled emails
6.  **Message**: SMS, WhatsApp & Telegram (Combined)
7.  **WiFi**: Connect to WiFi automatically
8.  **Event**: Save events to calendar
9.  **App Store**: Download apps directly
10. **File**: Share PDF & documents ("Image Gallery" also links here)
11. **Social Media**: Link to all profiles (Link-in-Bio style)
12. **Image Gallery**: (Currently links to `/create/file`)

## 2. Recommended Expansion: The "New 6"
Based on your request, here are the **4 selected tools** plus **2 additional recommendations** to complete the set of 6 new valuable tools.

### 1. Google Reviews / Review Collector
*   **Purpose**: Boost online reputation.
*   **Function**: A specialized direct link that opens the "Write a Review" dialog for a specific business on Google Maps (or Yelp/TripAdvisor).
*   **Why it's important**: Small businesses crave reviews. A friction-free QR code that goes straight to the 5-star form is a top-tier value proposition.

### 2. Audio / MP3
*   **Purpose**: Share sound.
*   **Function**: A dedicated audio player page. Users upload an MP3 (music, podcast, guided tour narration, voice note).
*   **Why it's important**: Serves musicians, museums (audio guides), and podcasters better than a generic "File" download link.

### 3. Video
*   **Purpose**: Share visual engagement.
*   **Function**: A clean video player page. Supports embedding (YouTube/Vimeo) or direct uploads.
*   **Why it's important**: Video has higher engagement. A "Scan to Watch" code is perfect for product manuals, real estate tours, and welcome messages.

### 4. Business Page
*   **Purpose**: A mini-website for your business.
*   **Function**: A comprehensive landing page displaying:
    *   **Identity**: Logo, Cover Image, Business Name.
    *   **Info**: Description/About Us.
    *   **Operations**: Opening Hours (with "Open Now" indicator).
    *   **Location**: Embedded Map + "Get Directions" button.
    *   **Contact**: Call, Email, and Website buttons.
*   **Why it's important**: Unlike a VCard (which just saves a contact), this *shows* the business info visually. It acts as a mobile homepage for businesses without a website.

### 5. Feedback Form (Recommended)
*   **Purpose**: Collect private customer insights.
*   **Function**: A simple, mobile-friendly form where customers rate their experience (1-5 stars) and leave comments.
    *   **Logic**: High ratings can prompt "Share on Google," while low ratings go privately to the owner's email.
*   **Why it's important**: Complements "Google Reviews". Businesses need a "safe" channel for complaints to prevent them from becoming public 1-star reviews.

### 6. Coupon / Offer (Recommended)
*   **Purpose**: Drive sales and foot traffic.
*   **Function**: A landing page displaying a special offer (e.g., "10% Off", "Free Drink").
    *   **Features**: Can include a "Limited Time" countdown or a "Show this to cashier" verification button.
*   **Why it's important**: The #1 use case for QR codes in retail is marketing. A dedicated "Coupon" tool is highly attractive to merchants.

---

## 3. Implementation Notes

*   **Google Reviews**: Requires a Place ID finder integration or clear instructions for the user to find their link.
*   **Audio/Video**: Requires increasing storage limits or integrating with external hosts (AWS S3/Cloudinary) if allowing direct uploads.
*   **Business**: Can borrow heavily from the existing `SocialMediaPageForm` architecture but with structured fields for Hours and Address.
*   **Feedback**: Needs a backend service to email the responses to the QR creator.

## 4. "Morph & Multiply" Opportunities (Existing to New)
These remain relevant for expanding the toolset without new code:

*   **WhatsApp**: -> **Platform pre-selected Message Tool**.
*   **PDF Menu**: -> **File Tool** (marketed differently).
*   **Instagram**: -> **Social Media Tool** (simplified).

"use server";

import { Resend } from "resend";
import { z } from "zod";
import { env } from '@/lib/env';

const resend = new Resend(env.RESEND_API_KEY || "re_missing_api_key");

const feedbackSchema = z.object({
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().optional(),
    contactName: z.string().optional(),
    contactInfo: z.string().optional(),
    businessName: z.string().optional(),
    destinationEmail: z.string().email("Invalid destination email"),
    question: z.string().optional(),
});

export type FeedbackState = {
    success: boolean;
    message: string;
    errors?: {
        rating?: string[];
        destinationEmail?: string[];
        comment?: string[];
    };
};

export async function sendFeedbackEmail(prevState: FeedbackState, formData: FormData): Promise<FeedbackState> {
    const rawData = {
        rating: formData.get("rating"),
        comment: formData.get("comment"),
        contactName: formData.get("contactName"),
        contactInfo: formData.get("contactInfo"),
        businessName: formData.get("businessName"),
        destinationEmail: formData.get("destinationEmail"),
        question: formData.get("question"),
    };

    const validatedFields = feedbackSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Validation failed. Please check your inputs.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { rating, comment, contactName, contactInfo, businessName, destinationEmail, question } = validatedFields.data;

    try {
        const fromEmail = env.EMAIL_FROM || "onboarding@resend.dev";
        // If the user provided a contact name, we can include it in the subject
        const subject = `New ${rating}-Star Review${businessName ? ` for ${businessName}` : ''}`;

        const textContent = `
You received a new feedback response!

Question: ${question || 'N/A'}

Rating: ${rating} / 5 Stars
${comment ? `Comment:\n${comment}` : ''}

${(contactName || contactInfo) ? '--- Contact Details ---' : ''}
${contactName ? `Name: ${contactName}` : ''}
${contactInfo ? `Contact: ${contactInfo}` : ''}

--
Sent via Plaqode Feedback QR
        `.trim();

        await resend.emails.send({
            from: fromEmail,
            to: destinationEmail,
            subject: subject,
            text: textContent,
            // We could add HTML here for a nicer look in the future
            replyTo: contactInfo?.includes('@') ? contactInfo : undefined
        });

        return {
            success: true,
            message: "Feedback sent successfully!",
        };
    } catch (error) {
        console.error("Resend Feedback Error:", error);
        return {
            success: false,
            message: "Failed to send feedback. Please try again later.",
        };
    }
}

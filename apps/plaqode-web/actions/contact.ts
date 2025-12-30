"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY || "re_missing_api_key");

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactState = {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
};

export async function sendContactEmail(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    };

    const validatedFields = contactSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please fix the errors below.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, message } = validatedFields.data;

    try {
        await resend.emails.send({
            from: "Plaqode Website <onboarding@resend.dev>", // Or configured domain
            to: ["nasuwadio36@gmail.com"],
            replyTo: email, // Valid property name
            // Checking docs memory: Resend Node SDK uses camelCase usually? No, it often accepts snake_case object for API params but let's stick to standard `react-email` style or check.
            // Actually, Resend SDK `send` usually takes `from`, `to`, `subject`, `text`, `html`, `reply_to`.
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        return {
            success: true,
            message: "Message sent! We'll get back to you soon.",
        };
    } catch (error) {
        console.error("Resend Error:", error);
        return {
            success: false,
            message: "Failed to send message. Please try again later.",
        };
    }
}

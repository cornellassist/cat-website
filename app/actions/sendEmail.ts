"use server";

import { Resend } from "resend";
import { RECIPIENT_EMAIL, createEmailTemplate, ContactFormData } from "@/app/config/email.config";

/**
 * Server action to send contact form email
 * 
 * This function validates the form data and sends an email using Resend API.
 * 
 * @param data - Contact form data (firstName, lastName, email, message)
 * @returns Object with success status and optional error message
 */
export async function sendEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate required fields
    if (!data.firstName?.trim() || !data.lastName?.trim() || !data.email?.trim() || !data.message?.trim()) {
      return {
        success: false,
        error: "All fields are required. Please fill in all form fields."
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return {
        success: false,
        error: "Please enter a valid email address."
      };
    }

    // Check if RESEND_API_KEY is configured
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return {
        success: false,
        error: "Email service is not configured. Please contact the administrator."
      };
    }

    // Initialize Resend client
    const resend = new Resend(apiKey);

    // Create email template
    const { subject, html } = createEmailTemplate(data);

    // Send email
    const result = await resend.emails.send({
      from: "onboarding@resend.dev", // Change this to your verified domain in Resend
      to: RECIPIENT_EMAIL,
      replyTo: data.email.trim(), // Allow replying directly to the sender
      subject: subject,
      html: html,
    });

    // Check if email was sent successfully
    if (result.error) {
      console.error("Resend API error:", result.error);
      const message =
        process.env.NODE_ENV === "development" && result.error?.message
          ? result.error.message
          : "Failed to send email. Please try again later.";
      return {
        success: false,
        error: message
      };
    }

    return {
      success: true
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later."
    };
  }
}

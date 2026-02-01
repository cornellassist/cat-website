/**
 * Email Configuration
 * 
 * This file contains the email recipient address and template function.
 * Edit these values to customize where emails are sent and how they're formatted.
 */

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

/**
 * Recipient email address
 * Change this to the email address where contact form submissions should be sent
 */
export const RECIPIENT_EMAIL = "briangxia@gmail.com";

/**
 * Email template function
 * 
 * This function formats the contact form data into an HTML email.
 * Edit this function to customize the email format, styling, or content.
 * 
 * @param data - The contact form data
 * @returns An object containing the email subject and HTML body
 */
export function createEmailTemplate(data: ContactFormData): { subject: string; html: string } {
  const { firstName, lastName, email, message } = data;

  const subject = `New Contact Form Submission from ${firstName} ${lastName}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #d32f2f; margin-top: 0;">New Contact Form Submission</h1>
          <p style="margin-bottom: 0;">You have received a new message through your website's contact form.</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #d32f2f; padding-bottom: 10px; margin-top: 0;">Contact Information</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #666;">Name:</td>
              <td style="padding: 8px 0;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #d32f2f; text-decoration: none;">${email}</a>
              </td>
            </tr>
          </table>
          
          <h3 style="color: #333; margin-top: 20px; margin-bottom: 10px;">Message:</h3>
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #d32f2f; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #999; font-size: 12px;">
          <p>This email was sent from your website's contact form.</p>
          <p>To reply, simply reply to this email or contact: <a href="mailto:${email}" style="color: #d32f2f;">${email}</a></p>
        </div>
      </body>
    </html>
  `;

  return { subject, html };
}

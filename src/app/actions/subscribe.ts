// src/app/actions/subscribe.ts
"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export interface SubscribeActionState {
  message: string;
  isSuccess: boolean;
  errors?: {
    email?: string[];
  };
}

// Configure nodemailer transporter
// Ensure these environment variables are set in your .env file
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function subscribeEmailAction(
  prevState: SubscribeActionState,
  formData: FormData
): Promise<SubscribeActionState> {
  const validatedFields = emailSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid input. Please check your email.",
      isSuccess: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userEmail = validatedFields.data.email;
  const adminEmail = process.env.ADMIN_EMAIL_ADDRESS;
  const emailFrom = process.env.EMAIL_FROM_ADDRESS || 'noreply@klasafrica.com';

  try {
    // Simulate API call or database save
    console.log("New subscription attempt:", userEmail);
    // In a real app, you would save this to a database or mailing list provider.
    // For example: await addToMailingList(userEmail);

    // Send notification email to admin
    if (adminEmail) {
      try {
        await transporter.sendMail({
          from: `"KlasAfrica Platform" <${emailFrom}>`,
          to: adminEmail,
          subject: "🎉 New Subscriber on KlasAfrica!",
          html: `
            <p>Hi Admin,</p>
            <p>A new user has just subscribed to KlasAfrica with the following email address:</p>
            <p><strong>${userEmail}</strong></p>
            <p>Cheers,<br/>The KlasAfrica Team</p>
          `,
        });
        console.log(`Admin notification sent to ${adminEmail} for ${userEmail}`);
      } catch (emailError) {
        console.error(`Failed to send admin notification email for ${userEmail}:`, emailError);
        // Non-critical error, so we don't fail the whole action
      }
    } else {
      console.warn("ADMIN_EMAIL_ADDRESS environment variable is not set. Skipping admin notification.");
    }

    // Send confirmation email to the subscriber
    try {
      await transporter.sendMail({
        from: `"KlasAfrica Team" <${emailFrom}>`,
        to: userEmail,
        subject: "🚀 Welcome to KlasAfrica - Subscription Confirmed!",
        html: `
          <p>Hi there,</p>
          <p>Thank you for subscribing to KlasAfrica! We're thrilled to have you on board.</p>
          <p>We'll keep you updated with the latest news, launch details, and exclusive early bird offers.</p>
          <p>Get ready to learn, teach, and grow with us!</p>
          <p>Best regards,<br/>The KlasAfrica Team</p>
        `,
      });
      console.log(`Confirmation email sent to ${userEmail}`);
    } catch (emailError) {
      console.error(`Failed to send confirmation email to ${userEmail}:`, emailError);
      // Non-critical error
    }
    
    // Simulate a small delay (optional, can be removed if email sending is fast)
    // await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: `Thank you for subscribing with ${userEmail}! A confirmation email has been sent. We'll keep you updated.`,
      isSuccess: true,
    };

  } catch (error) {
    console.error("Subscription action error:", error);
    return {
      message: "An unexpected error occurred during subscription. Please try again.",
      isSuccess: false,
    };
  }
}

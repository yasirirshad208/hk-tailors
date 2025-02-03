
import VerificationEmail from "@/emails/VerificationEmat";
import { resend } from "@/lib/resend";

export async function sendVerificationEmail(
  email: string,
  name: string,
  verifyCode: string
) {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'HK Tailors Verification Code',
      html: VerificationEmail({ name, otp: verifyCode }),
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/utils/sendVerificationEmail';
// import { sendResetPasswordEmail } from '@/helpers/sendResetPasswordEmail';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { email } = await request.json();

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found with this email' },
        { status: 404 }
      );
    }

    // Generate verification code
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = new Date(Date.now() + 3600000); // Expiry set for 1 hour
    await user.save();

    // Send reset password email
    const emailResponse = await sendVerificationEmail(email, user.name ,verifyCode);
    if (!emailResponse.success) {
      return NextResponse.json(
        { success: false, message: 'Failed to send reset email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Reset password email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing forgot password request:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing forgot password request' },
      { status: 500 }
    );
  }
}

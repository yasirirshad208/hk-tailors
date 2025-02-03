import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { verificationToken, newPassword } = await request.json();

    // Validate request payload
    if (!verificationToken || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Find the user
    const user = await UserModel.findOne({ verificationToken });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid Token' },
        { status: 400 }
      );
    }

    // Check if the verification code matches and has not expired
    if (
      new Date() > new Date(user.verificationTokenExpiry)
    ) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Hash and update the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear the verification code and expiry
    user.verificationToken = "";
    user.verificationTokenExpiry = new Date(Date.now() - 3600000);

    await user.save();

    return NextResponse.json(
      { success: true, message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { success: false, message: 'Error resetting password' },
      { status: 500 }
    );
  }
}

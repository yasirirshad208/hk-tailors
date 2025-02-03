import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { verifyCode } = await request.json();

    // Find the user by verifyCode
    const user = await UserModel.findOne({ verifyCode });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Check if the verifyCode has expired
    if (new Date(user.verifyCodeExpiry) < new Date()) {
      return NextResponse.json(
        { success: false, message: 'Verification code has expired' },
        { status: 400 }
      );
    }
const token = crypto.randomBytes(16).toString('hex')
    // Successfully verified
    user.isVerified = true; // Mark user as verified
    user.verifyCode = "";  // Clear the verification code
    user.verifyCodeExpiry = new Date(Date.now() - 3600000);
    user.verificationToken = token;
    user.verificationTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();

    return NextResponse.json(
      { success: true, message: 'Verified successfully', token },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json(
      { success: false, message: 'Error verifying code' },
      { status: 500 }
    );
  }
}

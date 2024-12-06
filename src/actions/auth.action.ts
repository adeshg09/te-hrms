"use server"

import { resetJWTPayload } from './../types/index';
import { ForgotPasswordFormData, LoginFormData, ResetPasswordFormData } from '@/types/form';
import {
  createSession,
  deleteSession,
  verifyCredentials,
  verifyToken,
} from './session.action';
import { db } from '@/lib/db';
import { SignJWT } from 'jose';
import { generateResetPasswordMail } from '@/lib/mail';
import { comparePassword, hashPassword } from '@/lib/auth';


const secretKey = "qwerty";
if (!secretKey) {
  throw new Error('SESSION_SECRET environment variable is not set.');
}
const encodedKey = new TextEncoder().encode(secretKey);

export const login = async (data: LoginFormData) => {
  const { email, password,remember } = data;
  console.log("before verify action")

  // Verify user credentials
  const { user, error, success } = await verifyCredentials(email, password);

  if (error) {
    return { error };
  }

  if (!user) {
    return { error: 'User not found' };
  }

  // Create a session and set it in cookies

  const sessionResult = await createSession(user,remember);

  if (sessionResult.error) {
    return { error: sessionResult.error };
  } else {
    return { success: sessionResult.success };
  }
};

export const logout = async () => {
  try {
    // Call deleteSession to remove server-side session
    const sessionResult = await deleteSession();

    if (sessionResult.error) {
      return { error: sessionResult.error };
    }

    
    return { redirect: '/' };
  } catch (error) {
    console.error('Logout error:', error);
    return { 
      error: 'Logout failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

export const forgotPassword = async (data: ForgotPasswordFormData) => {
  const alg = 'HS256';
  const { emailId } = data;

  try {
    const user = await db.user.findUnique({ where: { emailId: emailId } });

    if (!user) {
      return { error: 'Email is not Registered' };
    }

    const payload: resetJWTPayload = {
      emailId: emailId,
      action: 'reset-password',
    };

    const resetToken = await new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('10m') // Token expires in 15 minutes
      .sign(encodedKey);

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

    console.log('resetLink', resetLink);

    const mailResult = await generateResetPasswordMail(emailId, resetLink);

    if (mailResult.error) {
      return { error: mailResult.error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return { error: 'An unexpected error occurred' };
  }
};

export const resetPassword = async (token: string, data: ResetPasswordFormData) => {
    try {
      const { newPassword, confirmPassword } = data;
      console.log(newPassword)
      console.log(confirmPassword)
  
      const { success, error, payload } = await verifyToken(token);
  
      if (error) {
        return { error: error }; // If token is invalid or expired
      }
  
      // Ensure payload is of the correct type
      const tokenPayload = payload as resetJWTPayload;
  
      // Check if the action is 'reset-password'
      if (tokenPayload.action !== 'reset-password') {
        return { error: 'Invalid token action' };
      }
  
      const user = await db.user.findUnique({
        where: {
          emailId: tokenPayload.emailId
        },
      });
  
      if (!user) {
        return { error: "Invalid or expired Token" };
      }
  
      if (newPassword !== confirmPassword) {
        return { error: "Password and Confirm Password do not match" };
      }
  
      const isSamePassword = await comparePassword(newPassword, user.password);
  
      if (isSamePassword) {
        return { error: "New password cannot be the same as the old password" };
      }
  
      const hashedPassword = await hashPassword(newPassword);

      await db.user.update({
        where: { userId: user.userId },
        data: {
          password: hashedPassword,
        },
      });

  
      return { success: true };
    } catch (error) {
      console.error("Error in resetPassword:", error);
      return { error: "An unexpected error occurred" };
    }
  };

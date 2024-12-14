'use server';

import { comparePassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { JWTPayload } from '@/types';
import { User } from '@prisma/client';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const secretKey = 'qwerty';
if (!secretKey) {
  throw new Error('SESSION_SECRET environment variable is not set.');
}
const encodedKey = new TextEncoder().encode(secretKey);
const alg = 'HS256';

interface TokenVerificationResult {
  success: boolean;
  payload?: {
    user: User;
  };
}
export const verifyCredentials = async (email: string, password: string) => {
  try {
    console.log(email);
    console.log(password);
    const user = await db.user.findUnique({
      where: { emailId: email, isActive: true },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    console.log('user is', user);

    if (!user) {
      return { error: 'email is not yet registered' };
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return { error: 'Invalid password' };
    }

    return { success: true, user: user };
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return { error: 'An unexpected error occurred' };
  }
};

export const encrypt = async (payload: JWTPayload, remember?: boolean) => {
  try {
    console.log('Encrypting payload:', payload);
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime(remember ? '30d' : '24h')
      .sign(encodedKey);
    console.log('Generated token:', token);
    return {
      success: true,
      token: token,
    };
  } catch (error) {
    console.error('Error encrypting token:', error);
    return {
      error: 'Failed to encrypt token',
    };
  }
};

export const decrypt = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (e) {
    console.error('Error decrypting token:', e);
    return { error: 'Invalid token' };
  }
};

// actions/session.action.ts
export const verifyToken = async (token?: string) => {
  try {
    if (!token) {
      return { success: false, error: 'No token provided' };
    }

    const { payload } = await jwtVerify(token, encodedKey);
    console.log('payload is', payload);

    // Optional: Add check for token expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      return {
        success: false,
        error: 'Token expired',
        shouldLogout: true, // Optional flag to trigger logout
      };
    }

    return {
      success: true,
      payload: payload,
      isRemembered: payload.isRemembered || false,
    };
  } catch (error) {
    console.error('Failed to verify session', error);
    return {
      success: false,
      error: 'Invalid or expired token',
      shouldLogout: true,
    };
  }
};

// Add a new method to get current user from session
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get('auth-token')?.value;

    if (!token) {
      return null; // Return null if token is not available
    }

    const verificationResult = await verifyToken(token);
    console.log('Verification result:', verificationResult);

    // Ensure that the user is typed correctly
    const user =
      verificationResult.success && verificationResult.payload
        ? (verificationResult.payload.user as User) // Type assertion here
        : null;

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const createSession = async (user: User, remember?: boolean) => {
  try {
    const expiresAt = remember
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days for remembered sessions
      : new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day for standard sessions

    const payload: JWTPayload = {
      user,
      isRemembered: !!remember,
    };

    const encryptResult = await encrypt(payload, remember);

    if (!encryptResult.success || !encryptResult.token) {
      return { error: 'Failed to generate token' };
    }

    (await cookies()).set('auth-token', encryptResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'strict',
      path: '/',
    });

    return {
      success: true,
      token: encryptResult.token,
      expiresAt: expiresAt.toISOString(),
    };
  } catch (error) {
    console.error('Error creating session:', error);
    return { error: 'Failed to create session' };
  }
};

export const deleteSession = async () => {
  try {
    (await cookies()).delete('user_session');
    (await cookies()).delete('auth-token');
    return { success: true };
  } catch (error) {
    console.error('Session deletion error:', error);
    return {
      error: 'Failed to delete session',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

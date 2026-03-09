import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

interface JwtPayload {
  userId: number;
  username: string;
  email: string;
  type: 'access' | 'refresh';
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export async function generateTokens(
  userId: number,
  username: string,
  email: string
) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

    if (!JWT_SECRET || !REFRESH_SECRET) {
      throw new Error('JWT secrets not configured');
    }

    const accessToken = jwt.sign(
      {
        userId,
        username,
        email,
        type: 'access',
      } as JwtPayload,
      JWT_SECRET,
      {
        expiresIn: '15m',
        issuer: 'slack-clone-api',
        audience: 'slack-clone-client',
      }
    );

    const refreshTokenString = crypto.randomUUID();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        token: refreshTokenString,
        userId,
        expiresAt,
      },
    });
    return {
      accessToken,
      refreshToken: refreshTokenString,
    };
  } catch (error) {
    console.error('Error generating tokens:', error);
    throw new Error('Failed to generate tokens');
  }
}

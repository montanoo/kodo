import { NextFunction, Request, Response } from 'express';
import { ForbiddenError, UnauthorizedError } from '@/errors/AppError';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '@/types/auth.types';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers as { authorization: string };
    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new ForbiddenError('Unauthorized');
    }
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret_key'
    ) as AuthPayload;
    req.user = payload;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError('Token expired'));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedError('Invalid token'));
    }
    next(error);
  }
};

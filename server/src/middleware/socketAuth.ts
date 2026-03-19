import { ForbiddenError, UnauthorizedError } from '@/errors/AppError';
import { AuthPayload } from '@/types/auth.types';
import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';

export function socketAuth(socket: Socket, next: (err?: Error) => void) {
  try {
    const authorization = socket.handshake.auth.token;
    if (!authorization || !authorization.startsWith('Bearer'))
      throw new ForbiddenError('Unauthorized');

    const token = authorization.split(' ')[1];
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret_key'
    ) as AuthPayload;

    socket.data.userId = payload.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError('Token expired'));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedError('Invalid token'));
    }
    next(error as Error);
  }
}

import { Request } from 'express';

export interface AuthPayload {
  userId: number;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthPayload;
}

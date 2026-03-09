import { NextFunction, Request, Response } from 'express';
import {
  loginSchema,
  registerSchema,
} from '@kodo/shared/validators/auth.validator';
import { loginService, registerService } from './auth.service';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = loginSchema.parse(req.body);
    const result = await loginService(input);
    res.cookie('refreshToken', result.tokens.refreshToken, cookieOptions);
    return res.json({
      accessToken: result.tokens.accessToken,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
}

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = registerSchema.parse(req.body);
    const result = await registerService(input);
    res.cookie('refreshToken', result.tokens.refreshToken, cookieOptions);

    return res.status(201).json({
      accessToken: result.tokens.accessToken,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
}

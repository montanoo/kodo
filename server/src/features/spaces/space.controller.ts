import {
  createSpaceSchema,
  joinSpaceSchema,
} from '@kodo/shared/validators/space.validator';
import { Request, Response, NextFunction } from 'express';
import {
  createSpaceService,
  getUserSpaceService,
  joinSpaceService,
} from './space.service';

export async function getSpace(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getUserSpaceService(req.user.userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function joinSpace(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const inviteCode = joinSpaceSchema.parse(req.params);
    const result = await joinSpaceService(inviteCode, req.user.userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createSpace(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = createSpaceSchema.parse(req.body);
    const result = await createSpaceService(input, req.user.userId);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

import { sendMessageSchema } from '@kodo/shared/validators/channel.validator';
import { NextFunction, Request, Response } from 'express';
import { sendMessageService } from './channel.service';
import { z } from 'zod';

export async function sendMessageChannel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = sendMessageSchema.parse(req.body);
    const channelId = z.coerce.number().parse(req.params.channelId);
    const message = await sendMessageService(input, req.user.userId, channelId);
    return res.status(201).json(message);
  } catch (error) {
    next(error);
  }
}

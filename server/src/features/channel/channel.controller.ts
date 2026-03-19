import { z } from 'zod';
import {
  createChannelSchema,
  sendMessageSchema,
} from '@kodo/shared/validators/channel.validator';
import { NextFunction, Request, Response } from 'express';
import {
  createChannelService,
  getChannelMessagesService,
  sendMessageService,
} from './channel.service';

export async function sendMessageChannel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = sendMessageSchema.parse(req.body);
    const channelId = z.coerce.number().parse(req.params.channelId);
    const message = await sendMessageService(input, req.user.userId);
    return res.status(201).json(message);
  } catch (error) {
    next(error);
  }
}

export async function createChannel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = createChannelSchema.parse(req.body);
    const spaceId = z.coerce.number().parse(req.params);

    const channel = await createChannelService(input, spaceId, req.user.userId);
    return res.status(200).json(channel);
  } catch (error) {
    next(error);
  }
}

export async function getChannelMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const channelId = z.coerce.number().parse(req.params.channelId);
    const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;
    const result = await getChannelMessagesService(channelId, cursor);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

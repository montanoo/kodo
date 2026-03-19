import { authMiddleware } from '@/middleware/authenticate';
import { Router } from 'express';
import { createChannel, sendMessageChannel } from './channel.controller';

const channelRouter = Router();

channelRouter.post('/:channelId/message', authMiddleware, sendMessageChannel);
// channelRouter.post('/:spaceId', authMiddleware, createChannel);

export default channelRouter;

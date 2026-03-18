import { authMiddleware } from '@/middleware/authenticate';
import { Router } from 'express';
import { sendMessageChannel } from './channel.controller';

const channelRouter = Router();

channelRouter.post('/:channelId/message', authMiddleware, sendMessageChannel);

export default channelRouter;

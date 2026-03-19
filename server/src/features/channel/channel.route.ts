import { authMiddleware } from '@/middleware/authenticate';
import { Router } from 'express';
import { getChannelMessages } from './channel.controller';

const channelRouter = Router();

channelRouter.get('/:channelId/messages', authMiddleware, getChannelMessages);

export default channelRouter;

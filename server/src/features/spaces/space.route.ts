import { Router } from 'express';
import { authMiddleware } from '@/middleware/authenticate';
import {
  createSpace,
  getSpace,
  getSpaceChannels,
  joinSpace,
} from './space.controller';

const spaceRouter = Router();

spaceRouter.get('/', authMiddleware, getSpace);
spaceRouter.get('/:spaceId/channels', authMiddleware, getSpaceChannels);
spaceRouter.post('/', authMiddleware, createSpace);
spaceRouter.post('/:inviteCode/join', authMiddleware, joinSpace);

export default spaceRouter;

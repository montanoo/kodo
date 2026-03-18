import express from 'express';
import authRouter from '@/features/auth/auth.router';
import spaceRouter from '@/features/spaces/space.route';
import channelRouter from '@/features/channel/channel.route';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/spaces', spaceRouter);
router.use('/channel', channelRouter);

export default router;

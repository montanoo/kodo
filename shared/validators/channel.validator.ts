import { z } from 'zod';

export const sendMessageSchema = z.object({
  text: z.string().min(1, 'Message is required'),
  spaceId: z.number(),
  channelId: z.number(),
});

export const createChannelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type createMessageInput = z.infer<typeof sendMessageSchema>;
export type createChannelInput = z.infer<typeof createChannelSchema>;

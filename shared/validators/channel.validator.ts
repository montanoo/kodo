import { z } from 'zod';

export const sendMessageSchema = z.object({
  text: z.string().min(1, 'Message is required'),
});

export type createMessageInput = z.infer<typeof sendMessageSchema>;

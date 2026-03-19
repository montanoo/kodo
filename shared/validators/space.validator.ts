import { z } from 'zod';

export const joinSpaceSchema = z.object({
  inviteCode: z.string().min(5, 'Unique id is required'),
});

export const createSpaceSchema = z.object({
  capacity: z.number().optional(),
  name: z.string().min(3, 'Name is required'),
  isPremium: z.boolean(),
});

export const createSpaceCode = z.object({
  code: z.string(),
  spaceId: z.number(),
  expiresAt: z.iso.datetime().optional(),
});

export type JoinSpaceInput = z.infer<typeof joinSpaceSchema>;
export type CreateSpaceInput = z.infer<typeof createSpaceSchema>;
export type CreateSpaceCodeInput = z.infer<typeof createSpaceCode>;

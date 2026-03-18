import { prisma } from '@/lib/prisma';
import { createMessageInput } from '@kodo/shared/validators/channel.validator';

export async function sendMessageService(
  data: createMessageInput,
  userId: number,
  channelId: number
) {
  const message = await prisma.channelMessages.create({
    data: {
      ...data,
      userId,
      channelId,
    },
    include: {
      user: {
        select: {
          email: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
  return { message };
}

import { ForbiddenError, NotFoundError } from '@/errors/AppError';
import { prisma } from '@/lib/prisma';
import {
  createChannelInput,
  createMessageInput,
} from '@kodo/shared/validators/channel.validator';
import { RoleType } from 'generated/prisma/enums';

export async function sendMessageService(
  data: createMessageInput,
  userId: number
) {
  const message = await prisma.channelMessages.create({
    data: {
      ...data,
      userId,
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

export async function createChannelService(
  input: createChannelInput,
  spaceId: number,
  userId: number
) {
  const space = await prisma.space.findFirst({
    where: {
      id: spaceId,
    },
    include: {
      spaceMembers: {
        where: {
          userId,
        },
        include: {
          role: true,
        },
      },
    },
  });

  if (!space) throw new NotFoundError('Space does not exist');

  const member = space.spaceMembers[0];

  if (!member) throw new ForbiddenError('You are not a member of this space');

  const canCreate =
    member.role.type === RoleType.ADMIN || member.role.type === RoleType.OWNER;

  if (!canCreate) throw new ForbiddenError('Insuficient permissions');

  const newChannel = await prisma.channel.create({
    data: { ...input, spaceId },
  });

  return { newChannel };
}

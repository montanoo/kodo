import { BadRequestError, ConflictError } from '@/errors/AppError';
import { prisma } from '@/lib/prisma';
import { RoleIds } from '@/lib/roles';
import {
  CreateSpaceCodeInput,
  CreateSpaceInput,
  JoinSpaceInput,
} from '@kodo/shared/validators/space.validator';
import { RoleType } from 'generated/prisma/enums';
import { randomUUID } from 'node:crypto';

export async function getUserSpaceService(userId: number) {
  const userSpaces = await prisma.space.findMany({
    where: {
      spaceMembers: {
        some: {
          userId,
        },
      },
    },
    include: {
      channels: {
        select: {
          id: true,
          name: true,
        },
      },
      spaceMembers: {
        where: { userId },
        select: {
          role: {
            select: {
              type: true,
            },
          },
        },
      },
    },
  });
  return userSpaces;
}

export async function joinSpaceService(input: JoinSpaceInput, userId: number) {
  const invite = await prisma.inviteCode.findUnique({
    where: {
      code: input.inviteCode,
    },
  });

  if (!invite) throw new BadRequestError("Invitation code doesn't exist");

  if (invite.expiresAt && invite.expiresAt < new Date())
    throw new BadRequestError('Invite code has expired');

  const memberRoleId = RoleIds[RoleType.MEMBER];

  const existingMember = await prisma.spaceMembers.findUnique({
    where: { userId_spaceId: { userId, spaceId: invite.spaceId } },
  });

  if (existingMember) throw new ConflictError('Already a member of this space');

  const joinUser = await prisma.spaceMembers.create({
    data: { userId, roleId: memberRoleId, spaceId: invite.spaceId },
  });

  return {
    joinUser,
  };
}

export async function createSpaceService(
  input: CreateSpaceInput,
  userId: number
) {
  const space = await prisma.space.create({
    data: {
      ...input,
      spaceMembers: {
        create: {
          roleId: RoleIds[RoleType.OWNER],
          userId,
        },
      },
      channels: {
        create: {
          name: 'General',
        },
      },
      inviteCodes: {
        create: {
          code: randomUUID(),
          userId,
        },
      },
    },
    include: {
      spaceMembers: true,
      channels: true,
      inviteCodes: true,
    },
  });

  return {
    space,
  };
}

export async function createSpaceCode(
  input: CreateSpaceCodeInput,
  userId: number
) {
  const inviteCode = await prisma.inviteCode.create({
    data: {
      ...input,
      userId,
    },
  });

  return { code: inviteCode.spaceId };
}

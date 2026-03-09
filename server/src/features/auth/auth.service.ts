import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import {
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
} from '@/errors/AppError';
import { generateTokens } from '@/features/auth/token.service';
import {
  LoginInput,
  RegisterInput,
} from '@kodo/shared/validators/auth.validator';
import { Prisma } from '../../../generated/prisma/client';
import { AuthResponse } from '../../../../shared/types/auth.types';

export async function loginService(
  userInput: LoginInput
): Promise<AuthResponse> {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: userInput.identifier }, { username: userInput.identifier }],
    },
  });

  if (!user || !(await bcrypt.compare(userInput.password, user.password))) {
    throw new UnauthorizedError('Invalid credentials');
  }

  if (!user.isActive) {
    throw new ForbiddenError('Account is disabled');
  }
  const tokens = await generateTokens(user.id, user.username, user.email);

  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    tokens,
  };
}

export async function registerService(
  userRegister: RegisterInput
): Promise<AuthResponse> {
  try {
    const hashPassword = await bcrypt.hash(userRegister.password, 10);
    const createdUser = await prisma.user.create({
      data: {
        email: userRegister.email,
        username: userRegister.username,
        password: hashPassword,
      },
    });

    const tokens = await generateTokens(
      createdUser.id,
      createdUser.username,
      createdUser.email
    );

    return {
      user: {
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
      },
      tokens,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const field = (error.meta?.target as string[])?.[0];
      throw new ConflictError(
        field === 'email' ? 'Email already in use' : 'Username already taken'
      );
    }
    throw error;
  }
}

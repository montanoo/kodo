import type {
  LoginInput,
  RegisterInput,
} from '@kodo/shared/validators/auth.validator';
import Api from '../../lib/api';
import type { AuthApiResponse } from '@kodo/shared/types/auth.types';

export async function login(input: LoginInput) {
  const { data } = await Api.post<AuthApiResponse>('auth/login', input);
  return data;
}

export async function register(input: RegisterInput) {
  const { data } = await Api.post<AuthApiResponse>('auth/register', input);
  return data;
}

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import type {
  LoginInput,
  RegisterInput,
} from '@kodo/shared/validators/auth.validator';
import { login, register } from '../auth.api';
import authStore from '../../../store/auth.store';
import { socket } from '../../../lib/socket';

export function useLoginMutation() {
  const setStore = authStore((state) => state.setAuth);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (input: LoginInput) => {
      return login(input);
    },
    onSuccess: ({ user, accessToken }) => {
      setStore(user, accessToken);
      socket.connect();
      navigate('/');
    },
  });
}

export function useRegisterMutation() {
  const setStore = authStore((state) => state.setAuth);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (input: RegisterInput) => {
      return register(input);
    },
    onSuccess: ({ user, accessToken }) => {
      setStore(user, accessToken);
      socket.connect();
      navigate('/');
    },
  });
}

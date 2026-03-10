import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';
import { logout as logoutAction, setCredentials } from '../features/auth/authSlice';

export const useAuthMutations = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const register = useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post('/auth/register', payload);
      return response.data.data || response.data;
    },
    onSuccess: (data) => {
      dispatch(setCredentials({ token: data.token, user: data.user }));
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });

  const login = useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post('/auth/login', payload);
      return response.data.data || response.data;
    },
    onSuccess: (data) => {
      dispatch(setCredentials({ token: data.token, user: data.user }));
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });

  const logout = useMutation({
    mutationFn: async () => apiClient.post('/auth/logout'),
    onSettled: () => {
      dispatch(logoutAction());
      queryClient.clear();
    },
  });

  return { register, login, logout };
};

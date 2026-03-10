import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';
import { logout as logoutAction, setCredentials } from '../features/auth/authSlice';

export const useAuthMutations = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleAuthSuccess = (data) => {
    dispatch(setCredentials({ token: data.token, user: data.user }));
    queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
  };

  const registerCustomer = useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post('/auth/customer/register', payload);
      return response.data.data || response.data;
    },
    onSuccess: handleAuthSuccess
  });

  const loginCustomer = useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post('/auth/customer/login', payload);
      return response.data.data || response.data;
    },
    onSuccess: handleAuthSuccess
  });

  const registerPartner = useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post('/auth/partner/register', payload);
      return response.data.data || response.data;
    },
    onSuccess: handleAuthSuccess
  });

  const loginPartner = useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post('/auth/partner/login', payload);
      return response.data.data || response.data;
    },
    onSuccess: handleAuthSuccess
  });

  const logout = useMutation({
    mutationFn: async () => apiClient.post('/auth/logout'),
    onSettled: () => {
      dispatch(logoutAction());
      queryClient.clear();
    }
  });

  return { registerCustomer, loginCustomer, registerPartner, loginPartner, logout };
};

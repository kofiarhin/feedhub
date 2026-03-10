import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post('/menu', payload);
      return response.data.data || response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stores.menu(variables.storeId) });
    },
  });
};

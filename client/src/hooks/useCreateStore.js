import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post('/stores', payload);
      return response.data.data || response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.stores.all }),
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

export const useUpdateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ storeId, payload }) => {
      const response = await apiClient.put(`/stores/${storeId}`, payload);
      return response.data.data || response.data;
    },
    onSuccess: (_, { storeId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stores.detail(storeId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.stores.all });
    },
  });
};

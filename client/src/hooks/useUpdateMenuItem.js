import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ menuItemId, payload }) => {
      const response = await apiClient.put(`/menu/${menuItemId}`, payload);
      return response.data.data || response.data;
    },
    onSuccess: (data, vars) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stores.menu(vars.storeId || data.storeId) });
    },
  });
};

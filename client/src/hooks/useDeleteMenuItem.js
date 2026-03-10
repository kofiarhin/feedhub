import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ menuItemId }) => {
      const response = await apiClient.delete(`/menu/${menuItemId}`);
      return response.data.data || response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stores.menu(variables.storeId) });
    },
  });
};

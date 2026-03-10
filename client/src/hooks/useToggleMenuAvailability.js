import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

export const useToggleMenuAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ menuItemId }) => {
      const response = await apiClient.patch(`/menu/${menuItemId}/toggle-availability`);
      return response.data.data || response.data;
    },
    onSuccess: (data, vars) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stores.menu(vars.storeId || data.storeId) });
    },
  });
};

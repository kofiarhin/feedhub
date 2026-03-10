import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      const response = await apiClient.patch(`/orders/${orderId}/status`, { status });
      return response.data.data || response.data;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.store(vars.storeId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.my });
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';
import { clearCart } from '../features/cart/cartSlice';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post('/orders', payload);
      return response.data.data || response.data;
    },
    onSuccess: () => {
      dispatch(clearCart());
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.my });
    },
  });
};

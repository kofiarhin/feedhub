import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

const fetchMyOrders = async () => {
  const response = await apiClient.get('/orders/my');
  return response.data.data || [];
};

export const useMyOrders = () => useQuery({ queryKey: queryKeys.orders.my, queryFn: fetchMyOrders });

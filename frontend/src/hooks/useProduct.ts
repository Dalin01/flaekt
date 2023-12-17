/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { API_URL } from '~/config/api';

export interface IProduct {
  id?: number;
  color: string;
  name: string;
  partNumber: string;
  size: number;
}

export const useGetProducts = () => {
  return useQuery<IProduct[], AxiosError>({
    queryKey: ['getProducts'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/v1/product`);

      return response.data;
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

interface ICreateProduct {
  product: IProduct;
}

export const useCreateProduct = () => {
  const createProductMutation = useMutation<
    AxiosResponse<any, any>,
    unknown,
    ICreateProduct,
    unknown
  >({
    mutationFn: async ({ product }) => {
      const response = await axios.post(`${API_URL}/api/v1/product`, product);

      return response.data;
    },
  });

  return { createProductMutation };
};

interface IEditProduct {
  product: IProduct;
  partNumber: string;
}

export const useEditProduct = () => {
  const editProductMutation = useMutation<
    AxiosResponse<any, any>,
    unknown,
    IEditProduct,
    unknown
  >({
    mutationFn: async ({ product, partNumber }) => {
      const response = await axios.put(
        `${API_URL}/api/v1/product/${partNumber}`,
        product,
      );

      return response.data;
    },
  });

  return { editProductMutation };
};

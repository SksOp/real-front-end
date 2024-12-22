import {
  fetchRentalMatrix,
  fetchSalesMatrix,
} from "@/repository/resources/matrices.api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getSalesMatrix = (params?: { [key: string]: string | number }) => {
  console.log(params);
  return useQuery({
    queryKey: ["sales-matrix", params],
    queryFn: () => {
      return fetchSalesMatrix(params);
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const getRentalMatrix = (params?: {
  [key: string]: string | number;
}) => {
  return useQuery({
    queryKey: ["rental-matrix", params],
    queryFn: () => {
      return fetchRentalMatrix(params);
    },
    staleTime: 1000 * 60 * 5,
  });
};

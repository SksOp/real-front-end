import {
  SalesReqBody,
  fetchAverageTransactions,
  fetchAverageValues,
  fetchSales,
} from "@/repository/resources/fuctions.api";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { queryClient } from "../query-client";

export const getAverageTransaction = () => {
  return queryOptions({
    queryKey: ["avg-transaction"],
    queryFn: async () => {
      const resp = await fetchAverageTransactions();
      // queryClient.setQueryData(["avg-transaction"], resp);
      return resp;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const getAverageValues = () => {
  console.log("getAverageValues");
  return queryOptions({
    queryKey: ["avg-values"],
    queryFn: () => {
      return fetchAverageValues();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddChallenge = () => {
  return useMutation({
    mutationFn: (data: SalesReqBody) => {
      return fetchSales(data);
    },
  });
};

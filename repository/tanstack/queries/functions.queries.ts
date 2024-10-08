import {
  SalesReqBody,
  fetchAverageTransactions,
  fetchAverageValues,
  fetchBedrooms,
  fetchFlatVillaLand,
  fetchFreeholdVsLease,
  fetchIQR,
  fetchLastTransactions,
  fetchListings,
  fetchLocationSales,
  fetchOffplanVsReady,
  fetchResidentialVsCommercialType,
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

export const useTransactionMonthlyAverage = () => {
  return useMutation({
    mutationFn: (data: SalesReqBody) => {
      return fetchSales(data);
    },
  });
};

export const getLocationSales = () => {
  return queryOptions({
    queryKey: ["loacation-sales"],
    queryFn: () => {
      return fetchLocationSales();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const getBedrooms = () => {
  return queryOptions({
    queryKey: ["bedrooms-data"],
    queryFn: () => {
      return fetchBedrooms();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const getResidentialVsCommercialType = () => {
  return queryOptions({
    queryKey: ["residential-vs-commercial-type"],
    queryFn: () => {
      return fetchResidentialVsCommercialType();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const getOffplanVsReady = () => {
  return queryOptions({
    queryKey: ["offplan-vs-ready"],
    queryFn: () => {
      return fetchOffplanVsReady();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const getFreeholdVsLease = () => {
  return queryOptions({
    queryKey: ["freehold-vs-lease"],
    queryFn: () => {
      return fetchFreeholdVsLease();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const getIQR = () => {
  return queryOptions({
    queryKey: ["iqr"],
    queryFn: () => {
      return fetchIQR();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const getFlatVillaLand = () => {
  return queryOptions({
    queryKey: ["flat-villa-land"],
    queryFn: () => {
      return fetchFlatVillaLand();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const getLastTransactions = () => {
  return queryOptions({
    queryKey: ["last-transactions"],
    queryFn: () => {
      return fetchLastTransactions();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const getListings = () => {
  return queryOptions({
    queryKey: ["listings"],
    queryFn: () => {
      return fetchListings();
    },
    staleTime: 1000 * 60 * 5,
  });
};

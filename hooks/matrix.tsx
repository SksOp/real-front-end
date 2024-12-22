import { getSalesMatrix } from "@/repository/tanstack/queries/matrices.queries";

export const useSalesMetrics = (params: any) => {
  const {
    data: SalesTransactions,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = getSalesMatrix({
    end_year: new Date().getFullYear(),
    start_year: new Date().getFullYear() - 1,
    ...params,
  });

  if (SalesTransactions && !isSalesLoading && !isSalesError) {
    return SalesTransactions;
  }

  return [];
};

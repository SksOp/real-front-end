import ApiService from "@/utils/apiService";

const growthCalculator = (current: number, previous: number | null) => {
  if (previous === null || previous === 0) return null;
  return ((current - previous) / previous) * 100;
};

export const CalculateMatrixRental = async (
  params: { [key: string]: string | number },
  token?: string | null
) => {
  if (!params) {
    params = {};
    params.start_year = new Date().getFullYear() - 1;
    params.end_year = new Date().getFullYear();
  }
  if (!params.start_year) {
    params.start_year = new Date().getFullYear() - 1;
  }
  const response = await ApiService("rental", "average", params, token);
  console.log("transactions", response);
  if (!response.result || response.status === "error") {
    console.error("API Response Error:", response?.message || "Unknown error");
    return [];
  }

  const transactions = response.result as any[];

  if (transactions.length === 0) {
    console.error("Error calculating metrics:", response.message);
    return [
      {
        key: "avg_sales_value",
        title: "Average Sales Value",
        value: "N/A",
      },
      {
        key: "sales_per_sqft",
        title: "Sales Per Sqft",
        value: "N/A",
      },
      {
        key: "total_value",
        title: "Total Value",
        value: "N/A",
      },
      {
        key: "no_of_transactions",
        title: "No of Transactions",
        value: "N/A",
      },
    ];
  }

  const currentData = transactions[1] || transactions[0];
  const previousData = transactions[1] ? transactions[0] : null;

  const getMetric = (data: any, key: string) =>
    data[key] !== undefined && data[key] !== null ? parseFloat(data[key]) : 0;

  const avgRentNew = getMetric(currentData, "avg_rent_new_yearly");
  const avgRentNewGrowth = previousData
    ? growthCalculator(
        avgRentNew,
        getMetric(previousData, "avg_rent_new_yearly")
      )
    : null;

  const avgRentRenewal = getMetric(currentData, "avg_rent_renewal_yearly");
  const avgRentRenewalGrowth = previousData
    ? growthCalculator(
        avgRentRenewal,
        getMetric(previousData, "avg_rent_renewal_yearly")
      )
    : null;

  const totalTransaction = getMetric(currentData, "total_transaction_yearly");
  const totalTransactionGrowth = previousData
    ? growthCalculator(
        totalTransaction,
        getMetric(previousData, "total_transaction_yearly")
      )
    : null;

  const renewalRatio = getMetric(currentData, "renewal_ratio_yearly");
  const renewalRatioGrowth = previousData
    ? growthCalculator(
        renewalRatio,
        getMetric(previousData, "renewal_ratio_yearly")
      )
    : null;

  return [
    {
      key: "avg_rent_new",
      title: "Average Rent (New)",
      value: avgRentNew.toFixed(2),
      growth: avgRentNewGrowth !== null ? avgRentNewGrowth.toFixed(1) : "N/A",
    },
    {
      key: "sales_per_sqft",
      title: "Average Rent (Renewal)",
      value: avgRentRenewal.toFixed(2),
      growth:
        avgRentRenewalGrowth !== null ? avgRentRenewalGrowth.toFixed(1) : "N/A",
    },
    {
      key: "total_transactions",
      title: "Total Transactions",
      value: totalTransaction,
      growth:
        totalTransactionGrowth !== null
          ? totalTransactionGrowth.toFixed(1)
          : "N/A",
    },
    {
      key: "renewal_ratio",
      title: "Renewal Ratio",
      value: `${(renewalRatio * 100).toFixed(2)}%`,
      growth:
        renewalRatioGrowth !== null ? renewalRatioGrowth.toFixed(1) : "N/A",
    },
  ];
};

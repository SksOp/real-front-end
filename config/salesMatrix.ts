import ApiService from "@/utils/apiService";

const growthCalculator = (current: number, previous: number | null) => {
  if (previous === null || previous === 0) return null;
  return ((current - previous) / previous) * 100;
};

export const CalculateMatrixSales = async (
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
  const response = await ApiService("transaction", "trends", params, token);
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

  const avgSalesValue = getMetric(currentData, "average_value_of_transactions");
  const avgSalesValueGrowth = previousData
    ? growthCalculator(
        avgSalesValue,
        getMetric(previousData, "average_value_of_transactions")
      )
    : null;

  const avgPricePerSqft = getMetric(currentData, "average_Price_per_sqft");
  const salesPerSqftGrowth = previousData
    ? growthCalculator(
        avgPricePerSqft,
        getMetric(previousData, "average_Price_per_sqft")
      )
    : null;

  const totalValue = getMetric(currentData, "Total_Value_of_Transaction");
  const totalValueGrowth = previousData
    ? growthCalculator(
        totalValue,
        getMetric(previousData, "Total_Value_of_Transaction")
      )
    : null;

  const noOfTransactions = getMetric(currentData, "number_of_Row_Used");
  const noOfTransactionsGrowth = previousData
    ? growthCalculator(
        noOfTransactions,
        getMetric(previousData, "number_of_Row_Used")
      )
    : null;

  return [
    {
      key: "avg_sales_value",
      title: "Average Sales Value",
      value: avgSalesValue.toFixed(2),
      growth:
        avgSalesValueGrowth !== null ? avgSalesValueGrowth.toFixed(1) : "N/A",
    },
    {
      key: "avg_price_per_sqft",
      title: "Avg. Price per SQFT",
      value: avgPricePerSqft.toFixed(2),
      growth:
        salesPerSqftGrowth !== null ? salesPerSqftGrowth.toFixed(1) : "N/A",
    },
    {
      key: "total_value",
      title: "Total Value",
      value: totalValue.toFixed(2),
      growth: totalValueGrowth !== null ? totalValueGrowth.toFixed(1) : "N/A",
    },
    {
      key: "no_of_transactions",
      title: "No of Transactions",
      value: noOfTransactions,
      growth:
        noOfTransactionsGrowth !== null
          ? noOfTransactionsGrowth.toFixed(1)
          : "N/A",
    },
  ];
};

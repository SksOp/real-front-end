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
  if (params.end_year === 12) {
    params.start_year = 12;
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

  const avgSalesValue =
    transactions[transactions.length - 1].current_avg_transaction_value;
  const avgPricePerSqft =
    transactions[transactions.length - 1].current_avg_sqft_price;
  const totalValue = transactions[transactions.length - 1].current_total_value;
  const noOfTransactions =
    transactions[transactions.length - 1].current_transactions;

  const avgSalesValueGrowth =
    transactions[transactions.length - 1]
      .avg_transaction_value_growth_percentage;
  const salesPerSqftGrowth =
    transactions[transactions.length - 1].avg_sqft_price_growth_percentage;
  const totalValueGrowth =
    transactions[transactions.length - 1].total_value_growth_percentage;
  const noOfTransactionsGrowth =
    transactions[transactions.length - 1].transaction_count_growth_percentage;

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

interface MonthlyData {
  sales: number;
  Transactions: number;
}

interface TransactionAverageValues {
  [year: string]: {
    [month: string]: MonthlyData;
  };
}

interface TransactionData {
  averageValue: string;
  growthAverageValue: string;
  totalValue: string;
  growthTotalValue: string;
  yoyGrowth: string;
  growthYoyValue: string;
  totalTransactions: string;
  growthTotalTransactions: string;
}

const formatValue = (value: number): string => {
  if (value >= 1_000_000) {
    return `${Math.round(value / 1_000_000)} M`;
  } else if (value >= 1_000) {
    return `${Math.round(value / 1_000)} K`;
  } else {
    return value.toString();
  }
};

const getPreviousMonth = (monthIndex: number, yearIndex: number): { month: string; year: string } => {
  const date = new Date(yearIndex, monthIndex, 1);
  date.setMonth(date.getMonth() - 1);
  return {
    month: date.toLocaleString('default', { month: 'long' }),
    year: date.getFullYear().toString()
  };
};

export const getTransactionData = (data: TransactionAverageValues): TransactionData => {
  if (!data) {
    return {
      averageValue: "0",
      totalValue: "0",
      yoyGrowth: "0.00%",
      totalTransactions: "0",
      growthTotalValue: "0",
      growthAverageValue: "0",
      growthYoyValue: "0",
      growthTotalTransactions: "0"
    };
  }

  const years = Object.keys(data).sort();
  if (years.length < 2) {
    return {
      averageValue: "0",
      totalValue: "0",
      yoyGrowth: "0.00%",
      totalTransactions: "0",
      growthTotalValue: "0",
      growthAverageValue: "0",
      growthYoyValue: "0",
      growthTotalTransactions: "0"
    };
  }

  const previousYear = years[years.length - 2];
  const secondPreviousYear = years[years.length - 3] || previousYear;

  let totalSalesPreviousYear = 0;
  let totalTransactionsPreviousYear = 0;
  let totalSalesSecondPreviousYear = 0;
  let totalTransactionsSecondPreviousYear = 0;

  Object.entries(data[previousYear]).forEach(([month, { sales, Transactions }]) => {
    totalSalesPreviousYear += sales;
    totalTransactionsPreviousYear += Transactions;
  });

  if (data[secondPreviousYear]) {
    Object.entries(data[secondPreviousYear]).forEach(([month, { sales, Transactions }]) => {
      totalSalesSecondPreviousYear += sales;
      totalTransactionsSecondPreviousYear += Transactions;
    });
  }

  const yoyGrowth = totalSalesSecondPreviousYear ? ((totalSalesPreviousYear - totalSalesSecondPreviousYear) / totalSalesSecondPreviousYear) * 100 : 0;
  const growthAverageValue = totalSalesSecondPreviousYear && totalTransactionsSecondPreviousYear
    ? ((totalSalesPreviousYear / totalTransactionsPreviousYear - totalSalesSecondPreviousYear / totalTransactionsSecondPreviousYear) / (totalSalesSecondPreviousYear / totalTransactionsSecondPreviousYear)) * 100
    : 0;
  const growthTotalValue = totalSalesSecondPreviousYear ? ((totalSalesPreviousYear - totalSalesSecondPreviousYear) / totalSalesSecondPreviousYear) * 100 : 0;
  const growthTotalTransactions = totalTransactionsSecondPreviousYear ? ((totalTransactionsPreviousYear - totalTransactionsSecondPreviousYear) / totalTransactionsSecondPreviousYear) * 100 : 0;

  return {
    averageValue: formatValue(totalSalesPreviousYear / (totalTransactionsPreviousYear || 1)),
    growthAverageValue: `${growthAverageValue.toFixed(2)}%`,
    totalValue: formatValue(totalSalesPreviousYear),
    growthTotalValue: `${growthTotalValue.toFixed(2)}%`,
    yoyGrowth: `${yoyGrowth.toFixed(2)}%`,
    growthYoyValue: `${yoyGrowth.toFixed(2)}%`,
    totalTransactions: formatValue(totalTransactionsPreviousYear),
    growthTotalTransactions: `${growthTotalTransactions.toFixed(2)}%`
  };
};
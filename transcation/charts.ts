import { TransactionAverageValues, SalesTransactionsType } from "./types";



interface TransactionData {
  averageValue: string;
  growthAverageValue: string;
  totalValue: string;
  growthTotalValue: string;
  yoyGrowth: string;
  growthYoyValue: string;
  totalTransactions: string;
  growthTotalTransactions: string;
  SalesTransactions :SalesTransactionsType | null
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

const convertToSalesTransactions = (data: TransactionAverageValues): SalesTransactionsType => {
  const salesTransactions: SalesTransactionsType = {};

  const monthOrder = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  for (const year in data) {
    if (!salesTransactions[year]) {
      salesTransactions[year] = {};
    }
    const sortedMonths = Object.keys(data[year]).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
    for (const month of sortedMonths) {
      salesTransactions[year][month] = {
        Transactions: data[year][month].Transactions
      };
    }
  }

  return salesTransactions;
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
      growthTotalTransactions: "0",
      SalesTransactions: null
    };
  }
  const salesTransactions: SalesTransactionsType = convertToSalesTransactions(data);

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
      growthTotalTransactions: "0",
      SalesTransactions: null
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
    growthTotalTransactions: `${growthTotalTransactions.toFixed(2)}%`,
    SalesTransactions : salesTransactions
  };
};
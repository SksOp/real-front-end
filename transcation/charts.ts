import { TransactionAverageValues } from "./types"

interface TransactionData {
    averageValue: number;
    totalValue: number;
    yoyGrowth: number;
    totalTransactions: number;
  }
  
  export const getTransactionData = (data: TransactionAverageValues): TransactionData => {
    const years = Object.keys(data).sort();
    const currentYear = years[years.length - 1];
    const previousYear = years[years.length - 2];
  
    let totalSalesAllYears = 0;
    let totalTransactionsAllYears = 0;
    let totalSalesCurrentYear = 0;
    let totalTransactionsCurrentYear = 0;
    let totalSalesPreviousYear = 0;
  
    years.forEach(year => {
      Object.values(data[year]).forEach(({ sales, Transactions }) => {
        totalSalesAllYears += sales;
        totalTransactionsAllYears += Transactions;
        if (year === currentYear) {
          totalSalesCurrentYear += sales;
          totalTransactionsCurrentYear += Transactions;
        }
        if (year === previousYear) {
          totalSalesPreviousYear += sales;
        }
      });
    });
  
    const averageValue = totalSalesAllYears / years.length;
    const yoyGrowth = totalSalesPreviousYear ? ((totalSalesCurrentYear - totalSalesPreviousYear) / totalSalesPreviousYear) * 100 : 0;
    const totalValue = totalSalesCurrentYear;
    const totalTransactions = totalTransactionsCurrentYear;
  
    return {
      averageValue,
      totalValue,
      yoyGrowth,
      totalTransactions
    };
  }
  
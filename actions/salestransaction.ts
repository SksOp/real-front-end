import {
  SalesChartDataTypeMonthly,
  SalesChartDataTypeQuaterly,
  SalesChartDataTypeYearly,
} from "@/components/sales-market-trend/sales-market-trend";
import { SalesTransactionsType } from "@/transcation/types";

export class SalesTransactions {
  getYearlySalesData({
    data,
  }: {
    data: SalesTransactionsType;
  }): SalesChartDataTypeYearly[] {
    const salesCount: { [year: string]: number } = {};
    const years = Object.keys(data!).slice(-12); // Last 12 years of data

    for (const year of years) {
      const yearData = data[year];
      let yearlyCount = 0;

      for (const month in yearData) {
        yearlyCount += Number(yearData[month]?.Transactions ?? 0);
      }

      salesCount[year] = yearlyCount;
    }

    return Object.keys(salesCount).map((year) => ({
      duration: year,
      property_count: salesCount[year],
    }));
  }

  getQuarterlySalesData({
    data,
  }: {
    data: SalesTransactionsType;
  }): SalesChartDataTypeQuaterly[] {
    const salesCount: { [quarter: string]: number } = {};

    const quarters = Object.keys(data).reduce((acc, year) => {
      const yearData = data[year];
      for (const month in yearData) {
        const monthInt = parseInt(month);
        const quarter = `${year}-Q${Math.ceil(monthInt / 3)}`;
        acc[quarter] = acc[quarter] || 0;
        acc[quarter] += Number(yearData[month]?.Transactions ?? 0);
      }
      return acc;
    }, {} as { [quarter: string]: number });

    const last12Quarters = Object.keys(quarters).slice(-12);

    last12Quarters.forEach((quarter) => {
      salesCount[quarter] = quarters[quarter];
    });

    return Object.keys(salesCount).map((quarter) => ({
      duration: quarter,
      property_count: salesCount[quarter],
    }));
  }

  getMonthlySalesData({
    data,
  }: {
    data: SalesTransactionsType;
  }): SalesChartDataTypeMonthly[] {
    const salesCount: { [month: string]: number } = {};

    const months = Object.keys(data).reduce((acc, year) => {
      const yearData = data[year];
      for (const month in yearData) {
        const monthKey = `${year}-${month}`;
        acc[monthKey] = Number(yearData[month]?.Transactions ?? 0);
      }
      return acc;
    }, {} as { [month: string]: number });

    const last12Months = Object.keys(months).slice(-12);

    last12Months.forEach((month) => {
      salesCount[month] = months[month];
    });

    return Object.keys(salesCount).map((month) => ({
      duration: month,
      property_count: salesCount[month],
    }));
  }
}

import {
  SalesChartDataTypeMonthly,
  SalesChartDataTypeQuaterly,
  SalesChartDataTypeYearly,
} from "@/components/insights/location-sales/location-sales";
import { LocationSalesTransaction } from "@/transcation/types";
import {
  TransactionsChartDataTypeYearly,
  TransactionsChartDataTypeQuaterly,
  TransactionsChartDataTypeMonthly,
} from "@/components/insights/location-transaction/location-transaction";

export class Sales {
  getYearlySales({
    data,
  }: {
    data: LocationSalesTransaction;
  }): SalesChartDataTypeYearly[] {
    if (!data) {
      return [];
    }
    const locationSales: { [location: string]: number } = {};
    const years = Object.keys(data).slice(-12); // Last 12 years of data
    for (const year of years) {
      const yearData = data[year];
      for (const month in yearData) {
        const monthData = yearData[month];
        for (const location in monthData) {
          if (!locationSales[location]) {
            locationSales[location] = 0;
          }
          locationSales[location] += monthData[location].sales;
        }
      }
    }
    return Object.keys(locationSales)
      .map((location) => ({
        location,
        sales: locationSales[location],
      }))
      .sort((a, b) => b.sales - a.sales); // Sort by sales in decreasing order
  }

  getQuarterlySales({
    data,
  }: {
    data: LocationSalesTransaction;
  }): SalesChartDataTypeQuaterly[] {
    const locationSales: { [location: string]: number } = {};
    const quarters = Object.keys(data).reduce((acc, year) => {
      const yearData = data[year];
      for (const month in yearData) {
        const monthInt = parseInt(month);
        const quarter = `${year}-Q${Math.ceil(monthInt / 3)}`;
        acc[quarter] = acc[quarter] || {};
        Object.keys(yearData[month]).forEach((location) => {
          acc[quarter][location] =
            (acc[quarter][location] || 0) + yearData[month][location].sales;
        });
      }
      return acc;
    }, {} as { [quarter: string]: { [location: string]: number } });

    const last12Quarters = Object.keys(quarters).slice(-12);
    last12Quarters.forEach((quarter) => {
      const quarterData = quarters[quarter];
      Object.keys(quarterData).forEach((location) => {
        locationSales[location] =
          (locationSales[location] || 0) + quarterData[location];
      });
    });

    return Object.keys(locationSales)
      .map((location) => ({
        location,
        sales: locationSales[location],
      }))
      .sort((a, b) => b.sales - a.sales); // Sort by sales in decreasing order
  }

  getMonthlySales({
    data,
  }: {
    data: LocationSalesTransaction;
  }): SalesChartDataTypeMonthly[] {
    const locationSales: { [location: string]: number } = {};
    const months = Object.keys(data).reduce((acc, year) => {
      const yearData = data[year];
      for (const month in yearData) {
        const monthKey = `${year}-${month}`;
        acc[monthKey] = yearData[month];
      }
      return acc;
    }, {} as { [month: string]: any });

    const last12Months = Object.keys(months).slice(-12);
    last12Months.forEach((month) => {
      const monthData = months[month];
      for (const location in monthData) {
        locationSales[location] =
          (locationSales[location] || 0) + monthData[location].sales;
      }
    });

    return Object.keys(locationSales)
      .map((location) => ({
        location,
        sales: locationSales[location],
      }))
      .sort((a, b) => b.sales - a.sales); // Sort by sales in decreasing order
  }
}

export class Transactions {
  getYearlyTransactions({
    data,
  }: {
    data: LocationSalesTransaction;
  }): TransactionsChartDataTypeYearly[] {
    if (!data) {
      return [];
    }
    const locationTransactions: { [location: string]: number } = {};
    const years = Object.keys(data).slice(-12); // Last 12 years of data
    for (const year of years) {
      const yearData = data[year];
      for (const month in yearData) {
        const monthData = yearData[month];
        for (const location in monthData) {
          if (!locationTransactions[location]) {
            locationTransactions[location] = 0;
          }
          locationTransactions[location] += monthData[location].Transactions;
        }
      }
    }
    return Object.keys(locationTransactions)
      .map((location) => ({
        location,
        transactions: locationTransactions[location],
      }))
      .sort((a, b) => a.transactions - b.transactions)
      .reverse(); // Sort by transactions in increasing order
  }

  getQuarterlyTransactions({
    data,
  }: {
    data: LocationSalesTransaction;
  }): TransactionsChartDataTypeQuaterly[] {
    const locationTransactions: { [location: string]: number } = {};
    const quarters = Object.keys(data).reduce((acc, year) => {
      const yearData = data[year];
      for (const month in yearData) {
        const monthInt = parseInt(month);
        const quarter = `${year}-Q${Math.ceil(monthInt / 3)}`;
        acc[quarter] = acc[quarter] || {};
        Object.keys(yearData[month]).forEach((location) => {
          acc[quarter][location] =
            (acc[quarter][location] || 0) +
            yearData[month][location].Transactions;
        });
      }
      return acc;
    }, {} as { [quarter: string]: { [location: string]: number } });

    const last12Quarters = Object.keys(quarters).slice(-12);
    last12Quarters.forEach((quarter) => {
      const quarterData = quarters[quarter];
      Object.keys(quarterData).forEach((location) => {
        locationTransactions[location] =
          (locationTransactions[location] || 0) + quarterData[location];
      });
    });

    return Object.keys(locationTransactions)
      .map((location) => ({
        location,
        transactions: locationTransactions[location],
      }))
      .sort((a, b) => a.transactions - b.transactions)
      .reverse(); // Sort by transactions in increasing order
  }

  getMonthlyTransactions({
    data,
  }: {
    data: LocationSalesTransaction;
  }): TransactionsChartDataTypeMonthly[] {
    const locationTransactions: { [location: string]: number } = {};
    const months = Object.keys(data).reduce((acc, year) => {
      const yearData = data[year];
      for (const month in yearData) {
        const monthKey = `${year}-${month}`;
        acc[monthKey] = yearData[month];
      }
      return acc;
    }, {} as { [month: string]: any });

    const last12Months = Object.keys(months).slice(-12);
    last12Months.forEach((month) => {
      const monthData = months[month];
      for (const location in monthData) {
        locationTransactions[location] =
          (locationTransactions[location] || 0) +
          monthData[location].Transactions;
      }
    });

    return Object.keys(locationTransactions)
      .map((location) => ({
        location,
        transactions: locationTransactions[location],
      }))
      .sort((a, b) => a.transactions - b.transactions)
      .reverse(); // Sort by transactions in increasing order
  }
}

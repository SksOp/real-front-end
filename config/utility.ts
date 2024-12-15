import axios from "axios";
import { ChartDescription } from "./types";
import {
  RentalComparison,
  RentalIndex,
  RentalSegmentation,
  RentalSimilarData,
  RentalTrend,
  RentalValueTrend,
  RentalVersions,
} from "./rental";

import {
  SalesIndex,
  SalesPriceComparison,
  SalesSegmentation,
  SalesSimilarData,
  SalesTrend,
  SalesTypeChart,
  SalesValueTrend,
} from "./sales";
import { BASE_URL } from "./constant";
import { FormatValue } from "@/utils/formatNumbers";

export const ConvertedParams = (params: { [key: string]: string | number }) => {
  const convertedParams: { [key: string]: string } = {};
  Object.keys(params).forEach((key) => {
    switch (key) {
      case "location":
        convertedParams["location"] = String(params[key]);
        break;
      case "start_year":
        convertedParams["start_year"] = String(params[key]);
        break;
      case "end_year":
        convertedParams["end_year"] = String(params[key]);
        break;
      case "usage":
        convertedParams["usage_en"] = String(params[key]);
        break;
      case "property_type":
        convertedParams["prop_type_en"] = String(params[key]);
        break;
    }
    convertedParams[key] = String(params[key]);
  });
  return convertedParams;
};

export const CalculateMatrix = async (
  url: string,
  type: string,
  params?: {
    [key: string]: string | number;
  }
) => {
  console.log(params);
  try {
    const response = await axios.get(url, {
      params: params,
    });

    console.log("response", response.data);
    const transactions = response.data.data.data;

    if (transactions.length === 0) {
      throw new Error("No transactions found for the specified filters.");
    }
    console.log(transactions);
    const growthCalculator = (current: number, previous: number) =>
      ((current - previous) / previous) * 100;

    if (type === "sales") {
      const avgSalesValue = transactions[1].average_value_of_transactions;
      const avgSalesValueGrowth = growthCalculator(
        parseFloat(avgSalesValue),
        parseFloat(transactions[0].average_value_of_transactions)
      );
      const avgPricePerSqft = transactions[1].average_Price_per_sqft;
      const salesPerSqftGrowth = growthCalculator(
        parseFloat(avgPricePerSqft),
        parseFloat(transactions[0].average_Price_per_sqft)
      );
      const totalValue = transactions[1].Total_Value_of_Transaction;
      const totalValueGrowth = growthCalculator(
        parseFloat(totalValue),
        parseFloat(transactions[0].Total_Value_of_Transaction)
      );
      const noOfTransactions = transactions[1].number_of_Row_Used;
      const noOfTransactionsGrowth = growthCalculator(
        parseFloat(noOfTransactions),
        parseFloat(transactions[0].number_of_Row_Used)
      );

      return [
        {
          key: "avg_sales_value",
          title: "Average Sales Value",
          value: avgSalesValue.toFixed(2),
          growth: avgSalesValueGrowth.toFixed(1),
        },
        {
          key: "avg_price_per_sqft",
          title: "Avg. Price per SQFT",
          value: avgPricePerSqft.toFixed(2),
          growth: salesPerSqftGrowth.toFixed(1),
        },
        {
          key: "total_value",
          title: "Total Value",
          value: totalValue.toFixed(2),
          growth: totalValueGrowth.toFixed(1),
        },
        {
          key: "no_of_transactions",
          title: "No of Transactions",
          value: noOfTransactions,
          growth: noOfTransactionsGrowth.toFixed(1),
        },
      ];
    } else {
      const avgRentNew = transactions[1].avg_rent_new_yearly;
      const avgRentNewGrowth = growthCalculator(
        parseFloat(avgRentNew),
        parseFloat(transactions[0].avg_rent_new_yearly)
      );
      const avgRentRenewal = transactions[1].avg_rent_renewal_yearly;
      const avgRentRenewalGrowth = growthCalculator(
        parseFloat(avgRentRenewal),
        parseFloat(transactions[0].avg_rent_renewal_yearly)
      );
      const totalTransaction = transactions[1].total_transaction_yearly;
      const totalTransactionGrowth = growthCalculator(
        parseFloat(totalTransaction),
        parseFloat(transactions[0].total_transaction_yearly)
      );
      const renewalRatio = transactions[1].renewal_ratio_yearly;
      const renewalRatioGrowth = growthCalculator(
        parseFloat(renewalRatio),
        parseFloat(transactions[0].renewal_ratio_yearly)
      );
      console.log(avgRentNewGrowth, avgRentRenewalGrowth);
      return [
        {
          key: "avg_rent_new",
          title: "Average Rent (New)",
          value: avgRentNew.toFixed(2),
          growth: avgRentNewGrowth.toFixed(1),
        },
        {
          key: "sales_per_sqft",
          title: "Average Rent (Renewal)",
          value: avgRentRenewal.toFixed(2),
          growth: avgRentRenewalGrowth.toFixed(1),
        },
        {
          key: "total_transactions",
          title: "Total Transactions",
          value: totalTransaction,
          growth: totalTransactionGrowth.toFixed(1),
        },
        {
          key: "renewal_ratio",
          title: "Renewal Ratio",
          value: String((renewalRatio * 100).toFixed(2)) + "%",
          growth: renewalRatioGrowth.toFixed(1),
        },
      ];
    }
  } catch (error) {
    console.error("Error calculating metrics:", error);
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
};

export const CalculateCharts = async (
  type: "sales" | "rental",
  params: {
    [key: string]: string | number;
  }
) => {
  const allCharts: ChartDescription[] = [];
  console.log(params);
  if (type === "sales") {
    const charts = await Promise.all([
      SalesTypeChart(params),
      SalesValueTrend(params),
      SalesTrend(params),
      SalesIndex(params),
      SalesSimilarData(params),
      SalesPriceComparison(params),
      SalesSegmentation(params),
    ]);

    allCharts.push(...charts);
  } else {
    const charts = await Promise.all([
      RentalVersions(params),
      RentalValueTrend(params),
      RentalTrend(params),
      RentalIndex(params),
      RentalSimilarData(params),
      RentalComparison(params),
      RentalSegmentation(params),
    ]);

    allCharts.push(...charts);
  }

  return allCharts;
};

export const SalesTransactionApi = async (
  pageNo?: number,
  params?: { [key: string]: string | number }
) => {
  try {
    console.log(params);
    pageNo = pageNo || 1;
    const response = await axios.get(
      `${BASE_URL}/api/transaction/pages/${pageNo}`,
      {
        params: params,
      }
    );

    console.log("response", response.data.data);

    const transactionData = response.data.data.map((transaction: any) => {
      const date = transaction?.INSTANCE_DATE?.value
        ? new Date(transaction.INSTANCE_DATE.value)
        : null;
      const areaInSqft =
        FormatValue((transaction?.PROCEDURE_AREA * 10.764).toFixed(2)) || "N/A";

      return {
        transactionId: transaction?.TRANSACTION_NUMBER || null,
        areaName: transaction?.AREA_EN || "N/A",
        transactionAmount: transaction?.TRANS_VALUE || 0,
        date,
        pricePerSqFt: transaction?.price_per_sqft.toFixed(2), // Assuming static for now
        badges: [
          transaction?.isOffplan ? "OffPlan" : "Resale",
          transaction?.PROP_TYPE_EN || "N/A",
          transaction?.USAGE_EN || "N/A",
          transaction?.GROUP_EN || "N/A",
        ],
        bathrooms: transaction?.BATHROOMS || 0,
        bedrooms: transaction?.ROOMS_EN ? transaction.ROOMS_EN : "N/A",
        area: areaInSqft,
        tag: transaction?.first_sale ? "First" : "Resale",
      };
    });

    const data = {
      totalPages: response.data.total_pages,
      transactions: transactionData,
    };
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching sales transactions:", error);
    return {
      totalPages: 0,
      transactions: [],
    };
  }
};

export const RentalTransactionApi = async (
  pageNo?: number,
  params?: { [key: string]: string | number }
) => {
  try {
    pageNo = pageNo || 1;
    const response = await axios.get(`${BASE_URL}/api/rental/pages/${pageNo}`, {
      params: params,
    });

    console.log("response", response.data.data);

    const transactionData = response.data.data.map((transaction: any) => {
      const date = transaction?.START_DATE?.value
        ? new Date(transaction.START_DATE.value)
        : null;
      const areaInSqft =
        FormatValue((transaction?.ACTUAL_AREA * 10.764).toFixed(2)) || "N/A";
      const { year, month, day } = transaction?.Contract_difference || {};

      const DIFFERENCE = year
        ? `${year} years${month ? ` ${month} months` : ""}`
        : month
        ? `${month} months`
        : day
        ? `${day} days`
        : "0";
      return {
        transactionId: transaction?.CONTRACT_NUMBER || null,
        areaName: transaction?.AREA_EN || "N/A",
        transactionAmount: transaction?.ANNUAL_AMOUNT || 0,
        date,
        pricePerSqFt: DIFFERENCE, // Assuming static for now
        badges: [
          transaction?.isOffplan ? "OffPlan" : "Resale",
          transaction?.PROP_TYPE_EN || "N/A",
          transaction?.USAGE_EN || "N/A",
        ],
        bathrooms: transaction?.BATHROOMS || 0,
        bedrooms: transaction?.ROOMS_EN ? transaction.ROOMS_EN : "N/A",
        area: areaInSqft,
        tag: transaction?.VERSION,
      };
    });

    const data = {
      totalPages: response.data.total_pages,
      transactions: transactionData,
    };
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching sales transactions:", error);
    return {
      totalPages: 0,
      transactions: [],
    };
  }
};

export const MarketPulseApi = async (pageNo?: number) => {
  try {
    pageNo = pageNo || 1;
    const response = await axios.get(
      `${BASE_URL}/api/transaction/marketPulse/pages/${pageNo}`
    );

    console.log("response market pulse", response.data.data);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const cardData = response.data.data.data.map((transaction: any) => {
      return {
        area_name: transaction?.area_name || "N/A",
        total_supply: transaction?.total_projects_new_supply,
        avg_price: transaction?.overall_avg_price.toFixed(2) || 0,
        avg_price_per_sqft: transaction?.avg_price_per_sqft.toFixed(2) || 0,
        no_of_transactions: transaction?.no_of_sales_transactions || 0,
        monthly_transactions: transaction?.timeseries_sales_last_12_months.map(
          (item: any) => {
            return {
              year: months[Number(item.month.split("-")[1]) - 1],
              value1: item.transactions,
            };
          }
        ),
      };
    });
    console.log(cardData);
    return cardData;
  } catch (error) {
    console.error("Error fetching sales transactions:", error);
    return [];
  }
};

export const MarketPulseRentalApi = async (pageNo?: number) => {
  try {
    pageNo = pageNo || 1;
    const response = await axios.get(
      `${BASE_URL}/api/rental/marketPulse/pages/${pageNo}`
    );

    console.log("response", response.data.data);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const cardData = response.data.data.data.map((transaction: any) => {
      return {
        area_name: transaction?.area_name || "N/A",
        total_supply: transaction?.units_from_unit_dataSet,
        avg_price: transaction?.average_rent.toFixed(2) || 0,
        avg_price_per_sqft: transaction?.renewal_rate.toFixed(2) || 0,
        no_of_transactions: transaction?.last_12_month_transactions || 0,
        monthly_transactions:
          transaction?.timeseries_rentals_last_12_months.map((item: any) => {
            return {
              year: months[Number(item.month.split("-")[1]) - 1],
              value1: item.transactions,
            };
          }),
      };
    });
    console.log(cardData);
    return cardData;
  } catch (error) {
    console.error("Error fetching sales transactions:", error);
    return [];
  }
};

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
import ApiService from "@/utils/apiService";

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
    if (!params) {
      params = {};
      params.start_year = new Date().getFullYear() - 1;
      params.end_year = new Date().getFullYear();
    }
    if (!params.start_year) {
      params.start_year = Number(params.end_year) - 1;
    }
    console.log(params);
    const response = await axios.get(url, {
      params: params,
    });

    console.log("response", response.data);
    const transactions =
      type === "sales"
        ? response.data.data.result.data
        : response.data.data.data;

    if (transactions.length === 0) {
      throw new Error("No transactions found for the specified filters.");
    }

    console.log(transactions);

    const growthCalculator = (current: number, previous: number | null) => {
      if (previous === null || previous === 0) return null;
      return ((current - previous) / previous) * 100;
    };

    const getMetric = (data: any, key: string) =>
      data[key] !== undefined && data[key] !== null ? parseFloat(data[key]) : 0;

    // Define defaults if transactions[1] is missing
    const currentData = transactions[1] || transactions[0];
    const previousData = transactions[1] ? transactions[0] : null;
    console.log(params, currentData);
    if (type === "sales") {
      const avgSalesValue = getMetric(
        currentData,
        "average_value_of_transactions"
      );
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
            avgSalesValueGrowth !== null
              ? avgSalesValueGrowth.toFixed(1)
              : "N/A",
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
          growth:
            totalValueGrowth !== null ? totalValueGrowth.toFixed(1) : "N/A",
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
    } else {
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

      const totalTransaction = getMetric(
        currentData,
        "total_transaction_yearly"
      );
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
          growth:
            avgRentNewGrowth !== null ? avgRentNewGrowth.toFixed(1) : "N/A",
        },
        {
          key: "sales_per_sqft",
          title: "Average Rent (Renewal)",
          value: avgRentRenewal.toFixed(2),
          growth:
            avgRentRenewalGrowth !== null
              ? avgRentRenewalGrowth.toFixed(1)
              : "N/A",
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

export const CalculateSupplyMatrix = async (
  url: string,
  params?: {
    [key: string]: string | number;
  }
) => {
  console.log(params);
  try {
    console.log(params);
    const response = await axios.get(url, {
      params: params,
    });

    console.log("response", response.data);
    const transactions = response.data.data[0];
    const response2 = await axios.get(`${BASE_URL}/api/developers/total`, {
      params: params,
    });
    const data = response2.data.data[0].developer_count;
    console.log(data);
    if (transactions.length === 0) {
      throw new Error("No transactions found for the specified filters.");
    }
    console.log(transactions);
    const number_of_projects_overall = transactions.total_projects_overall;
    const number_of_projects_supply =
      transactions.total_projects_new_supply_overall;
    const number_of_villas = transactions.total_villas_overall;
    const number_of_apartments = transactions.total_apartments_overall;
    const total_units =
      transactions.total_units_overall + transactions.total_villas_overall;
    const properties_completion_rate =
      transactions.breakdown[transactions.breakdown.length - 1]
        ?.completed_projects /
      transactions.breakdown[transactions.breakdown.length - 1]?.total_projects;

    return [
      {
        key: "number_of_projects_overall",
        title: "Number of Projects (Overall)",
        value: number_of_projects_overall,
      },
      {
        key: "number_of_projects_supply",
        title: "Number of Projects (Supply)",
        value: number_of_projects_supply,
      },
      {
        key: "number_of_villas",
        title: "Number of Villas",
        value: number_of_villas,
      },
      {
        key: "number_of_apartments",
        title: "Number of Apartments",
        value: number_of_apartments,
      },
      {
        key: "total_units",
        title: "Total Units",
        value: total_units,
      },
      {
        key: "properties_completion_rate",
        title: "Properties Completion Rate",
        value: String((properties_completion_rate * 100).toFixed(2)) + "%",
      },
      { key: "total_developers", title: "Total Developers", value: data },
    ];
  } catch (error) {
    console.error("Error calculating metrics:", error);
    return [
      {
        key: "number_of_projects_overall",
        title: "Number of Projects (Overall)",
        value: "N/A",
      },
      {
        key: "number_of_projects_supply",
        title: "Number of Projects (Supply)",
        value: "N/A",
      },
      {
        key: "number_of_villas",
        title: "Number of Villas",
        value: "N/A",
      },
      {
        key: "number_of_apartments",
        title: "Number of Apartments",
        value: "N/A",
      },
    ];
  }
};

export const CalculateOffplanMatrix = async (params: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/transaction/offplan?start_date=2024&end_date=2024`
    );

    const data = response.data.data.data[0];

    const avg_value_unit = data.avg_worth_offplan_unit.toFixed(2);
    const avg_value_villa = data.avg_worth_offplan_villa.toFixed(2);
    const avg_price_per_sqft_villa =
      data.avg_price_per_sqft_offplan_villa.toFixed(2);
    const avg_price_per_sqft_unit =
      data.avg_price_per_sqft_offplan_unit.toFixed(2);
    const avg_price_overall = data.total_worth_offplan.toFixed(2);
    const avg_price_per_sqft_overall =
      data.avg_price_per_sqft_offplan.toFixed(2);
    return [
      {
        key: "avg_value_unit",
        title: "Average Value (Unit)",
        value: avg_value_unit,
      },
      {
        key: "avg_value_villa",
        title: "Average Value (Villa)",
        value: avg_value_villa,
      },
      {
        key: "avg_price_per_sqft_villa",
        title: "Average Price per SQFT (Villa)",
        value: avg_price_per_sqft_villa,
      },
      {
        key: "avg_price_per_sqft_unit",
        title: "Average Price per SQFT (Unit)",
        value: avg_price_per_sqft_unit,
      },
      {
        key: "avg_price_overall",
        title: "Average Price (Overall)",
        value: avg_price_overall,
      },
      {
        key: "avg_price_per_sqft_overall",
        title: "Average Price per SQFT (Overall)",
        value: avg_price_per_sqft_overall,
      },
    ];
  } catch (error) {
    console.error("Error calculating metrics:", error);
    return [
      {
        key: "avg_value_unit",
        title: "Average Value (Unit)",
        value: "N/A",
      },
      {
        key: "avg_value_villa",
        title: "Average Value (Villa)",
        value: "N/A",
      },
      {
        key: "avg_price_per_sqft_villa",
        title: "Average Price per SQFT (Villa)",
        value: "N/A",
      },
      {
        key: "avg_price_per_sqft_unit",
        title: "Average Price per SQFT (Unit)",
        value: "N/A",
      },
      {
        key: "avg_price_overall",
        title: "Average Price (Overall)",
        value: "N/A",
      },
      {
        key: "avg_price_per_sqft_overall",
        title: "Average Price per SQFT (Overall)",
        value: "N/A",
      },
    ];
  }
};

export const CalculateCharts = async (
  type: "sales" | "rental",
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  const allCharts: ChartDescription[] = [];
  console.log(params);
  if (type === "sales") {
    const charts = await Promise.all([
      SalesTypeChart(params, token),
      SalesValueTrend(params, token),
      SalesTrend(params, token),
      SalesIndex(params, token),
      SalesSimilarData(params, token),
      SalesPriceComparison(params, token),
      SalesSegmentation(params, token),
    ]);

    allCharts.push(...charts);
  } else {
    const charts = await Promise.all([
      RentalVersions(params, token),
      RentalValueTrend(params, token),
      RentalTrend(params, token),
      RentalIndex(params, token),
      RentalSimilarData(params, token),
      RentalComparison(params, token),
      RentalSegmentation(params, token),
    ]);

    allCharts.push(...charts);
  }

  return allCharts;
};

export const SalesTransactionApi = async (
  pageNo?: number,
  params?: { [key: string]: string | number },
  token?: string
) => {
  try {
    pageNo = pageNo || 1;
    const response = await ApiService(
      "transaction",
      `pages/${pageNo}`,
      params,
      token
    );

    console.log("response", response.result);

    const transactionData = response.result.data.map((transaction: any) => {
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
      totalPages: response.result.total_pages,
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
  params?: { [key: string]: string | number },
  token?: string | null
) => {
  try {
    pageNo = pageNo || 1;
    const response = await ApiService(
      "rental",
      `pages/${pageNo}`,
      params,
      token
    );

    const transactionData = response.result.data.map((transaction: any) => {
      const date = transaction?.REGISTRATION_DATE?.value
        ? new Date(transaction.REGISTRATION_DATE.value)
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
          transaction?.VERSION === "Renewed" ? "Renew" : transaction?.VERSION,
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
      totalPages: response.result.total_pages,
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

export const MarketPulseApi = async (pageNo?: number, token?: string) => {
  try {
    pageNo = pageNo || 1;
    const response = await ApiService(
      "transaction",
      `marketPulse/pages/${pageNo}`,
      {},
      token
    );

    console.log("response market pulse", response.result);

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

    const cardData = response.result.map((transaction: any) => {
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

export const MarketPulseRentalApi = async (pageNo?: number, token?: string) => {
  try {
    pageNo = pageNo || 1;
    const response = await ApiService(
      "rental",
      `marketPulse/pages/${pageNo}`,
      {},
      token
    );

    console.log("response", response.result);

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

    const cardData = response.result.map((transaction: any) => {
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

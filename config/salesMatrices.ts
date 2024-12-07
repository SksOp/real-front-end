import { SalesFilter } from "./filters";
import { Matrix } from "./matrices";
import { CalculateMatrix } from "./utility";
import {
  SalesIndex,
  SalesPriceRanges,
  SalesSegmentation,
  SalesTrend,
  SalesTypeChart,
  SalesValueTrend,
} from "./sales";
import { BASE_URL } from "./constant";

export const SalesMatrices: Matrix[] = [
  {
    key: "total_sales_value",
    title: "Total Sales Value",
    description:
      "Total market value of sales transactions, with growth compared to the previous period.",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "total_sales_value",
      calculate: async (params) => {
        params.start_year = Number(params.end_year) - 1;
        const sourceURL = `${BASE_URL}/api/transaction/trends`;
        const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
        return matrixOutput[2];
      },
    },
  },
  {
    key: "average_sales_value",
    title: "Average Sales Value",
    description:
      "Average property sale price, including growth trends from the last period.",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "average_sales_value",
      calculate: async (params) => {
        params = {};
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `${BASE_URL}/api/transaction/trends?start_year=${
          presentYear - 1
        }&end_year=${presentYear}`;

        const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
        return matrixOutput[0];
      },
    },
  },
  {
    key: "average_price_per_sqft",
    title: "Average Price per Sqft",
    description:
      "Average property price per square foot, compared to previous periods.",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "average_price_per_sqft",
      calculate: async (params) => {
        params = {};
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `${BASE_URL}/api/transaction/trends?start_year=${
          presentYear - 1
        }&end_year=${presentYear}`;

        const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
        return matrixOutput[1];
      },
    },
  },
  {
    key: "number_of_transactions",
    title: "Number of Transactions",
    description:
      "Total sales transactions completed, with a growth indicator from prior periods.",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "total_sales_value",
      calculate: async (params) => {
        params = {};
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `${BASE_URL}/api/transaction/trends?start_year=${
          presentYear - 1
        }&end_year=${presentYear}`;

        const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
        return matrixOutput[3];
      },
    },
  },
  {
    key: "transaction_type",
    title: "Transaction Type",
    description:
      "Bar chart showing the distribution of transactions by payment method.  (Cash/Mortgage/Gifts)",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "transaction_type",
      calculate: async (params) => {
        return await SalesTypeChart(params);
      },
    },
  },
  {
    key: "transaction_value_trend",
    title: "Transaction Value Trend",
    description:
      "Column chart comparing yearly transaction values, with drilldown options to months.",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "transaction_value_trend",
      calculate: async (params) => {
        return await SalesValueTrend(params);
      },
    },
  },
  {
    key: "number_of_transactions_trend",
    title: "Number of Transactions Trend",
    description:
      "Column chart displaying yearly transaction trends, supporting drilldown to monthly data.",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "number_of_transactions_trend",
      calculate: async (params) => {
        return await SalesTrend(params);
      },
    },
  },
  {
    key: "sales_price_index",
    title: "Sales Price Index",
    description:
      "Index chart showing price quartiles for affordable, medium, and luxury property segments.",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "sales_price_index",
      calculate: async (params) => {
        const data = await SalesIndex(params);
        data.sub_charts = [];
        return data;
      },
    },
  },
  {
    key: "sales_price_range_distribution",
    title: "Sales Price Range Distribution.",
    description:
      "Doughnut chart displaying the distribution of properties across different price ranges.",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "sales_price_range_distribution",
      calculate: async (params) => {
        return await SalesPriceRanges(params);
      },
    },
  },
  {
    key: "residential_vs_commercial",
    title: "Residential vs Commercial.",
    description:
      "Distribution of properties between residential and commercial segments.",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "residential_vs_commercial",
      calculate: async (params) => {
        const data = await SalesSegmentation(params);
        data.sub_charts = [];
        return data;
      },
    },
  },
  {
    key: "sale_type",
    title: "Sale Type (Freehold vs Leasehold)",
    description:
      "Proportion of freehold vs leasehold properties in the market.",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "freehold_vs_leasehold",
      calculate: async (params) => {
        const data = await SalesSegmentation(params);
        const extractChart = data.sub_charts[3];
        return extractChart;
      },
    },
  },
  {
    key: "first_sale_vs_resale",
    title: "First Sale vs Resale.",
    description: "Distribution of properties sold as new or resold.",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "first_sale_vs_resale",
      calculate: async (params) => {
        const data = await SalesSegmentation(params);
        const extractChart = data.sub_charts[1];
        return extractChart;
      },
    },
  },
  {
    key: "property_type",
    title: "Property Type.",
    description:
      "Distribution of sales by property type (villa, apartment, land, etc.).",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "property_type",
      calculate: async (params) => {
        const data = await SalesSegmentation(params);
        const extractChart = data.sub_charts[2];
        return extractChart;
      },
    },
  },
  {
    key: "property_subtype_commercial",
    title: "Property Subtype (Commercial)",
    description:
      "Distribution of property subtypes or number of bedrooms for commercial units..",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "property_type",
      calculate: async (params) => {
        const data = await SalesSegmentation(params);
        const extractChart = data.sub_charts[4];
        return extractChart;
      },
    },
  },
  {
    key: "property_subtype_residential",
    title: "Property Subtype (Residential)",
    description:
      "Distribution of property subtypes or number of bedrooms for residential units.",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "property_type",
      calculate: async (params) => {
        const data = await SalesSegmentation(params);
        const extractChart = data.sub_charts[4];
        return extractChart;
      },
    },
  },
  {
    key: "volume_of_mortgage_transactions",
    title: "Volume of mortgage transactions",
    description: "Total number of mortgage sale registrations",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "total_sales_value",
      calculate: async (params) => {
        params.group_en = "Mortgage";
        params.start_year = Number(params.end_year) - 1;
        const sourceURL = `${BASE_URL}/api/transaction/trends`;

        const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
        return matrixOutput[3];
      },
    },
  },
  {
    key: "value_of_mortgage_transactions",
    title: "Value of mortgage transactions",
    description: "Total value of mortgage sale registrations",
    type: "sales",
    filters: SalesFilter,
    calculate_charts: {
      key: "total_sales_value",
      calculate: async (params) => {
        params.group_en = "Mortgage";
        params.start_year = Number(params.end_year) - 1;
        const sourceURL = `${BASE_URL}/api/transaction/trends`;

        const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
        return matrixOutput[2];
      },
    },
  },
];

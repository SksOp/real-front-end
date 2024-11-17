import { ChartDescription, MatrixData, PageFilter } from "./types";
import {
  CalculateMatrix,
  RentalIndex,
  RentalSegmentation,
  RentalTrend,
  RentalValueTrend,
  SalesIndex,
  SalesPriceRanges,
  SalesSegmentation,
  SalesTrend,
  SalesTypeChart,
  SalesValueTrend,
} from "./utility";

export interface Matrices {
  key: string;
  title: string;
  description: string;
  tag?: string;
  filters?: PageFilter[];
  calculate_charts?: {
    key: string;
    calculate: (params?: {
      [key: string]: string | number;
    }) => Promise<ChartDescription> | Promise<MatrixData>;
  };
}

export const KeyMatrices: Matrices[] = [
  {
    key: "total_sales_value",
    title: "Total Sales Value",
    description:
      "Total market value of sales transactions, with growth compared to the previous period.",
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "total_sales_value",
      calculate: async (params) => {
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends?start_year=${
          presentYear - 1
        }&end_year=${presentYear}`;

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
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "average_sales_value",
      calculate: async (params) => {
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends?start_year=${
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
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "average_price_per_sqft",
      calculate: async (params) => {
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends?start_year=${
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
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "total_sales_value",
      calculate: async (params) => {
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends?start_year=${
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
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
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
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
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
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
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
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
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
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
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
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
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
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "freehold_vs_leasehold",
      calculate: async (params) => {
        const data = await SalesSegmentation(params);
        const extractChart = data.sub_charts[0];
        return extractChart;
      },
    },
  },
  {
    key: "first_sale_vs_resale",
    title: "First Sale vs Resale.",
    description: "Distribution of properties sold as new or resold.",
  },
  {
    key: "property_type",
    title: "Property Type.",
    description:
      "Distribution of sales by property type (villa, apartment, land, etc.).",
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
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
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "property_type",
      calculate: async (params) => {
        const data = await SalesSegmentation(params);
        const extractChart = data.sub_charts[3];
        return extractChart;
      },
    },
  },
  {
    key: "property_subtype_residential",
    title: "Property Subtype (Residential)",
    description:
      "Distribution of property subtypes or number of bedrooms for residential units.",
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "property_type",
      calculate: async (params) => {
        const data = await SalesSegmentation(params);
        const extractChart = data.sub_charts[3];
        return extractChart;
      },
    },
  },
  {
    key: "volume_of_mortgage_transactions",
    title: "Volume of mortgage transactions",
    description: "Total number of mortgage sale registrations",
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "total_sales_value",
      calculate: async (params) => {
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends?start_year=${
          presentYear - 1
        }&end_year=${presentYear}&group_en=Mortgage`;

        const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
        return matrixOutput[3];
      },
    },
  },
  {
    key: "value_of_mortgage_transactions",
    title: "Value of mortgage transactions",
    description: "Total value of mortgage sale registrations",
    filters: [
      {
        key: "group_en",
        label: "Transaction Type",
        options: ["Sales", "Mortgage", "Gifts"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "property_subtype",
        label: "Property Subtype",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
      },
      {
        key: "IS_OFFPLAN_EN",
        label: "Ready v/s Offplan",
        options: ["Ready", "Offplan"],
      },
      {
        key: "IS_FREE_HOLD_EN",
        label: "Freehold v/s Leasehold",
        options: ["Freehold", "Non Free Hold"],
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "total_sales_value",
      calculate: async (params) => {
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends?start_year=${
          presentYear - 1
        }&end_year=${presentYear}&group_en=Mortgage`;

        const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
        return matrixOutput[2];
      },
    },
  },
  {
    key: "total_rental_value",
    title: "Total Rental Value",
    description:
      "Total market value of rental transactions, with growth compared to the previous period.",
    filters: [
      {
        key: "version_en",
        label: "Rental Type",
        options: ["New", "Renew"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "total_sales_value",
      calculate: async (params) => {
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/rental/average?start_year=${
          presentYear - 1
        }&end_year=${presentYear}`;

        const matrixOutput = await CalculateMatrix(sourceURL, "rental", params);
        return matrixOutput[2];
      },
    },
  },
  {
    key: "average_rent_value",
    title: "Average Rent Value",
    description:
      "Average rental price across all properties, with a comparison to prior periods.",
    filters: [
      {
        key: "version_en",
        label: "Rental Type",
        options: ["New", "Renew"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "average_rent_value",
      calculate: async (params) => {
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/rental/average?start_year=${
          presentYear - 1
        }&end_year=${presentYear}`;

        const matrixOutput = await CalculateMatrix(sourceURL, "rental", params);

        const data1 = matrixOutput[0];
        const data2 = matrixOutput[1];
        const result: MatrixData = {
          key: "average_rent_value",
          title: "Average Rent Value",
          value: data1.value + data2.value,
        };
        return result;
      },
    },
  },
  {
    key: "number_of_rental_transactions",
    title: "Number of Rental Transactions",
    description:
      "Total number of rental agreements signed, with growth trends from previous periods.",
    filters: [
      {
        key: "version_en",
        label: "Rental Type",
        options: ["New", "Renew"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "number_of_rental_transactions",
      calculate: async (params) => {
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/rental/average?start_year=${
          presentYear - 1
        }&end_year=${presentYear}`;

        const matrixOutput = await CalculateMatrix(sourceURL, "rental", params);
        return matrixOutput[2];
      },
    },
  },
  {
    key: "renewal_ratio",
    title: "Renewal Ratio",
    description: "Percentage of leases renewed compared to new agreements.",
    filters: [
      {
        key: "version_en",
        label: "Rental Type",
        options: ["New", "Renew"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "renewal_ratio",
      calculate: async (params) => {
        const date = new Date();
        const presentYear = date.getFullYear();
        const sourceURL = `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/rental/average?start_year=${
          presentYear - 1
        }&end_year=${presentYear}`;

        const matrixOutput = await CalculateMatrix(sourceURL, "rental", params);
        return matrixOutput[3];
      },
    },
  },
  {
    key: "rental_value_trend",
    title: "Rental Value Trend",
    description:
      "Column chart comparing yearly rental values, with drilldown to monthly data.",
    filters: [
      {
        key: "version_en",
        label: "Rental Type",
        options: ["New", "Renew"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "rental_value_trend",
      calculate: async (params) => {
        return await RentalValueTrend(params);
      },
    },
  },
  {
    key: "rental_transactions_trend",
    title: "Rental Transactions Trend",
    description:
      "Yearly trend of rental transactions, with detailed monthly breakdown.",
    filters: [
      {
        key: "version_en",
        label: "Rental Type",
        options: ["New", "Renew"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "rental_transactions_trend",
      calculate: async (params) => {
        return await RentalTrend(params);
      },
    },
  },
  {
    key: "rental_price_range_distribution",
    title: "Rental Price Range Distribution",
    description:
      "Doughnut chart displaying rental price segmentation across various ranges.",
    filters: [
      {
        key: "version_en",
        label: "Rental Type",
        options: ["New", "Renew"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "rental_price_range_distribution",
      calculate: async (params) => {
        const data = await RentalIndex(params);
        const extractChart = data.sub_charts[0];
        return extractChart;
      },
    },
  },
  {
    key: "residential_vs_commercial_rental",
    title: "Residential vs Commercial Rental",
    description:
      "Proportion of rental transactions in residential vs commercial sectors.",
    filters: [
      {
        key: "version_en",
        label: "Rental Type",
        options: ["New", "Renew"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "residential_vs_commercial_rental",
      calculate: async (params) => {
        const data = await RentalSegmentation(params);
        data.sub_charts = [];
        return data;
      },
    },
  },
  {
    key: "residential_vs_commercial_rental",
    title: "Residential vs Commercial Rental",
    description:
      "Proportion of rental transactions in residential vs commercial sectors.",
    filters: [
      {
        key: "version_en",
        label: "Rental Type",
        options: ["New", "Renew"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "residential_vs_commercial_rental",
      calculate: async (params) => {
        const data = await RentalSegmentation(params);
        data.sub_charts = [];
        return data;
      },
    },
  },
  {
    key: "property_type_rental",
    title: "Property Type Rentals",
    description:
      "Rental transactions categorized by property type (villa, apartment, etc.).",
    filters: [
      {
        key: "version_en",
        label: "Rental Type",
        options: ["New", "Renew"],
      },
      {
        key: "usage_en",
        label: "Usage",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage",
      },
      {
        key: "location",
        label: "Area",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
      },
      {
        key: "property_type",
        label: "Property Type",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property-type",
      },
      {
        key: "year",
        label: "Year",
        options: ["2024", "2023", "2022", "2021", "2020"],
      },
    ],
    calculate_charts: {
      key: "property_type_rental",
      calculate: async (params) => {
        const data = await RentalSegmentation(params);
        const extractChart = data.sub_charts[2];
        return extractChart;
      },
    },
  },
  {
    key: "property_subtype_rental",
    title: "Property Subtype Rentals",
    description: "Rental segmentation by property subtypes.",
  },
];

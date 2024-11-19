import { ChartDescription, MatrixData, PageFilter } from "./types";
import {
  CalculateMatrix,
  SalesIndex,
  SalesPriceRanges,
  SalesSegmentation,
  SalesTrend,
  SalesTypeChart,
  SalesValueTrend,
} from "./utility";

import {
  RentalIndex,
  RentalSegmentation,
  RentalTrend,
  RentalValueTrend,
} from "./rental";
import axios from "axios";
import { SupplyFilter } from "./filters";

export interface Matrix {
  key: string;
  title: string;
  description: string;
  type: "sales" | "rentals" | "supply" | "offplan" | "sales_index";
  tag?: string;
  filters?: PageFilter[];
  calculate_charts?: {
    key: string;
    calculate: (params?: {
      [key: string]: string | number;
    }) => Promise<ChartDescription> | Promise<MatrixData>;
  };
}

export const KeyMatrices: Matrix[] = [
  {
    key: "total_sales_value",
    title: "Total Sales Value",
    description:
      "Total market value of sales transactions, with growth compared to the previous period.",
    type: "sales",
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
    type: "sales",
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
    type: "sales",
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
    type: "sales",
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
    type: "sales",
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
    type: "sales",
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
    type: "sales",
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
    type: "sales",
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
    type: "sales",
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
    type: "sales",
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
    type: "sales",
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
    type: "sales",
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
    type: "sales",
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
    type: "rentals",
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
    type: "rentals",
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
    type: "rentals",
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
    type: "rentals",
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
    type: "rentals",
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
    type: "rentals",
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
    type: "rentals",
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
    type: "rentals",
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
    type: "rentals",
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
    type: "rentals",
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
    type: "rentals",
    calculate_charts: {
      key: "property_subtype_rental",
      calculate: async (params) => {
        const data = await RentalSegmentation(params);
        const extractChart = data.sub_charts[3];
        return extractChart;
      },
    },
  },
  {
    key: "number_of_bedrooms_rental",
    title: "Number of Bedrooms Rentals",
    description: "Rental segmentation by number of bedrooms.",
    type: "rentals",
  },
  {
    key: "number_of_projects_overall",
    title: "Number of Projects (Overall)",
    description: "Total number of projects in the market.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "number_of_projects_overall",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/projects/details`
          );
          const data = response.data.data[0]?.total_projects_overall;

          const result: MatrixData = {
            key: "number_of_projects",
            title: "Number of Projects",
            value: data,
          };
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "number_of_projects",
            title: "Number of Projects",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "number_of_projects_supply",
    title: "Number of Projects (Supply)",
    description: "Total number of projects in the market.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "number_of_projects_overall",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/projects/details`,
            { params: params }
          );

          const data = response.data.data[0]?.total_projects_new_supply_overall;

          const result: MatrixData = {
            key: "number_of_projects",
            title: "Number of Projects",
            value: data,
          };
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "number_of_projects",
            title: "Number of Projects",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "number_of_villas",
    title: "Number of Villas",
    description: "Total number of villa properties available.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "number_of_villas",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/projects/details`,
            { params: params }
          );

          const data = response.data.data[0]?.total_villas_overall;

          const result: MatrixData = {
            key: "number_of_villas",
            title: "Number of Villas",
            value: data,
          };
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "number_of_villas",
            title: "Number of Villas",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "number_of_apartments",
    title: "Number of Apartments/Units",
    description: "Total number of apartment units available in the market.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "number_of_apartments",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/projects/details`,
            { params: params }
          );

          const data = response.data.data[0]?.total_apartments_overall;

          const result: MatrixData = {
            key: "number_of_apartments",
            title: "Number of Apartments",
            value: data,
          };
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "number_of_apartments",
            title: "Number of Apartments",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "total_units",
    title: "Total Units",
    description: "Aggregate number of all property types in the supply.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "total_units",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/projects/details`,
            { params: params }
          );

          const data =
            response.data.data[0]?.total_units_overall +
            response.data.data[0]?.total_villas_overall;

          const result: MatrixData = {
            key: "total_units",
            title: "Total Units",
            value: data,
          };
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "total_units",
            title: "Total Units",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "properties_completion_rate",
    title: "Properties Completion Rate (2024)",
    description: "Percentage of properties completed in 2024.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "properties_completion_rate",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/projects/details?start_year=2024&end_year=2024`,
            { params: params }
          );

          const data =
            response.data.data[0]?.breakdown[0]?.completed_projects /
            response.data.data[0]?.breakdown[0]?.total_projects;

          const result: MatrixData = {
            key: "properties_completion_rate",
            title: "Properties Completion Rate",
            value: String((data * 100).toFixed(2)) + "%",
          };
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "properties_completion_rate",
            title: "Properties Completion Rate",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "number_of_yearly_completed_units",
    title: "Number of Yearly Completed Units",
    description: "Total number of units completed each year.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "number_of_yearly_completed_units",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/projects/details`,
            { params: params }
          );

          const data = response.data.data[0]?.breakdown;

          const chartData = data.map((item: any) => {
            return {
              year: item.year,
              completed_units: item.completed_projects,
            };
          });

          return {
            name: "Number of Yearly Completed Units",
            description: "Total number of units completed each year.",
            chart_type: "bar",
            chartConfig: {
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            },
            sub_charts: [],
            insights:
              "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
            data: chartData, // Calculated data will be here
          };
        } catch (error) {
          console.error(error);
          return {
            name: "Number of Yearly Completed Units",
            description: "Total number of units completed each year.",
            chart_type: "bar",
            chartConfig: {
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            },
            sub_charts: [],
            data: [], // Calculated data will be here
          };
        }
      },
    },
  },
  {
    key: "future_planned_supply",
    title: "Future Planned Supply",
    description: "Planned property supply starting from 2024 onwards.",
    type: "supply",
    filters: SupplyFilter,
    // calculate_charts: {
    //   key: "Future Planned Supply",
    // calculate: async (params) => {
    //   try {
    //     const response = await axios.get(
    //       `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/projects/details?start_year=2024&end_year=100000`,
    //       { params: params }
    //     );

    //   } catch (error) {
    //     console.error(error);
    //     return {
    //       key: "Future Planned Supply",
    //       title: "Future Planned Supply",
    //       value: "N/A",
    //     };
    //   }
    // },
  },
  {
    key: "monthly_properties",
    title: "Monthly Property Sales Volume ",
    description:
      "Monthly comparison of sales volumes for offplan vs ready properties.",
    type: "offplan",
    calculate_charts: {
      key: "monthly_properties",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_year=2024&end_year=2024`,
            { params: params }
          );

          const data = response.data.data.data[0]?.month;
          console.log(data);
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
          const chartData = data.map((item: any) => {
            return {
              month: months[item.month - 1],
              offplan: item.total_volume_offplan,
              ready: item.total_volume_ready,
            };
          });
          console.log(chartData);
          return {
            name: "Monthly Property Sales Volume",
            description:
              "Monthly comparison of sales volumes for offplan vs ready properties.",
            chart_type: "stacked_bar",
            chartConfig: {
              offplan: { color: "#F0FCF3" },
              ready: { color: "#FFEDED" },
            },
            sub_charts: [],
            insights:
              "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
            data: chartData, // Calculated data will be here
          };
        } catch (error) {
          console.error(error);
          return {
            name: "Monthly Property Sales Volume",
            description:
              "Monthly comparison of sales volumes for offplan vs ready properties.",
            chart_type: "stacked_bar",
            chartConfig: {
              offplan: { color: "#F0FCF3" },
              ready: { color: "#FFEDED" },
            },
            sub_charts: [],
            data: [], // Calculated data will be here
          };
        }
      },
    },
  },
  {
    key: "annual_properties_sales_volume",
    title: "Annual Property Sales Volume ",
    description: "Annual comparison of sales volumes for all areas.",
    type: "offplan",
    calculate_charts: {
      key: "annual_properties_in_all areas",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_year=2010&end_year=2024`,
            { params: params }
          );

          const data = response.data.data.data;
          const chartData = data.map((item: any) => {
            return {
              year: item.year,
              value1: item.total_volume_offplan,
              value2: item.total_volume_ready,
            };
          });

          return {
            name: "Annual Property Sales Volume in All Areas",
            description: "Annual comparison of sales volumes for all areas.",
            chart_type: "dual_bar",
            chartConfig: {
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            },
            sub_charts: [],
            insights:
              "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
            data: chartData, // Calculated data will be here
          };
        } catch (error) {
          console.error(error);
          return {
            name: "Annual Property Sales Volume in All Areas",
            description: "Annual comparison of sales volumes for all areas.",
            chart_type: "dual_bar",
            chartConfig: {
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            },
            sub_charts: [],
            data: [], // Calculated data will be here
          };
        }
      },
    },
  },
  {
    key: "annual_properties_sales_value",
    title: "Annual Property Sales Value ",
    description: "Annual comparison of sales volumes for all areas.",
    type: "offplan",
    calculate_charts: {
      key: "annual_properties_in_all areas",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_year=2010&end_year=2024`,
            { params: params }
          );

          const data = response.data.data.data;
          const chartData = data.map((item: any) => {
            return {
              year: item.year,
              value1: item.total_worth_offplan,
              value2: item.total_worth_ready,
            };
          });

          return {
            name: "Annual Property Sales Volume in All Areas",
            description: "Annual comparison of sales volumes for all areas.",
            chart_type: "dual_bar",
            chartConfig: {
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            },
            sub_charts: [],
            insights:
              "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
            data: chartData, // Calculated data will be here
          };
        } catch (error) {
          console.error(error);
          return {
            name: "Annual Property Sales Volume in All Areas",
            description: "Annual comparison of sales volumes for all areas.",
            chart_type: "dual_bar",
            chartConfig: {
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            },
            sub_charts: [],
            data: [], // Calculated data will be here
          };
        }
      },
    },
  },
  {
    key: "sales_volume_proportion",
    title: "Sales volume proportion",
    description: "Proportion of total sales volume by area.",
    type: "offplan",
    calculate_charts: {
      key: "sales_volume_proportion",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_year=2023&end_year=2024`,
            { params: params }
          );

          const data1 = response.data.data.data[0];
          const data2 = response.data.data.data[1];

          const chartData = [
            {
              year: 2024,
              value1:
                (data1.total_volume_offplan /
                  (data1.total_volume_ready + data1.total_volume_offplan)) *
                100,
              value2:
                (data1.total_volume_ready /
                  (data1.total_volume_ready + data1.total_volume_offplan)) *
                100,
            },
            {
              year: 2023,
              value1:
                (data2.total_volume_offplan /
                  (data2.total_volume_ready + data2.total_volume_offplan)) *
                100,
              value2:
                (data2.total_volume_ready /
                  (data2.total_volume_ready + data2.total_volume_offplan)) *
                100,
            },
          ];
          return {
            name: "Sales Volume Proportion",
            description: "Proportion of total sales volume by area.",
            chart_type: "dual_bar",
            chartConfig: {
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            },
            sub_charts: [],
            insights:
              "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
            data: chartData, // Calculated data will be here
          };
        } catch (error) {
          console.error(error);
          return {
            name: "Sales Volume Proportion",
            description: "Proportion of total sales volume by area.",
            chart_type: "dual_bar",
            chartConfig: {
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            },
            sub_charts: [],
            data: [], // Calculated data will be here
          };
        }
      },
    },
  },
  {
    key: "sales_value_proportion",
    title: "Sales Value proportion",
    description: "Proportion of total sales volume by area.",
    type: "offplan",
    calculate_charts: {
      key: "sales_volume_proportion",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_year=2023&end_year=2024`,
            { params: params }
          );

          const data1 = response.data.data.data[0];
          const data2 = response.data.data.data[1];

          const chartData = [
            {
              year: 2024,
              value1:
                (data1.total_worth_offplan /
                  (data1.total_worth_offplan + data1.total_worth_ready)) *
                100,
              value2:
                (data1.total_worth_ready /
                  (data1.total_worth_offplan + data1.total_worth_ready)) *
                100,
            },
            {
              year: 2023,
              value1:
                (data2.total_worth_offplan /
                  (data2.total_worth_ready + data2.total_worth_offplan)) *
                100,
              value2:
                (data2.total_worth_ready /
                  (data2.total_worth_ready + data2.total_worth_offplan)) *
                100,
            },
          ];
          return {
            name: "Sales Value Proportion",
            description: "Proportion of total sales volume by area.",
            chart_type: "dual_bar",
            chartConfig: {
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            },
            sub_charts: [],
            insights:
              "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
            data: chartData, // Calculated data will be here
          };
        } catch (error) {
          console.error(error);
          return {
            name: "Sales Volume Proportion",
            description: "Proportion of total sales volume by area.",
            chart_type: "dual_bar",
            chartConfig: {
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            },
            sub_charts: [],
            data: [], // Calculated data will be here
          };
        }
      },
    },
  },
  {
    key: "offplan_price_per_sqft",
    title: "Offplan Price per Sqft",
    description:
      "Average price per square foot for offplan vs ready properties.",
    type: "offplan",
    calculate_charts: {
      key: "offplan_price_per_sqft",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_year=2024&end_year=2024`,
            { params: params }
          );
          const data = response.data.data.data[0];

          const chartData = [
            {
              name: "Offplan",
              value: data.avg_price_per_sqft_offplan.toFixed(2),
              fill: "#F0FCF3",
            },
            {
              name: "Ready",
              value: data.avg_price_per_sqft_ready.toFixed(2),
              fill: "#FFEDED",
            },
          ];
          return {
            name: "Offplan Price per Sqft",
            description:
              "Average price per square foot for offplan vs ready properties.",
            chart_type: "horizontal_bar",
            chartConfig: {
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            },
            sub_charts: [],
            insights:
              "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
            data: chartData, // Calculated data will be here
          };
        } catch (error) {
          console.error(error);
          return {
            name: "Offplan Price per Sqft",
            description:
              "Average price per square foot for offplan vs ready properties.",
            chart_type: "horizontal_bar",
            chartConfig: {
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            },
            sub_charts: [],
            data: [], // Calculated data will be here
          };
        }
      },
    },
  },
];

import axios from "axios";
import { RentalFilter } from "./filters";
import { Matrix } from "./matrices";
import {
  RentalIndex,
  RentalPriceRange,
  RentalSegmentation,
  RentalTrend,
  RentalValueTrend,
} from "./rental";
import { MatrixData } from "./types";
import { CalculateMatrix } from "./utility";
import { BASE_URL } from "./constant";
import { CalculateMatrixRental } from "./rentalMatrix";

export const RentalMatrices: Matrix[] = [
  {
    key: "total_rental_value",
    title: "Total Rental Value",
    description:
      "Total market value of rental transactions, with growth compared to the previous period.",
    type: "rentals",
    filters: RentalFilter,
    calculate_charts: {
      key: "total_sales_value",
      calculate: async (params, token) => {
        params.start_year = Number(params.end_year) - 1;
        const matrixOutput = await CalculateMatrixRental(params, token);
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
    filters: RentalFilter,
    calculate_charts: {
      key: "average_rent_value",
      calculate: async (params, token) => {
        params.start_year = Number(params.end_year) - 1;
        const matrixOutput = await CalculateMatrixRental(params, token);
        const data1 = matrixOutput[0];
        const data2 = matrixOutput[1];
        const result: MatrixData = {
          key: "average_rent_value",
          title: "Average Rent Value",
          value:
            params.version_en === "New"
              ? data1.value
              : params.version_en === "Renew"
              ? data2.value
              : Number(data1.value) + Number(data2.value),
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
    filters: RentalFilter,
    calculate_charts: {
      key: "number_of_rental_transactions",
      calculate: async (params, token) => {
        params.start_year = Number(params.end_year) - 1;
        const matrixOutput = await CalculateMatrixRental(params, token);
        return matrixOutput[2];
      },
    },
  },
  {
    key: "renewal_ratio",
    title: "Renewal Ratio",
    description: "Percentage of leases renewed compared to new agreements.",
    type: "rentals",
    filters: RentalFilter,
    calculate_charts: {
      key: "renewal_ratio",
      calculate: async (params, token) => {
        params.start_year = Number(params.end_year) - 1;
        const matrixOutput = await CalculateMatrixRental(params, token);
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
    filters: RentalFilter,
    calculate_charts: {
      key: "rental_value_trend",
      calculate: async (params, token) => {
        return (await RentalValueTrend(params, token)) as any;
      },
    },
  },
  {
    key: "rental_transactions_trend",
    title: "Rental Transactions Trend",
    description:
      "Yearly trend of rental transactions, with detailed monthly breakdown.",
    type: "rentals",
    filters: RentalFilter,
    calculate_charts: {
      key: "rental_transactions_trend",
      calculate: async (params, token) => {
        return await RentalTrend(params, token);
      },
    },
  },
  {
    key: "rental_price_range_distribution",
    title: "Rental Price Range Distribution",
    description:
      "Doughnut chart displaying rental price segmentation across various ranges.",
    type: "rentals",
    filters: RentalFilter,
    calculate_charts: {
      key: "rental_price_range_distribution",
      calculate: async (params, token) => {
        return await RentalPriceRange(params, token);
      },
    },
  },
  {
    key: "residential_vs_commercial_rental",
    title: "Residential vs Commercial Rental",
    description:
      "Proportion of rental transactions in residential vs commercial sectors.",
    type: "rentals",
    filters: RentalFilter,
    calculate_charts: {
      key: "residential_vs_commercial_rental",
      calculate: async (params, token) => {
        const data = await RentalSegmentation(params, token);
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
    filters: RentalFilter,
    calculate_charts: {
      key: "property_type_rental",
      calculate: async (params, token) => {
        const data = await RentalSegmentation(params, token);
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
    filters: RentalFilter,
    calculate_charts: {
      key: "property_subtype_rental",
      calculate: async (params, token) => {
        const data = await RentalSegmentation(params, token);
        const extractChart = data.sub_charts[3];
        return extractChart;
      },
    },
  },
];

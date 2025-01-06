import axios from "axios";
import { Matrix } from "./matrices";
import { BASE_URL } from "./constant";
import {
  FlatSalesIndex,
  FlatSalesValue,
  OverallSalesIndex,
  OverallSalesValue,
  VillaSalesIndex,
  VillaSalesValue,
} from "./sales_index";

export const SalesIndexMatrices: Matrix[] = [
  {
    key: "overall_sales_index",
    title: "Overall Sales Index",
    description:
      "Sales index for overall units regardless property type based on comparison with previous years and base year 2012",
    type: "sales_index",
    calculate_charts: {
      key: "overall_sales_index",
      calculate: async (params, token) => {
        return await OverallSalesIndex(token);
      },
    },
  },
  {
    key: "overall_sales_value",
    title: "Overall Sales Value",
    description:
      "Sales Value for overall units regardless property type based on comparison with previous years and base year 2012",
    type: "sales_index",
    calculate_charts: {
      key: "overall_sales_value",
      calculate: async (params, token) => {
        return await OverallSalesValue(token);
      },
    },
  },
  {
    key: "villa_sales_index",
    title: "Villa Sales Index",
    description:
      "Sales index for villas based on comparison with previous years and base year 2012",
    type: "sales_index",
    calculate_charts: {
      key: "villa_sales_index",
      calculate: async (params, token) => {
        return await VillaSalesIndex(token);
      },
    },
  },
  {
    key: "villa_sales_value",
    title: "Villa Sales Value",
    description:
      "Sales Value for villa units regardless property type based on comparison with previous years and base year 2012",
    type: "sales_index",
    calculate_charts: {
      key: "villa_sales_value",
      calculate: async (params, token) => {
        return await VillaSalesValue(token);
      },
    },
  },
  {
    key: "flat_sales_index",
    title: "Flat Sales Index",
    description:
      "Sales index for flats based on comparison with previous years and base year 2012",
    type: "sales_index",
    calculate_charts: {
      key: "flat_sales_index",
      calculate: async (params, token) => {
        return await FlatSalesIndex(token);
      },
    },
  },
  {
    key: "flat_sales_value",
    title: "Flat Sales Value",
    description:
      "Sales Value for Flat units regardless property type based on comparison with previous years and base year 2012",
    type: "sales_index",
    calculate_charts: {
      key: "flat_sales_value",
      calculate: async (params, token) => {
        return await FlatSalesValue(token);
      },
    },
  },
];

import axios from "axios";
import { Matrix } from "./matrices";
import { MatrixData } from "./types";
import { SalesIndex } from "./sales";
import { BASE_URL } from "./constant";
import {
  AnnualPropertySalesValue,
  AnnualPropertySalesVolume,
  AverageValueByRoom,
  MonthlyProperties,
  OffPlanPricePErSqft,
  SalesValueProportion,
  SalesVolumeProportion,
} from "./offplan";
import { CalculateSupplyMatrix } from "./supplyMatrix";

export const OffPlanMatrices: Matrix[] = [
  {
    key: "monthly_properties",
    title: "Monthly Property Sales Volume ",
    description:
      "Monthly comparison of sales volumes for offplan vs ready properties.",
    type: "offplan",
    calculate_charts: {
      key: "monthly_properties",
      calculate: async (params, token) => {
        return await MonthlyProperties(token);
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
      calculate: async (params, token) => {
        return (await AnnualPropertySalesVolume(token)) as any;
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
      calculate: async (params, token) => {
        return await AnnualPropertySalesValue(token);
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
      calculate: async (params, token) => {
        return SalesVolumeProportion(token);
      },
    },
  },
  {
    key: "sales_value_proportion",
    title: "Sales Value proportion",
    description: "Proportion of total sales volume by area.",
    type: "offplan",
    calculate_charts: {
      key: "sales_value_proportion",
      calculate: async (params, token) => {
        return await SalesValueProportion(token);
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
      calculate: async (params, token) => {
        return await OffPlanPricePErSqft(token);
      },
    },
  },
  {
    key: "total_units_available",
    title: "Total Units Available",
    description: "Total number of units currently available in the market.",
    type: "offplan",
    calculate_charts: {
      key: "total_units_available",
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(
            { IS_OFFPLAN_EN: "Off-plan" },
            token
          );

          const result = matrixOutput[4];
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
    key: "total_offplan_units_planned_2024",
    title: "Total Offplan Units Planned (in 2024)",
    description: "Number of offplan units planned for 2024 completion.",
    type: "offplan",
    calculate_charts: {
      key: "total_offplan_units_planned_2024",
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(
            { ...params, IS_OFFPLAN_EN: "Off-plan" },
            token
          );

          const data = matrixOutput[1];
          const result: MatrixData = {
            key: "total_offplan_units_planned_2024",
            title: "Total Offplan Units Planned (in 2024)",
            value: data.value,
          };
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "total_offplan_units_planned_2024",
            title: "Total Offplan Units Planned (in 2024)",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "total_offplan_units_planned_after2024",
    title: "Total Offplan Units Planned (after 2024)",
    description: "Number of offplan units planned for future completion.",
    type: "offplan",
    calculate_charts: {
      key: "total_offplan_units_planned_2024",
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(
            { start_year: 2024, end_year: 100000, IS_OFFPLAN_EN: "Off-plan" },
            token
          );

          const data = matrixOutput[1];

          const result: MatrixData = {
            key: "total_offplan_units_planned_2024",
            title: "Total Offplan Units Planned (in 2024)",
            value: data.value,
          };
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "total_offplan_units_planned_2024",
            title: "Total Offplan Units Planned (in 2024)",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "offplan_price_index",
    title: "Offplan Price Index",
    description: "Price index and benchmark for offplan properties",
    type: "offplan",
    calculate_charts: {
      key: "offplan_price_index",
      calculate: async (params, token) => {
        params = params || {};

        params["IS_OFFPLAN_EN"] = "Off-Plan";
        const data = await SalesIndex(params, token);
        data.sub_charts = [];
        return data;
      },
    },
  },
  {
    key: "avg_value_villa",
    title: "Average Value (Villa)",
    description: "Average value per villa offplan units.",
    type: "offplan",
    calculate_charts: {
      key: "avg_value_villa",
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(
            {
              start_year: 2024,
              end_year: 2024,
              IS_OFFPLAN_EN: "Off-plan",
              ...params,
            },
            token
          );

          const result = matrixOutput[1];
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "avg_value_villa",
            title: "Average Value (Villa)",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "avg_value_units",
    title: "Average Value (Unit)",
    description: "Average value per apartment offplan units.",
    type: "offplan",
    calculate_charts: {
      key: "avg_value_units",
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(
            {
              start_year: 2024,
              end_year: 2024,
              IS_OFFPLAN_EN: "Off-plan",
              ...params,
            },
            token
          );

          const result = matrixOutput[0];
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "avg_value_units",
            title: "Average Value (Unit)",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "avg_price_per_sqft_villa",
    title: "Average Price per Sqft (Villa)",
    description: "Average price per square foot for offplan villa properties.",
    type: "offplan",
    calculate_charts: {
      key: "avg_price_per_sqft_villa",
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(
            {
              start_year: 2024,
              end_year: 2024,
              IS_OFFPLAN_EN: "Off-plan",
              ...params,
            },
            token
          );

          const result = matrixOutput[2];
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "avg_price_per_sqft_villa",
            title: "Average Price per Sqft (Villa)",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "avg_price_per_sqft_units",
    title: "Average Price per Sqft (Unit)",
    description:
      "Average price per square foot for offplan apartment properties.",
    type: "offplan",
    calculate_charts: {
      key: "avg_price_per_sqft_units",
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(
            {
              start_year: 2024,
              end_year: 2024,
              IS_OFFPLAN_EN: "Off-plan",
              ...params,
            },
            token
          );

          const result = matrixOutput[3];

          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "avg_price_per_sqft_units",
            title: "Average Price per Sqft (Unit)",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "avg_price_overall",
    title: "Average Price (Overall)",
    description: "Average price for offplan properties.",
    type: "offplan",
    calculate_charts: {
      key: "avg_price_overall",
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(
            {
              start_year: 2024,
              end_year: 2024,
              IS_OFFPLAN_EN: "Off-plan",
              ...params,
            },
            token
          );

          const result = matrixOutput[4];
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "avg_price_overall",
            title: "Average Price (Overall)",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "avg_price_per_sqft_overall",
    title: "Average Price per Sqft (Overall)",
    description: "Average price per square foot for offplan properties.",
    type: "offplan",
    calculate_charts: {
      key: "avg_price_per_sqft_overall",
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(
            {
              start_year: 2024,
              end_year: 2024,
              IS_OFFPLAN_EN: "Off-plan",
              ...params,
            },
            token
          );

          const result = matrixOutput[5];
          return result;
        } catch (error) {
          console.error(error);
          return {
            key: "avg_price_per_sqft_overall",
            title: "Average Price per Sqft (Overall)",
            value: "N/A",
          };
        }
      },
    },
  },
  {
    key: "avg_value_rooms",
    title: "Average value by No. of rooms",
    description: "Average value of the property by no of bedrooms.",
    type: "offplan",
    calculate_charts: {
      key: "avg_value_rooms",
      calculate: async (params, token) => {
        return await AverageValueByRoom(token);
      },
    },
  },
];

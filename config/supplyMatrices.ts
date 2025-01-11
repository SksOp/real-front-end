import axios from "axios";
import { Matrix } from "./matrices";
import { SupplyFilter } from "./filters";
import { MatrixData } from "./types";
import { BASE_URL } from "./constant";
import { CalculateSupplyMatrix } from "./supplyMatrix";
import {
  DeliveredUnitsPerAreaDubai,
  FuturePlannedSupply,
  FuturePropertySupplyPerArea,
  PlannedPropertiesByCompletionPercentage,
  SupplyByPriceRanges,
  YearlyCompletedUnits,
  YearlyLaunchedProperties,
} from "./supply";

export const SupplyMatrices: Matrix[] = [
  {
    key: "number_of_projects_overall",
    title: "Number of Projects (Overall)",
    description: "Total number of projects in the market.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "number_of_projects_overall",
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(params, token);

          const result = matrixOutput[0];

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
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(params, token);

          const result = matrixOutput[1];

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
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(params, token);

          const result = matrixOutput[2];

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
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(params, token);

          const result = matrixOutput[3];

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
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(params, token);

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
    key: "properties_completion_rate",
    title: "Properties Completion Rate (2024)",
    description: "Percentage of properties completed in 2024.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "properties_completion_rate",
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(params, token);

          const result = matrixOutput[5];

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
      calculate: async (params, token) => {
        return await YearlyCompletedUnits(params, token);
      },
    },
  },
  {
    key: "number_of_yearly_launched_properties",
    title: "Number of Yearly Launched Properties",
    description: "Total properties launched annually.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "number_of_yearly_launched_properties",
      calculate: async (params, token) => {
        return await YearlyLaunchedProperties(params, token);
      },
    },
  },
  {
    key: "future_planned_supply",
    title: "Future Planned Supply",
    description: "Planned property supply starting from 2024 onwards.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "Future Planned Supply",
      calculate: async (params, token) => {
        return await FuturePlannedSupply(params, token);
      },
    },
  },
  {
    key: "supply_by_price_range",
    title: "Supply by Price Range",
    description: "Distribution of property supply across various price ranges.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "supply_by_price_range",
      calculate: async (params, token) => {
        return await SupplyByPriceRanges(params, token);
      },
    },
  },
  {
    key: "future_property_supply_per_area",
    title: "Future Property Supply per Area",
    description: "Forecasted supply of properties by area.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "future_property_supply_per_area",
      calculate: async (params, token) => {
        return (await FuturePropertySupplyPerArea(params, token)) as any;
      },
    },
  },
  {
    key: "delivered_units_per_area_dubai",
    title: "Delivered Units in Dubai per Area",
    description: "Total units delivered per area in Dubai.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "delivered_units_per_area_dubai",
      calculate: async (params, token) => {
        return await DeliveredUnitsPerAreaDubai(params, token);
      },
    },
  },
  {
    key: "total_developers",
    title: "Total Developers",
    description: "Total number of active developers in the market.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "total_developers",
      calculate: async (params, token) => {
        try {
          const matrixOutput = await CalculateSupplyMatrix(params, token);

          const result = matrixOutput[6];

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
    key: "planed_properties_by_completion_percentage",
    title: "Planned properties by Completion Percentage",
    description:
      "Doughnut chart to visualise percentage distribution of planned projects.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "planed_properties_by_completion_percentage",
      calculate: async (params, token) => {
        return await PlannedPropertiesByCompletionPercentage(params, token);
      },
    },
  },
];

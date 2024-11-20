import axios from "axios";
import { Matrix } from "./matrices";
import { SupplyFilter } from "./filters";
import { MatrixData } from "./types";

export const SupplyMatrices: Matrix[] = [
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
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/projects/details`,
            { params: params }
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
];

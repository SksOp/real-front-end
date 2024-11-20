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
    key: "number_of_yearly_launched_properties",
    title: "Number of Yearly Launched Properties",
    description: "Total properties launched annually.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "number_of_yearly_launched_properties",
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
              launched_properties: item.total_projects,
            };
          });

          return {
            name: "Number of Yearly Launched Properties",
            description: "Total properties launched annually.",
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
            name: "Number of Yearly Launched Properties",
            description: "Total properties launched annually.",
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
    key: "supply_by_price_range",
    title: "Supply by Price Range",
    description: "Distribution of property supply across various price ranges.",
    type: "supply",
    filters: SupplyFilter,
    calculate_charts: {
      key: "supply_by_price_range",
      calculate: async (params) => {
        try {
          // const response = await axios.get(
          //   `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/projects/price-range`,
          //   { params: params }
          // );

          // const data = response.data.data[0].price_range;

          const chartData = [
            {
              name: "<100K",
              value: 4000,
              colorClass: "bg-[#FFDBDB]",
            },
            {
              name: "200K to 400k",
              value: 6800,
              colorClass: "bg-[#EFEEFC]",
            },
            {
              name: "500k to 1M",
              value: 5200,
              colorClass: "bg-[#DDF8E4]",
            },
            {
              name: "1M to 2M",
              value: 4000,
              colorClass: "bg-[#FCF8D1]",
            },
          ];
          console.log(chartData);
          return {
            name: "Supply by Price Range",
            description:
              "Distribution of property supply across various price ranges.",
            chart_type: "donut",
            chartConfig: {
              "<100K": { color: "#FFDBDB" },
              "200K to 400k": { color: "#EFEEFC" },
              "500k to 1M": { color: "#DDF8E4" },
              "1M to 2M": { color: "#FCF8D1" },
            },
            sub_charts: [],
            insights:
              "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
            data: chartData, // Calculated data will be here
          };
        } catch (error) {
          console.error(error);
          return {
            name: "Supply by Price Range",
            description:
              "Distribution of property supply across various price ranges.",
            chart_type: "donut",
            chartConfig: {
              "<100K": { color: "#FFDBDB" },
              "200K to 400k": { color: "#EFEEFC" },
              "500k to 1M": { color: "#DDF8E4" },
              "1M to 2M": { color: "#FCF8D1" },
            },
            sub_charts: [],
            data: [], // Calculated data will be here
          };
        }
      },
    },
  },
  {
    key: "future_property_supply_per_area",
    title: "Future Property Supply per Area",
    description: "Forecasted supply of properties by area.",
    type: "supply",
    filters: SupplyFilter,
  },
  {
    key: "delivered_units_per_area_dubai",
    title: "Delivered Units in Dubai per Area",
    description: "Total units delivered per area in Dubai.",
    type: "supply",
    filters: SupplyFilter,
  },
  {
    key: "total_developers",
    title: "Total Developers",
    description: "Total number of active developers in the market.",
    type: "supply",
  },
  {
    key: "planed_properties_by_completion_percentage",
    title: "Planned properties by Completion Percentage",
    description:
      "Doughnut chart to visualise percentage distribution of planned projects.",
    type: "supply",
  },
];

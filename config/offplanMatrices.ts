import axios from "axios";
import { Matrix } from "./matrices";
import { MatrixData } from "./types";
import { SalesIndex } from "./sales";

export const OffPlanMatrices: Matrix[] = [
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
  {
    key: "total_units_available",
    title: "Total Units Available",
    description: "Total number of units currently available in the market.",
    type: "offplan",
    calculate_charts: {
      key: "total_units_available",
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
    key: "total_offplan_units_planned_2024",
    title: "Total Offplan Units Planned (in 2024)",
    description: "Number of offplan units planned for 2024 completion.",
    type: "offplan",
    calculate_charts: {
      key: "total_offplan_units_planned_2024",
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/projects/details?start_year=2024&end_year=2024`,
            { params: params }
          );

          const data = response.data.data[0].total_projects_new_supply_overall;

          const result: MatrixData = {
            key: "total_offplan_units_planned_2024",
            title: "Total Offplan Units Planned (in 2024)",
            value: data,
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
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/projects/details?start_year=2024&end_year=10000`,
            { params: params }
          );

          const data = response.data.data[0].total_projects_new_supply_overall;

          const result: MatrixData = {
            key: "total_offplan_units_planned_2024",
            title: "Total Offplan Units Planned (in 2024)",
            value: data,
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
      calculate: async (params) => {
        params = params || {};

        params["IS_OFFPLAN_EN"] = "Off-Plan";
        const data = await SalesIndex(params);
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
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_date=2024&end_date=2024`,
            { params: params }
          );
          const data = response.data.data.data[0];

          const result: MatrixData = {
            key: "avg_value_villa",
            title: "Average Value (Villa)",
            value: data.avg_worth_offplan_villa.toFixed(2),
          };
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
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_date=2024&end_date=2024`,
            { params: params }
          );
          const data = response.data.data.data[0];

          const result: MatrixData = {
            key: "avg_value_units",
            title: "Average Value (Unit)",
            value: data.avg_worth_offplan_villa.toFixed(2),
          };
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
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_date=2024&end_date=2024`,
            { params: params }
          );
          const data = response.data.data.data[0];

          const result: MatrixData = {
            key: "avg_price_per_sqft_villa",
            title: "Average Price per Sqft (Villa)",
            value: data.avg_price_per_sqft_offplan_villa.toFixed(2),
          };
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
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_date=2024&end_date=2024`,
            { params: params }
          );
          const data = response.data.data.data[0];

          const result: MatrixData = {
            key: "avg_price_per_sqft_units",
            title: "Average Price per Sqft (Unit)",
            value: data.avg_price_per_sqft_offplan_unit.toFixed(2),
          };
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
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_date=2024&end_date=2024`,
            { params: params }
          );
          const data = response.data.data.data[0];

          const result: MatrixData = {
            key: "avg_price_overall",
            title: "Average Price (Overall)",
            value: data.total_worth_offplan.toFixed(2),
          };
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
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_date=2024&end_date=2024`,
            { params: params }
          );
          const data = response.data.data.data[0];

          const result: MatrixData = {
            key: "avg_price_per_sqft_overall",
            title: "Average Price per Sqft (Overall)",
            value: data.avg_price_per_sqft_offplan.toFixed(2),
          };
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
      calculate: async (params) => {
        try {
          const response = await axios.get(
            `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/offplan?start_date=2024&end_date=2024`,
            { params: params }
          );
          const data = response.data.data.data[0];
          const chartsData = [
            {
              name: "Studio",
              value: data.avg_trans_value_studio,
              colorClass: "bg-[#FFC8C8]",
            },
            {
              name: "1 BHK",
              value: data.avg_trans_value_1bhk,
              colorClass: "bg-[#E2FFEB]",
            },
            {
              name: "2 BHK",
              value: data.avg_trans_value_2bhk,
              colorClass: "bg-[#FFE2E2]",
            },
            {
              name: "3 BHK",
              value: data.avg_trans_value_3bhk,
              colorClass: "bg-[#FFF3E0]",
            },
            {
              name: "4 BHK",
              value: data.avg_trans_value_4bhk,
              colorClass: "bg-[#E5F2FF]",
            },
            {
              name: "5 BHK+",
              value: data.avg_trans_value_5bhk_plus,
              colorClass: "bg-[#FFDBDB]",
            },
            {
              name: "Penthouse",
              value: data.avg_trans_value_penthouse,
              colorClass: "bg-[#FCF8D1]",
            },
          ];
          return {
            name: "Average value by No. of rooms",
            description: "Average value of the property by no of bedrooms.",
            chart_type: "donut",
            chartConfig: {
              Studio: { color: "#FFC8C8" },
              "1 BHK": { color: "#E2FFEB" },
              "2 BHK": { color: "#FFE2E2" },
              "3 BHK": { color: "#FFF3E0" },
              "4 BHK": { color: "#E5F2FF" },
              "5 BHK+": { color: "#FFDBDB" },
              Penthouse: { color: "#FCF8D1" },
            },
            sub_charts: [],
            insights:
              "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
            data: chartsData, // Calculated data will be here
          };
        } catch (error) {
          console.error(error);
          return {
            name: "Average value by No. of rooms",
            description: "Average value of the property by no of bedrooms.",
            chart_type: "donut",
            chartConfig: {
              Studio: { color: "#FFC8C8" },
              "1 BHK": { color: "#E2FFEB" },
              "2 BHK": { color: "#FFE2E2" },
              "3 BHK": { color: "#FFF3E0" },
              "4 BHK": { color: "#E5F2FF" },
              "5 BHK+": { color: "#FFDBDB" },
              Penthouse: { color: "#FCF8D1" },
            },
            sub_charts: [],
            insights:
              "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
            data: [], // Calculated data will be here
          };
        }
      },
    },
  },
];

import axios from "axios";
import { Matrix } from "./matrices";

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
  },
  {
    key: "total_offplan_units_planned_2024",
    title: "Total Offplan Units Planned (in 2024)",
    description: "Number of offplan units planned for 2024 completion.",
    type: "offplan",
  },
  {
    key: "total_offplan_units_planned_2024",
    title: "Total Offplan Units Planned (after 2024)",
    description: "Number of offplan units planned for future completion.",
    type: "offplan",
  },
];

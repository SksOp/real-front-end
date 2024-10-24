import axios from "axios";
import { Dashboard } from "./types";

export const dashboards: Dashboard[] = [
  {
    key: "sales_transactions_overview",
    name: "Sales Transactions Overview",
    description:
      "Analyze sales transactions, values, and trends across the Dubai property market.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: null,
      mode: "sales",
    },
    page_filters: [
      {
        key: "bedroom",
        label: "Bedroom",
        options: ["1", "2", "3", "4", "5", "6"],
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=bedroom",
      },
      {
        key: "developer",
        label: "Developer",
        options: ["A", "B", "C", "D"],
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=developer",
      },
      {
        key: "location",
        label: "Location",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
        options: ["Dubai Marina", "Dubai Central", "Dubai East", "Dubai West"],
      },
      {
        key: "freehold",
        label: "Freehold",
        options: ["Yes", "No"],
      },
    ],

    calculate_matrics: async (params) => {
      try {
        const response = await axios.get(
          `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends`,
          {
            params: params,
          }
        );

        console.log("response", response.data);
        const transactions = response.data.data.data;

        if (transactions.length === 0) {
          throw new Error("No transactions found for the specified filters.");
        }

        const totalValue = transactions.reduce(
          (sum: number, transaction: any) => {
            return (
              sum +
              transaction.Total_Value_of_Transaction /
                transaction.nuber_of_columns_used
            );
          },
          0
        );

        const totalAreaInMeter = transactions.reduce(
          (sum: number, transaction: any) => {
            return sum + transaction.Total_area_in_meter * 10.764;
          },
          0
        );

        const avgSalesValue = totalValue;
        const salesPerSqft = 10.764 * (totalValue / totalAreaInMeter);
        const noOfTransactions = transactions.length;

        return [
          {
            key: "avg_sales_value",
            title: "Average Sales Value",
            value: avgSalesValue.toFixed(2),
            growth: "-21",
          },
          {
            key: "sales_per_sqft",
            title: "Sales Per Sqft",
            value: salesPerSqft.toFixed(2),
            growth: "21",
          },
          {
            key: "total_value",
            title: "Total Value",
            value: totalValue.toFixed(2),
            growth: "21",
          },
          {
            key: "no_of_transactions",
            title: "No of Transactions",
            value: noOfTransactions,
            growth: "-21",
          },
        ];
      } catch (error) {
        console.error("Error calculating metrics:", error);
        throw new Error("Failed to calculate metrics.");
      }
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params) => {
          try {
            const response = await axios.get(
              `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/types`,
              {
                params: params,
              }
            );

            // Will do the required calculation here and return the data to build graph
            const data = response.data.data.data[0];
            const chartData = [
              { name: "Cash", value: data.total_sales, fill: "#DDF8E4" },
              { name: "Mortgage", value: data.total_mortgage, fill: "#EFEEFC" },
              { name: "Gifts", value: data.total_gift, fill: "#FFDBDB" },
            ];
            console.log("data Transs", data);
            return {
              name: "Transactions Type",
              filters: [],
              chart_type: "horizontal_bar",
              chartConfig: {
                Cash: {
                  color: "#DDF8E4",
                },
                Mortgage: {
                  color: "#EFEEFC",
                },
                Gifts: {
                  color: "#FFDBDB",
                },
              },
              sub_charts: [],
              data: chartData, // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating transactions type chart:", error);
            throw new Error("Failed to calculate transactions type chart.");
          }
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async () => {
          try {
            const response = await axios.get(
              `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends?start_year=2014&end_year=2024`
            );

            const data = response.data.data.data;
            const chartData = data.map((item: any) => ({
              year: item.Year,
              value: item.Total_Value_of_Transaction,
            }));

            // Will do the required calculation here and return the data to build graph
            return {
              name: "Transactions Value Trend",
              description:
                "Compare transactional total value and value per sqft over time.",
              filters: ["Total Value", "Value per SQFT"],
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
            console.error(
              "Error calculating transactions value trend chart:",
              error
            );
            throw new Error(
              "Failed to calculate transactions value trend chart."
            );
          }
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async () => {
          try {
            const response = await axios.get(
              `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends?year=2024`
            );

            const data = response.data.data.data;
            const chartData = data.map((item: any) => ({
              month: item.Month,
              value1: item.Total_Value_of_Transaction,
            }));

            // Will do the required calculation here and return the data to build graph
            return {
              name: "Sales Transactions Trend",
              description: "Compare number of transactions over time!",
              filters: ["Monthly", "Quarterly", "Yearly"],
              chart_type: "line",
              chartConfig: {
                desktop: {
                  label: "Desktop",
                  color: "hsl(var(--chart-1))",
                },
              },
              sub_charts: [],
              insights:
                "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
              data: chartData, // Calculated data will be here
            };
          } catch (error) {
            console.error(
              "Error calculating sales transactions trend chart:",
              error
            );
            throw new Error(
              "Failed to calculate sales transactions trend chart."
            );
          }
        },
      },
      {
        key: "sales_index",
        calculate: async () => {
          try {
            // const response = await axios.get(
            //   `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/lastTrans`
            // );

            // Will do the required calculation here and return the data to build graph
            return {
              name: "Sales Index",
              description: "This is overall sales value index in Dubai.",
              chart_type: "percentile_bar",
              filters: [],
              chartConfig: {
                desktop: {
                  label: "Desktop",
                  color: "hsl(var(--chart-1))",
                },
              },
              sub_charts: [
                {
                  key: "properties",
                  calculate: async () => {
                    try {
                      const response = await axios.get(
                        `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/metrics/total_sales_value`
                      );

                      // Will do the required calculation here and return the data to build graph
                      return {
                        name: "Sales Index",
                        chart_type: "donut",
                        chartConfig: {
                          "Dubai Marina": { color: "#FFC8C8" },
                          "Dubai Central": { color: "#EFEEFC" },
                          "Dubai East": { color: "#D1F6DB" },
                          "Dubai West": { color: "#FCF8D1" },
                        },
                        data: [], // Calculated data will be here
                      };
                    } catch (error) {
                      console.error(
                        "Error calculating properties for sales index:",
                        error
                      );
                      throw new Error(
                        "Failed to calculate properties for sales index."
                      );
                    }
                  },
                },
              ],
              insights:
                "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
              data: [], // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating sales index chart:", error);
            throw new Error("Failed to calculate sales index chart.");
          }
        },
      },
      {
        key: "similar_transactions",
        calculate: async () => {
          try {
            const response = await axios.get(
              `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/last`
            );

            // Will do the required calculation here and return the data to build graph
            const data = response.data.data.data;
            const chartcolumns = ["Date", "Sell Price", "Area (ft)"];

            const chartData = data.map((item: any) => {
              // Inline date formatting
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
              const date = new Date(item.dates.value);
              const formattedDate = `${date.getDate()}/${
                months[date.getMonth()]
              }/${date.getFullYear()}`;

              return {
                Date: formattedDate, // Use the formatted date
                "Sell Price": item.value,
                "Area (ft)": item.price_per_sqft.toFixed(2),
              };
            });

            return {
              name: "Similar Transactions",
              chart_type: "table",
              chartConfig: {},
              filters: [],
              sub_metrics: [],
              view_more: true,
              columns: chartcolumns,
              data: chartData, // Calculated data will be here
            };
          } catch (error) {
            console.error(
              "Error calculating similar transactions chart:",
              error
            );
            throw new Error("Failed to calculate similar transactions chart.");
          }
        },
      },
      {
        key: "price_Comparison",
        calculate: async () => {
          try {
            // const response = await axios.get(
            //   `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/metrics/total_sales_value`
            // );

            // Will do the required calculation here and return the data to build graph
            return {
              name: "Price Comparison",
              chart_type: "comparison_table",
              filters: [],
              chartConfig: {},
              sub_metrics: [],
              view_more: true,
              data: [], // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating price comparison chart:", error);
            throw new Error("Failed to calculate price comparison chart.");
          }
        },
      },
      {
        key: "sales_segmentation",
        calculate: async () => {
          try {
            // const response = await axios.get(
            //   `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/metrics/total_sales_value`
            // );

            // Will do the required calculation here and return the data to build graph
            return {
              name: "Sales Segmentation",
              description:
                "Compare sales segmentation across residential and commercial.",
              chart_type: "comparison_table",
              chartConfig: {},
              filters: ["All", "Residential", "Commercial"],
              sub_charts: [
                {
                  key: "sale_type",
                  calculate: async () => {
                    try {
                      const response = await axios.get(
                        `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/metrics/total_sales_value`
                      );

                      // Will do the required calculation here and return the data to build graph
                      return {
                        name: "Sales Type",
                        chart_type: "horizontal_bar",
                        data: [], // Calculated data will be here
                        insights:
                          "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
                      };
                    } catch (error) {
                      console.error("Error calculating sale type:", error);
                      throw new Error("Failed to calculate sale type.");
                    }
                  },
                },
                {
                  key: "property_status",
                  calculate: async () => {
                    try {
                      const response = await axios.get(
                        `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/metrics/total_sales_value`
                      );

                      // Will do the required calculation here and return the data to build graph
                      return {
                        name: "Property Status",
                        chart_type: "horizontal_bar",
                        data: [], // Calculated data will be here
                      };
                    } catch (error) {
                      console.error(
                        "Error calculating property status:",
                        error
                      );
                      throw new Error("Failed to calculate property status.");
                    }
                  },
                },
              ],
              data: [], // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating sales segmentation chart:", error);
            throw new Error("Failed to calculate sales segmentation chart.");
          }
        },
      },
    ],
  },
];

const data = [
  {
    id: 1,
    title: "Sales Transactions Overview",
    description:
      "Analyze sales transactions, values, and trends across the Dubai property market.",
  },
  {
    id: 2,
    title: "Mortgage Transactions Analysis",
    description:
      "Insights into property purchases made using mortgage financing trends and details.",
  },
  {
    id: 3,
    title: "Gift Transactions Insights",
    description:
      "Track and analyze property transactions gifted, highlighting market behavior and trends.",
  },
  {
    id: 4,
    title: "Overall Market Transactions",
    description:
      "Comprehensive overview of all sales, mortgages, and gift property transactions.",
  },
  {
    id: 5,
    title: "Residential Sales Breakdown",
    description:
      "Analysis of residential property sales, including pricing, volumes, and market activity.",
  },
  {
    id: 6,
    title: "Commercial Sales Overview",
    description:
      "Track and analyze sales in the commercial property sector including offices and shops.",
  },
  {
    id: 7,
    title: "Rental Market Trends",
    description:
      "Overview of rental transactions and trends, showing market performance across Dubai.",
  },
  {
    id: 8,
    title: "Residential Rentals Analysis",
    description:
      "In-depth look into rental transactions for residential properties, including rates and trends.",
  },
  {
    id: 9,
    title: "Commercial Rentals Overview",
    description:
      "Analysis of commercial property rentals including warehouses, offices, and retail units.",
  },
  {
    id: 10,
    title: "Developer Sales Comparison",
    description:
      "Compare sales performance among Dubai's leading property developers.",
  },
  {
    id: 11,
    title: "Residential Index Overview",
    description:
      "Key metrics and index to track trends in residential property sales and rentals.",
  },
  {
    id: 12,
    title: "Commercial Index Overview",
    description:
      "Commercial property index tracking trends and performance across different sectors and areas.",
  },
  {
    id: 13,
    title: "Annual Performance Summary",
    description:
      "Annual overview of market performance, transactions, growth, and other vital metrics.",
  },
  {
    id: 14,
    title: "Supply Trends Dashboard",
    description:
      "Insights on property supply, including available inventory across various Dubai areas.",
  },
  {
    id: 15,
    title: "Top Performing Areas",
    description:
      "Discover high-performing areas based on transactions, demand, and property trends.",
  },
  {
    id: 16,
    title: "Offplan Market Insights",
    description:
      "Analysis of offplan property sales trends, developer performance, and future inventory.",
  },
];

// charts: [
//       {
//         key: "transactions_type",
//         name: "Transactions Type",
//         filters: [],
//         chart_type: "horizontal_bar",
//         chartConfig: {
//           Cash: {
//             color: "#DDF8E4",
//           },
//           Mortgage: {
//             color: "#EFEEFC",
//           },
//           Gifts: {
//             color: "#FFDBDB",
//           },
//         },
//         sub_metrics: [],
//         api_endpoint: "/api/metrics/total_sales_value", // API endpoint to fetch data
//       },
//       {
//         key: "transactions_value_trend",
//         name: "Transactions Value Trend",
//         description:
//           "Compare transactional total value and value per sqft over time.",
//         filters: ["Total Value", "Value per SQFT"],
//         chart_type: "bar",
//         chartConfig: {
//           desktop: {
//             label: "Desktop",
//             color: "hsl(var(--chart-1))",
//           },
//         },
//         sub_metrics: [],
//         api_endpoint: "/api/metrics/sales_per_sqft",
//         insights:
//           "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
//       },
//       {
//         key: "sales_transactions_trend",
//         name: "Sales Transactions Trend",
//         description: "Compare number of transactions over time!",
//         filters: ["Monthly", "Quarterly", "Yearly"],
//         chart_type: "line",
//         chartConfig: {
//           desktop: {
//             label: "Desktop",
//             color: "hsl(var(--chart-1))",
//           },
//         },
//         sub_metrics: [],
//         api_endpoint: "/api/metrics/sales_per_sqft",
//         insights:
//           "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
//       },
//       {
//         key: "sales_index",
//         name: "Sales Index",
//         description: "This is overall sales value index in Dubai.",
//         chart_type: "percentile_bar",
//         filters: [],
//         sub_metrics: [
//           {
//             key: "properties",
//             name: "Sales Index",
//             chart_type: "donut",
//             chartConfig: {
//               "Dubai Marina": { color: "#FFC8C8" },
//               "Dubai Central": { color: "#EFEEFC" },
//               "Dubai East": { color: "#D1F6DB" },
//               "Dubai West": { color: "#FCF8D1" },
//             },
//             api_endpoint: "/api/metrics/sales_index",
//           },
//         ],
//         api_endpoint: "/api/metrics/top_developers",
//         insights:
//           "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
//       },
//       {
//         key: "similar_transactions",
//         name: "Similar Transactions",
//         chart_type: "table",
//         filters: [],
//         sub_metrics: [],
//         view_more: true,
//         api_endpoint: "/api/metrics/sales_transactions",
//       },
//       {
//         key: "price_Comparison",
//         name: "Price Comparison",
//         chart_type: "comparison_table",
//         filters: [],
//         sub_metrics: [],
//         view_more: true,
//         api_endpoint: "/api/metrics/sales_transactions",
//       },
//       {
//         key: "sales_segmentation",
//         name: "Sales Segmentation",
//         description:
//           "Compare sales segmentation across residential and commercial.",
//         chart_type: "comparison_table",
//         filters: ["All", "Residential", "Commercial"],
//         sub_metrics: [
//           {
//             key: "sale_type",
//             name: "Sales Type",
//             chart_type: "horizontal_bar",
//             api_endpoint: "/api/metrics/sales_segmentation",
//             insights:
//               "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
//           },
//           {
//             key: "property_status",
//             name: "Property Status",
//             chart_type: "horizontal_bar",
//             api_endpoint: "/api/metrics/sales_segmentation",
//           },
//         ],
//         api_endpoint: "/api/metrics/sales_transactions",
//       },
//     ],

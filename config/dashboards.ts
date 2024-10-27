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
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=room",
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
        searchable: true,
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

        const growthCalculator = (current: number, previous: number) =>
          ((current - previous) / previous) * 100;

        const avgSalesValue = transactions[1].average_value_of_transactions;
        const avgSalesValueGrowth = growthCalculator(
          parseFloat(avgSalesValue),
          parseFloat(transactions[0].average_value_of_transactions)
        );
        const salesPerSqft = transactions[1].average_Price_per_sqft;
        const salesPerSqftGrowth = growthCalculator(
          parseFloat(salesPerSqft),
          parseFloat(transactions[0].average_Price_per_sqft)
        );
        const totalValue = transactions[1].Total_Value_of_Transaction;
        const totalValueGrowth = growthCalculator(
          parseFloat(totalValue),
          parseFloat(transactions[0].Total_Value_of_Transaction)
        );
        const noOfTransactions = transactions[1].number_of_Row_Used;
        const noOfTransactionsGrowth = growthCalculator(
          parseFloat(noOfTransactions),
          parseFloat(transactions[0].number_of_Row_Used)
        );

        return [
          {
            key: "avg_sales_value",
            title: "Average Sales Value",
            value: avgSalesValue.toFixed(2),
            growth: avgSalesValueGrowth.toFixed(2),
          },
          {
            key: "sales_per_sqft",
            title: "Sales Per Sqft",
            value: salesPerSqft.toFixed(2),
            growth: salesPerSqftGrowth.toFixed(2),
          },
          {
            key: "total_value",
            title: "Total Value",
            value: totalValue.toFixed(2),
            growth: totalValueGrowth.toFixed(2),
          },
          {
            key: "no_of_transactions",
            title: "No of Transactions",
            value: noOfTransactions,
            growth: noOfTransactionsGrowth.toFixed(2),
          },
        ];
      } catch (error) {
        console.error("Error calculating metrics:", error);
        return [
          {
            key: "avg_sales_value",
            title: "Average Sales Value",
            value: "N/A",
          },
          {
            key: "sales_per_sqft",
            title: "Sales Per Sqft",
            value: "N/A",
          },
          {
            key: "total_value",
            title: "Total Value",
            value: "N/A",
          },
          {
            key: "no_of_transactions",
            title: "No of Transactions",
            value: "N/A",
          },
        ];
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
            const data = response.data.data.data;
            console.log("data Transs", data);
            const totalSalesSum = data.reduce(
              (acc: number, curr: any) => acc + curr.types.group_en.total_sales,
              0
            );

            const totalMortageSum = data.reduce(
              (acc: number, curr: any) =>
                acc + curr.types.group_en.total_mortgage,
              0
            );

            const totalGiftSum = data.reduce(
              (acc: number, curr: any) => acc + curr.types.group_en.total_gift,
              0
            );

            const chartData = [
              { name: "Cash", value: totalSalesSum, fill: "#DDF8E4" },
              { name: "Mortgage", value: totalMortageSum, fill: "#EFEEFC" },
              { name: "Gifts", value: totalGiftSum, fill: "#FFDBDB" },
            ];

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
              data: [], // Calculated data will be here
            };
          }
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params) => {
          try {
            const date = new Date();
            const end_year = date.getFullYear();
            const start_year = end_year - 9;
            const response = await axios.get(
              `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends?start_year=${start_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            console.log("response barrr", response.data);
            const data = response.data.data.data;
            console.log("data Transs", data);

            const totalValue = data.map((item: any) => ({
              year: item.Year,
              value: item.Total_Value_of_Transaction.toFixed(2),
            }));

            const pricePerSqft = data.map((item: any) => ({
              year: item.Year,
              value: item.Total_price_per_sqft.toFixed(2),
            }));
            console.log("totalValue", totalValue);
            // Will do the required calculation here and return the data to build graph
            return {
              name: "Transactions Value Trend",
              description:
                "Compare transactional total value and value per sqft over time.",
              filters: [
                { key: "total_value", label: "Total Value", data: totalValue },
                {
                  key: "price_per_sqft",
                  label: "Value per SQFT",
                  data: pricePerSqft,
                },
              ],
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
              data: totalValue, // Calculated data will be here
            };
          } catch (error) {
            console.error(
              "Error calculating transactions value trend chart:",
              error
            );
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
              data: [], // Calculated data will be here
            };
          }
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params) => {
          try {
            const date = new Date();
            const end_year = date.getFullYear();
            const start_year = end_year - 9;
            const response = await axios.get(
              `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends?start_year=${start_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            const data = response.data.data.data;
            console.log("chddd", data);
            const yearlyData = data.map((item: any) => ({
              year: item.Year,
              value1: item.number_of_Row_Used,
            }));

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
            const currentYearData = data[data.length - 1];
            const monthlyData = currentYearData.month_data.map((item: any) => ({
              year: months[parseInt(item.Month) - 1],
              value1: item.number_of_Row_Used,
            }));

            let i = 11;
            while (monthlyData.length !== 12) {
              const prevYearData = data[data.length - 2];
              monthlyData.unshift({
                year: months[parseInt(prevYearData.month_data[i].Month) - 1],
                value1: prevYearData.month_data[i].number_of_Row_Used,
              });
              i--;
            }
            console.log(yearlyData, monthlyData);
            // Will do the required calculation here and return the data to build graph
            return {
              name: "Sales Transactions Trend",
              description: "Compare number of transactions over time!",
              filters: [
                { key: "monthly", label: "Monthly", data: monthlyData },
                {
                  key: "quarterly",
                  label: "Quarterly",
                  data: yearlyData,
                },
                { key: "yearly", label: "Yearly", data: yearlyData },
              ],
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
              data: monthlyData, // Calculated data will be here
            };
          } catch (error) {
            console.error(
              "Error calculating sales transactions trend chart:",
              error
            );
            return {
              name: "Sales Transactions Trend",
              description: "Compare number of transactions over time!",
              filters: [],
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
              data: [], // Calculated data will be here
            };
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
            let totalValue = 0;
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
              totalValue += item.value;
              return {
                Date: formattedDate, // Use the formatted date
                "Sell Price": item.value,
                "Area (ft)": item.price_per_sqft.toFixed(2),
              };
            });

            const avgValue = totalValue / data.length;

            return {
              name: "Similar Transactions",
              chart_type: "table",
              chartConfig: {},
              filters: [],
              sub_metrics: [],
              view_more: true,
              otherInfo: avgValue,
              columns: chartcolumns,
              data: chartData, // Calculated data will be here
            };
          } catch (error) {
            console.error(
              "Error calculating similar transactions chart:",
              error
            );
            return {
              name: "Similar Transactions",
              chart_type: "table",
              chartConfig: {},
              filters: [],
              sub_metrics: [],
              view_more: true,
              columns: [],
              data: [], // Calculated data will be here
            };
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
        calculate: async (params) => {
          try {
            const response = await axios.get(
              `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/types`,
              {
                params: params,
              }
            );
            // // Will do the required calculation here and return the data to build graph

            const data = response.data.data.data;
            console.log("data Transs", data);
            const chartData = [
              {
                name: "Commercial",
                value: data[0].total_commercial,
                colorClass: "bg-[#FFC8C8]",
              },
              {
                name: "Residential",
                value: data[1].total_residential,
                colorClass: "bg-[#EFEEFC]",
              },
            ];

            const saleType = [
              {
                name: "Free Hold",
                value:
                  data[0].types.free_hold_en.free_hold +
                  data[1].types.free_hold_en.free_hold,
                fill: "#DDF8E4",
              },
              {
                name: "Lease",
                value:
                  data[0].types.free_hold_en.lease +
                  data[1].types.free_hold_en.lease,
                fill: "#EFEEFC",
              },
            ];

            const firstSale = [
              {
                name: "Ready",
                value:
                  data[0].types.offplan_en.ready +
                  data[1].types.offplan_en.offplan,
                fill: "#DDF8E4",
              },
              {
                name: "Offplan",
                value:
                  data[0].types.offplan_en.ready +
                  data[1].types.offplan_en.offplan,
                fill: "#FFDBDB",
              },
            ];
            console.log(firstSale);
            const propertyType = [
              {
                name: "Land",
                value:
                  data[0].types.prop_type_en.land +
                  data[1].types.prop_type_en.land,
                fill: "#DDF8E4",
              },
              {
                name: "Unit",
                value:
                  data[0].types.prop_type_en.unit +
                  data[1].types.prop_type_en.unit,
                fill: "#EFEEFC",
              },
              {
                name: "Building",
                value:
                  data[0].types.prop_type_en.building +
                  data[1].types.prop_type_en.building,
                fill: "#FCF8D1",
              },
              {
                name: "Villa",
                value:
                  data[0].types.prop_type_en.villa +
                  data[1].types.prop_type_en.villa,
                fill: "#CBE5FB",
              },
            ];

            return {
              name: "Sales Segmentation",
              description:
                "Compare sales segmentation across residential and commercial.",
              chart_type: "donut",
              chartConfig: {
                Commercial: {
                  color: "#DDF8E4",
                },
                Residential: {
                  color: "#EFEEFC",
                },
              },
              filters: [],
              sub_charts: [
                {
                  key: "sale_type",
                  name: "Sales Type",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  data: saleType, // Calculated data will be here
                  insights:
                    "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
                },
                {
                  key: "property_status",
                  name: "Property Status",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  data: firstSale, // Calculated data will be here
                },
                {
                  key: "property_type",
                  name: "Property Type",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  data: propertyType, // Calculated data will be here
                },
              ],
              data: chartData, // Calculated data will be here
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

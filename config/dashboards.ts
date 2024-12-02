import axios, { all } from "axios";
import { Dashboard } from "./types";
import { SalesFilter } from "./filters";
import { CalculateMatrix } from "./utility";
import {
  SalesIndex,
  SalesPriceComparison,
  SalesSegmentation,
  SalesSimilarData,
  SalesTrend,
  SalesTypeChart,
  SalesValueTrend,
} from "./sales";
import { BASE_URL } from "./constant";

export const dashboards: Dashboard[] = [
  {
    key: "explore",
    name: "Explore",
    description:
      "Explore dubai from your own perspective, sales? rental? we have it all covered.",
    type: "standard",
    page_filters: [
      {
        key: "transaction_type",
        label: "Transaction Type",
        options: ["Sales", "Rental"],
      },
      {
        key: "usage",
        label: "Usage",
        options: ["Residential", "Commercial", "All"],
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
        key: "property_type",
        label: "Property Type",
        options: ["Ready", "Offplan"],
      },
      {
        key: "sales_type",
        label: "Sale Type",
        options: ["First Sale", "Resale"],
      },
      {
        key: "rental_type",
        label: "Rental Type",
        options: ["New", "Renew"],
      },
    ],
  },
  {
    key: "overall_market_transactions",
    name: "Overall Market Transactions",
    description:
      "Comprehensive overview of all sales, mortgages, and gift property transactions.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: null,
      mode: "sales",
    },

    page_filters: SalesFilter,

    calculate_matrics: async (params) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      const sourceURL = `${BASE_URL}/api/transaction/trends`;
      const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params) => {
          return await SalesTypeChart(params);
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params) => {
          return SalesValueTrend(params);
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params) => {
          return await SalesTrend(params);
        },
      },
      {
        key: "sales_index",
        calculate: async (params) => {
          return await SalesIndex(params);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params) => {
          return await SalesSimilarData(params);
        },
      },
      {
        key: "price_Comparison",
        calculate: async (params) => {
          return await SalesPriceComparison(params);
        },
      },
      {
        key: "sales_segmentation",
        calculate: async (params) => {
          return await SalesSegmentation(params);
        },
      },
    ],
  },
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
    page_filters: SalesFilter,

    calculate_matrics: async (params) => {
      console.log("params", params);
      const date = new Date();
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.group_en = "Sales";
      const sourceURL = `${BASE_URL}/api/transaction/trends`;
      const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params) => {
          params.group_en = "Sales";
          return await SalesTypeChart(params);
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params) => {
          params.group_en = "Sales";
          return SalesValueTrend(params);
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params) => {
          params.group_en = "Sales";
          return await SalesTrend(params);
        },
      },
      {
        key: "sales_index",
        calculate: async (params) => {
          params.group_en = "Sales";
          return await SalesIndex(params);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params) => {
          params.group_en = "Sales";
          return await SalesSimilarData(params);
        },
      },
      {
        key: "price_Comparison",
        calculate: async (params) => {
          params.group_en = "Sales";
          return await SalesPriceComparison(params);
        },
      },
      {
        key: "sales_segmentation",
        calculate: async (params) => {
          params.group_en = "Sales";
          return await SalesSegmentation(params);
        },
      },
    ],
  },
  {
    key: "mortgage_transactions_analysis",
    name: "Mortgage Transactions Analysis",
    description:
      "Insights into property purchases made using mortgage financing trends and details.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      group_en: "mortgage",
      mode: "sales",
    },

    page_filters: SalesFilter,

    calculate_matrics: async (params) => {
      console.log("params", params);
      const date = new Date();
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.group_en = "Mortgage";
      const sourceURL = `${BASE_URL}/api/transaction/trends`;
      const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params) => {
          params.group_en = "Mortgage";
          return await SalesTypeChart(params);
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params) => {
          params.group_en = "Mortgage";
          return SalesValueTrend(params);
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params) => {
          params.group_en = "Mortgage";
          return await SalesTrend(params);
        },
      },
      {
        key: "sales_index",
        calculate: async (params) => {
          params.group_en = "Mortgage";
          return await SalesIndex(params);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params) => {
          params.group_en = "Mortgage";
          return await SalesSimilarData(params);
        },
      },
      {
        key: "price_Comparison",
        calculate: async (params) => {
          params.group_en = "Mortgage";
          return await SalesPriceComparison(params);
        },
      },
      {
        key: "sales_segmentation",
        calculate: async (params) => {
          params.group_en = "Mortgage";
          return await SalesSegmentation(params);
        },
      },
    ],
  },
  {
    key: "gift_transactions_insights",
    name: "Gift Transactions Insights",
    description:
      "Track and analyze property transactions gifted, highlighting market behavior and trends.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      group_en: "gifts",
      mode: "sales",
    },
    page_filters: SalesFilter,

    calculate_matrics: async (params) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.group_en = "Gifts";
      const sourceURL = `${BASE_URL}/api/transaction/trends`;
      const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params) => {
          params.group_en = "Gifts";
          return await SalesTypeChart(params);
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params) => {
          params.group_en = "Gifts";
          return SalesValueTrend(params);
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params) => {
          params.group_en = "Gifts";
          return await SalesTrend(params);
        },
      },
      {
        key: "sales_index",
        calculate: async (params) => {
          params.group_en = "Gifts";
          return await SalesIndex(params);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params) => {
          params.group_en = "Gifts";
          return await SalesSimilarData(params);
        },
      },
      {
        key: "price_Comparison",
        calculate: async (params) => {
          params.group_en = "Gifts";
          return await SalesPriceComparison(params);
        },
      },
      {
        key: "sales_segmentation",
        calculate: async (params) => {
          params.group_en = "Gifts";
          return await SalesSegmentation(params);
        },
      },
    ],
  },

  {
    key: "residential_sales_breakdown",
    name: "Residential Sales Breakdown",
    description:
      " Analysis of residential property sales, including pricing, volumes, and market activity.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: "residential",
      mode: "sales",
    },
    page_filters: SalesFilter,

    calculate_matrics: async (params) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.usage_en = "Residential";
      const sourceURL = `${BASE_URL}/api/transaction/trends`;
      const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params) => {
          params.usage_en = "Residential";
          return await SalesTypeChart(params);
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params) => {
          params.usage_en = "Residential";
          return SalesValueTrend(params);
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params) => {
          params.usage_en = "Residential";
          return await SalesTrend(params);
        },
      },
      {
        key: "sales_index",
        calculate: async (params) => {
          params.usage_en = "Residential";
          return await SalesIndex(params);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params) => {
          params.usage_en = "Residential";
          return await SalesSimilarData(params);
        },
      },
      {
        key: "price_Comparison",
        calculate: async (params) => {
          params.usage_en = "Residential";
          return await SalesPriceComparison(params);
        },
      },
      {
        key: "sales_segmentation",
        calculate: async (params) => {
          params.usage_en = "Residential";
          const data = await SalesSegmentation(params);
          data.sub_charts = [];
          return data;
        },
      },
    ],
  },
  {
    key: "commercial_sales_breakdown",
    name: "Commercial Sales Breakdown",
    description:
      " Track and analyze sales in the commercial property sector including offices and shops.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: "commercial",
      mode: "sales",
    },
    page_filters: SalesFilter,

    calculate_matrics: async (params) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.usage_en = "Commercial";
      const sourceURL = `${BASE_URL}/api/transaction/trends`;
      const matrixOutput = await CalculateMatrix(sourceURL, "sales", params);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          return await SalesTypeChart(params);
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          return SalesValueTrend(params);
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          return await SalesTrend(params);
        },
      },
      {
        key: "sales_index",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          return await SalesIndex(params);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          return await SalesSimilarData(params);
        },
      },
      {
        key: "price_Comparison",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          return await SalesPriceComparison(params);
        },
      },
      {
        key: "sales_segmentation",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          const data = await SalesSegmentation(params);
          data.sub_charts = [];
          return data;
        },
      },
    ],
  },

  {
    key: "rental_market_trends",
    name: "Rental Market Trends",
    description:
      "Overview of rental transactions and trends, showing market performance across Dubai.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: null,
      mode: "rental",
    },
    page_filters: [
      {
        key: "bedroom",
        label: "Bedroom",
        options: ["1", "2", "3", "4", "5", "6"],
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=rooms",
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
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
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
          `${BASE_URL}/api/rental/average?start_year=2023&end_year=2024`,
          {
            params: params,
          }
        );

        const rents = response.data.data.data;

        if (rents.length === 0) {
          throw new Error("No transactions found for the specified filters.");
        }

        const growthCalculator = (current: number, previous: number) =>
          ((current - previous) / previous) * 100;

        const avgRentNew = rents[1].avg_rent_new_yearly;
        const avgRentNewGrowth = growthCalculator(
          parseFloat(avgRentNew),
          parseFloat(rents[0].avg_rent_new_yearly)
        );
        const avgRentRenewal = rents[1].avg_rent_renewal_yearly;
        const avgRentRenewalGrowth = growthCalculator(
          parseFloat(avgRentRenewal),
          parseFloat(rents[0].avg_rent_renewal_yearly)
        );
        const totalTransaction = rents[1].total_transaction_yearly;
        const totalTransactionGrowth = growthCalculator(
          parseFloat(totalTransaction),
          parseFloat(rents[0].total_transaction_yearly)
        );
        const renewalRatio = rents[1].renewal_ratio_yearly;
        const renewalRatioGrowth = growthCalculator(
          parseFloat(renewalRatio),
          parseFloat(rents[0].renewal_ratio_yearly)
        );
        console.log(avgRentNewGrowth, avgRentRenewalGrowth);
        return [
          {
            key: "avg_rent_new",
            title: "Average Rent (New)",
            value: avgRentNew.toFixed(2),
            growth: avgRentNewGrowth.toFixed(2),
          },
          {
            key: "sales_per_sqft",
            title: "Average Rent (Renewal)",
            value: avgRentRenewal.toFixed(2),
            growth: avgRentRenewalGrowth.toFixed(2),
          },
          {
            key: "total_transactions",
            title: "Total Transactions",
            value: totalTransaction,
            growth: totalTransactionGrowth.toFixed(2),
          },
          {
            key: "renewal_ratio",
            title: "Renewal Ratio",
            value: String((renewalRatio * 100).toFixed(2)) + "%",
            growth: renewalRatioGrowth.toFixed(2),
          },
        ];
      } catch (error) {
        console.error("Error calculating metrics:", error);
        return [
          {
            key: "avg_rent_new",
            title: "Average Rent (New)",
            value: "N/A",
          },
          {
            key: "sales_per_sqft",
            title: "Average Rent Renewal",
            value: "N/A",
          },
          {
            key: "total_transactions",
            title: "Total Transactions",
            value: "N/A",
          },
          {
            key: "renewal_ratio",
            title: "Renewal Ratio",
            value: "N/A",
          },
        ];
      }
    },
    calculate_charts: [
      {
        key: "rental_transactions_value_trend",
        calculate: async (params) => {
          try {
            // Will do the required calculation here and return the data to build graph
            params = {};
            const date = new Date();
            const end_year = date.getFullYear();
            const start_year = end_year - 9;
            console.log("params", params);
            const response = await axios.get(
              `${BASE_URL}/api/rental/average?start_year${start_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            console.log("response barrr", response.data);
            const data = response.data.data.data;
            console.log("data Transs", data);

            const avgRents = data.map((item: any) => ({
              year: item.Year,
              value: item.avg_rent_yearly.toFixed(2),
            }));

            const avgRentNew = data.map((item: any) => ({
              year: item.Year,
              value: item.avg_rent_new_yearly.toFixed(2),
            }));

            const avgRentRenew = data.map((item: any) => ({
              year: item.Year,
              value: item.avg_rent_renewal_yearly.toFixed(2),
            }));
            console.log("totalValue", avgRents);
            // Will do the required calculation here and return the data to build graph
            return {
              name: "Rental Transactions Value Trend",
              description:
                "Compare transactional total value and value per sqft over time.",
              filters: [
                { key: "all", label: "All", data: avgRents },
                {
                  key: "new",
                  label: "New",
                  data: avgRentNew,
                },
                {
                  key: "renew",
                  label: "Renew",
                  data: avgRentRenew,
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
              data: avgRents, // Calculated data will be here
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
        key: "rental_transactions_trend",
        calculate: async (params) => {
          try {
            params = {};
            const date = new Date();
            const currentMonth = date.getMonth();
            const end_year = date.getFullYear();
            const start_year = end_year - 1;
            const response = await axios.get(
              `${BASE_URL}/api/rental/average?start_year=${start_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            const data = response.data.data.data;
            console.log("chddd", data);

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
            const currentYearData = data[data.length - 1].month_data;
            const previousYearData = data[data.length - 2].month_data;
            console.log("currentYearData", currentYearData);
            const allData = [];
            const newData = [];
            const renewData = [];
            for (let i = 0; i < 12; i++) {
              if (i < 12 - currentMonth) {
                allData.push({
                  year: `${months[currentMonth + i]}_${end_year - 1}`,
                  value1: previousYearData[currentMonth + i].Total_Transactions,
                });
                newData.push({
                  year: `${months[currentMonth + i]}_${end_year - 1}`,
                  value1:
                    previousYearData[currentMonth + i].Total_Transactions_New,
                });
                renewData.push({
                  year: `${months[currentMonth + i]}_${end_year - 1}`,
                  value1:
                    previousYearData[currentMonth + i]
                      .Total_Transactions_Renewal,
                });
              } else {
                allData.push({
                  year: months[i - (12 - currentMonth)],
                  value1:
                    currentYearData[i - (12 - currentMonth)].Total_Transactions,
                });
                newData.push({
                  year: months[i - (12 - currentMonth)],
                  value1:
                    currentYearData[i - (12 - currentMonth)]
                      .Total_Transactions_New,
                });
                renewData.push({
                  year: months[i - (12 - currentMonth)],
                  value1:
                    currentYearData[i - (12 - currentMonth)]
                      .Total_Transactions_Renewal,
                });
              }
            }

            console.log("allData", allData);

            // Will do the required calculation here and return the data to build graph
            return {
              name: "Rental Transactions Trend",
              description: "Compare number of transactions over time!",
              filters: [
                { key: "All", label: "All", data: allData },
                { key: "new", label: "New", data: newData },
                { key: "renew", label: "Renew", data: renewData },
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
              data: allData, // Calculated data will be here
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
        key: "rental_index",
        calculate: async (params) => {
          params = {};
          try {
            const response = await axios.get(`${BASE_URL}/api/rental/index`, {
              params: params,
            });
            const date = new Date();
            const end_year = date.getFullYear();
            const responseRange = await axios.get(
              `${BASE_URL}/api/rental/rentIndex?start_year=${end_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );

            // Will do the required calculation here and return the data to build graph
            const data = response.data.data.quartiles;
            console.log("percentile25", data);
            const percentile25 = data[0].max;
            const percentile75 = data[3].min;

            const rangeData = responseRange.data.data.data[0];
            console.log("rangeData", rangeData);
            const chartData = [
              {
                name: "<25K",
                value: rangeData.total_rents_under_25k,
                colorClass: "bg-[#FFDBDB]",
              },
              {
                name: "25K to 50k",
                value: rangeData.total_rents_25k_to_50k,
                colorClass: "bg-[#EFEEFC]",
              },
              {
                name: "50k to 100k",
                value: rangeData.total_rents_50k_to_100k,
                colorClass: "bg-[#DDF8E4]",
              },
              {
                name: "100k to 200k",
                value: rangeData.total_rents_100k_to_200k,
                colorClass: "bg-[#FCF8D1]",
              },
              {
                name: "200k to 400k",
                value: rangeData.total_rents_200k_to_400k,
                colorClass: "bg-[#FFC8C8]",
              },
              {
                name: ">400k",
                value: rangeData.total_sales_over_400k,
                colorClass: "bg-[#FFC8C8]",
              },
            ];

            return {
              name: "Rental Index",
              description: "This is overall Rental value index in Dubai.",
              chart_type: "percentile_bar",
              filters: [],
              chartConfig: {},
              sub_charts: [
                {
                  key: "price_range",
                  name: "Price Range",
                  chart_type: "donut",
                  chartConfig: {
                    "<25K": { color: "#FFDBDB" },
                    "25K to 50k": { color: "#EFEEFC" },
                    "50k to 100k": { color: "#DDF8E4" },
                    "100k to 200k": { color: "#FCF8D1" },
                    "200k to 400k": { color: "#FFC8C8" },
                    ">400k": { color: "#FFC8C8" },
                  },
                  data: chartData, // Calculated data will be here
                },
              ],
              insights:
                "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
              data: [percentile25, percentile75], // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating sales index chart:", error);
            return {
              name: "Rental Index",
              description: "This is overall Rental value index in Dubai.",
              chart_type: "percentile_bar",
              filters: [],
              chartConfig: {},
              sub_charts: [
                {
                  key: "price_range",
                  name: "Price Range",
                  chart_type: "donut",
                  chartConfig: {
                    "<500K": { color: "#FFDBDB" },
                    "500K to 1M": { color: "#EFEEFC" },
                    "1M to 2M": { color: "#DDF8E4" },
                    "2M to 3M": { color: "#FCF8D1" },
                    "3M to 4M": { color: "#FFC8C8" },
                    "4M to 5M": { color: "#FFC8C8" },
                    "5M to 10M": { color: "#FFC8C8" },
                    ">10M": { color: "#FFC8C8" },
                  },
                  data: [], // Calculated data will be here
                },
              ],
              insights:
                "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
              data: [], // Calculated data will be here
            };
          }
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params) => {
          try {
            const response = await axios.get(`${BASE_URL}/api/rental/last`, {
              params: params,
            });

            // Will do the required calculation here and return the data to build graph
            const data = response.data.data.data;
            const chartcolumns = ["Date", "Rent Price", "Sub Property"];
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

              const date = new Date(item.registration_date.value);
              const formattedDate = `${date.getDate()}/${
                months[date.getMonth()]
              }/${date.getFullYear()}`;
              return {
                Date: formattedDate, // Use the formatted date
                "Rent Price": item.annual_amount,
                "Sub Property": item.property_subtype,
              };
            });

            const avgValueNew = data[0].avg_value_new.toFixed(2);
            const avgValueRenewal = data[0].avg_value_renewed.toFixed(2);

            return {
              name: "Similar Transactions",
              chart_type: "table",
              chartConfig: {},
              filters: [],
              sub_metrics: [],
              view_more: true,
              otherInfo: [
                { name: "Average Rent (New)", value: avgValueNew },
                { name: "Average Rent (Renewal)", value: avgValueRenewal },
              ],
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
        key: "rent_Comparison",
        calculate: async (params) => {
          try {
            const date = new Date();
            const end_year = date.getFullYear();
            const start_year = end_year - 1;
            const response = await axios.get(
              `${BASE_URL}/api/rental/comp?start_year=${end_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            // Will do the required calculation here and return the data to build graph

            const data = response.data.data.data;
            console.log("compare data", data);
            const chartData = data.map((item: any) => ({
              name: item.AREA_EN,
              avgPrice: item.avg_rent_value.toFixed(2),
              pricePerSqFt: String(item.renewal_ratio.toFixed(2) * 100) + "%",
              transactions: item.num_rents.toFixed(2),
            }));

            return {
              name: "Rent Comparison",
              chart_type: "comparison_table",
              filters: [],
              chartConfig: {},
              sub_metrics: [],
              view_more: true,
              data: chartData, // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating price comparison chart:", error);
            return {
              name: "Rent Comparison",
              chart_type: "comparison_table",
              filters: [],
              chartConfig: {},
              sub_metrics: [],
              view_more: true,
              data: [], // Calculated data will be here
            };
          }
        },
      },
      {
        key: "rental_segmentation",
        calculate: async (params) => {
          try {
            const date = new Date();
            const end_year = date.getFullYear();
            params = {};
            const response = await axios.get(
              `${BASE_URL}/api/rental/segment?start_year=${end_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            // // Will do the required calculation here and return the data to build graph

            const data = response.data.data.data;
            console.log("data Transs", response);
            const commercialTotalData = data.filter(
              (item: any) => item.USAGE_EN === "Commercial"
            );
            const residentialTotalData = data.filter(
              (item: any) => item.USAGE_EN === "Residential"
            );
            console.log("commercialTotalData", commercialTotalData);
            const chartData = [
              {
                name: "Commercial",
                value: commercialTotalData[0].total_commercial,
                colorClass: "bg-[#FFC8C8]",
              },
              {
                name: "Residential",
                value: residentialTotalData[0].total_residential,
                colorClass: "bg-[#EFEEFC]",
              },
            ];
            console.log("chartData", chartData);

            const colors: Record<string, string> = {
              free_hold: "#DDF8E4",
              lease: "#EFEEFC",
              ready: "#DDF8E4",
              offplan: "#FFDBDB",
              land: "#E5F2FF",
              unit: "#FFE2E2",
              building: "#FFF3E0",
              villa: "#E2FFEB",
              count_1_B_R: "#E2FFEB",
              count_2_B_R: "#FFE2E2",
              count_3_B_R: "#FFF3E0",
              count_4_B_R: "#E5F2FF",
              count_5_B_R: "#FFDBDB",
              count_6_B_R: "#DDF8E4",
              count_7_B_R: "#EFEEFC",
              count_8_B_R: "#CBE5FB",
              count_9_B_R: "#FCF8D1",
              count_studio: "#FFC8C8",
              count_single_room: "#FFC8C8",
              count_penthouse: "#FFC8C8",
            };

            const categories: {
              [key: string]: { key: string; name: string; color: string }[];
            } = {
              free_hold_en: [
                { key: "free_hold", name: "Freehold", color: colors.free_hold },
                { key: "lease", name: "Lease", color: colors.lease },
              ],
              version_en: [
                { key: "new_version", name: "New", color: colors.ready },
                {
                  key: "renew_version",
                  name: "Renew",
                  color: colors.offplan,
                },
              ],
              total_properties: [
                {
                  key: "Individual",
                  name: "Individual",
                  color: colors.count_1_B_R,
                },
                { key: "Bulk", name: "Bulk", color: colors.count_4_B_R },
              ],
              prop_type_en: [
                { key: "land", name: "Land", color: colors.land },
                { key: "unit", name: "Unit", color: colors.unit },
                { key: "building", name: "Building", color: colors.building },
                { key: "villa", name: "Villa", color: colors.villa },
              ],
            };

            const calculateCategoryData = (
              sourceData: any[],
              categoryKey: string
            ) => {
              return categories[categoryKey].map(({ key, name, color }) => {
                const value = sourceData.reduce((sum: number, item: any) => {
                  const commercialValue =
                    item.total_commercial > 0
                      ? item.types[categoryKey]?.[key] || 0
                      : 0;
                  const residentialValue =
                    item.total_residential > 0
                      ? item.types[categoryKey]?.[key] || 0
                      : 0;
                  return sum + commercialValue + residentialValue;
                }, 0);
                return { name, value, fill: color };
              });
            };

            const allData: any = {};
            const residentialData: any = {};
            const commercialData: any = {};

            Object.keys(categories).forEach((categoryKey) => {
              allData[categoryKey] = calculateCategoryData(data, categoryKey);
              residentialData[categoryKey] = calculateCategoryData(
                residentialTotalData,
                categoryKey
              );
              commercialData[categoryKey] = calculateCategoryData(
                commercialTotalData,
                categoryKey
              );
            });
            console.log("allData", residentialData);

            return {
              name: "Rental Segmentation",
              description:
                "Compare rental segmentation across residential and commercial.",
              chart_type: "donut",
              chartConfig: {
                Commercial: {
                  color: "#DDF8E4",
                },
                Residential: {
                  color: "#EFEEFC",
                },
              },
              sub_charts: [
                {
                  key: "sale_type",
                  name: "Sales Type",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  filters: [
                    { key: "all", label: "All", data: allData.free_hold_en },
                    {
                      key: "residential",
                      label: "Residential",
                      data: residentialData.free_hold_en,
                    },
                    {
                      key: "commercial",
                      label: "Commercial",
                      data: commercialData.free_hold_en,
                    },
                  ],
                  data: allData?.free_hold_en, // Calculated data will be here
                  insights:
                    "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
                },
                {
                  key: "property_status",
                  name: "Property Status",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  filters: [
                    { key: "all", label: "All", data: allData.version_en },
                    {
                      key: "residential",
                      label: "Residential",
                      data: residentialData.version_en,
                    },
                    {
                      key: "commercial",
                      label: "Commercial",
                      data: commercialData.version_en,
                    },
                  ],
                  data: allData?.version_en, // Calculated data will be here
                },
                {
                  key: "property_type",
                  name: "Property Type",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  filters: [
                    { key: "all", label: "All", data: allData.prop_type_en },
                    {
                      key: "residential",
                      label: "Residential",
                      data: residentialData.prop_type_en,
                    },
                    {
                      key: "commercial",
                      label: "Commercial",
                      data: commercialData.prop_type_en,
                    },
                  ],
                  data: allData?.prop_type_en, // Calculated data will be here
                },
                {
                  key: "total_properties",
                  name: "Total Propertries",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  filters: [
                    {
                      key: "all",
                      label: "All",
                      data: allData.total_properties,
                    },
                    {
                      key: "residential",
                      label: "Residential",
                      data: residentialData.total_properties,
                    },
                    {
                      key: "commercial",
                      label: "Commercial",
                      data: commercialData.total_properties,
                    },
                  ],
                  data: allData.total_properties, // Calculated data will be here
                },
              ],
              data: chartData, // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating sales segmentation chart:", error);
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
              sub_charts: [],
              data: [], // Calculated data will be here
            };
          }
        },
      },
    ],
  },
  {
    key: "residential_rentals_analysis",
    name: "Residential Rentals Analysis",
    description:
      "Analysis of residential property sales, including pricing, volumes, and market activity.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: "residential",
      mode: "rental",
    },
    page_filters: [
      {
        key: "bedroom",
        label: "Bedroom",
        options: ["1", "2", "3", "4", "5", "6"],
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=rooms",
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
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
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
          `${BASE_URL}/api/rental/average?usage_en=Residential&start_year=2023&end_year=2024`,
          {
            params: params,
          }
        );

        const rents = response.data.data.data;

        if (rents.length === 0) {
          throw new Error("No transactions found for the specified filters.");
        }

        const growthCalculator = (current: number, previous: number) =>
          ((current - previous) / previous) * 100;

        const avgRentNew = rents[1].avg_rent_new_yearly;
        const avgRentNewGrowth = growthCalculator(
          parseFloat(avgRentNew),
          parseFloat(rents[0].avg_rent_new_yearly)
        );
        const avgRentRenewal = rents[1].avg_rent_renewal_yearly;
        const avgRentRenewalGrowth = growthCalculator(
          parseFloat(avgRentRenewal),
          parseFloat(rents[0].avg_rent_renewal_yearly)
        );
        const totalTransaction = rents[1].total_transaction_yearly;
        const totalTransactionGrowth = growthCalculator(
          parseFloat(totalTransaction),
          parseFloat(rents[0].total_transaction_yearly)
        );
        const renewalRatio = rents[1].renewal_ratio_yearly;
        const renewalRatioGrowth = growthCalculator(
          parseFloat(renewalRatio),
          parseFloat(rents[0].renewal_ratio_yearly)
        );

        return [
          {
            key: "avg_rent_new",
            title: "Average Rent (New)",
            value: avgRentNew.toFixed(2),
            growth: avgRentNewGrowth.toFixed(2),
          },
          {
            key: "sales_per_sqft",
            title: "Average Rent (Renewal)",
            value: avgRentRenewal.toFixed(2),
            growth: avgRentRenewalGrowth.toFixed(2),
          },
          {
            key: "total_transactions",
            title: "Total Transactions",
            value: totalTransaction,
            growth: totalTransactionGrowth.toFixed(2),
          },
          {
            key: "renewal_ratio",
            title: "Renewal Ratio",
            value: String((renewalRatio * 100).toFixed(2)) + "%",
            growth: renewalRatioGrowth.toFixed(2),
          },
        ];
      } catch (error) {
        console.error("Error calculating metrics:", error);
        return [
          {
            key: "avg_rent_new",
            title: "Average Rent (New)",
            value: "N/A",
          },
          {
            key: "sales_per_sqft",
            title: "Average Rent Renewal",
            value: "N/A",
          },
          {
            key: "total_transactions",
            title: "Total Transactions",
            value: "N/A",
          },
          {
            key: "renewal_ratio",
            title: "Renewal Ratio",
            value: "N/A",
          },
        ];
      }
    },
    calculate_charts: [
      {
        key: "rental_transactions_value_trend",
        calculate: async (params) => {
          try {
            // Will do the required calculation here and return the data to build graph
            params = {};
            const date = new Date();
            const end_year = date.getFullYear();
            const start_year = end_year - 9;
            console.log("params", params);
            const response = await axios.get(
              `${BASE_URL}/api/rental/average?usage_en=Residential&start_year${start_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            console.log("response barrr", response.data);
            const data = response.data.data.data;
            console.log("data Transs", data);

            const avgRents = data.map((item: any) => ({
              year: item.Year,
              value: item.avg_rent_yearly.toFixed(2),
            }));

            const avgRentNew = data.map((item: any) => ({
              year: item.Year,
              value: item.avg_rent_new_yearly.toFixed(2),
            }));

            const avgRentRenew = data.map((item: any) => ({
              year: item.Year,
              value: item.avg_rent_renewal_yearly.toFixed(2),
            }));
            console.log("totalValue", avgRents);
            // Will do the required calculation here and return the data to build graph
            return {
              name: "Rental Transactions Value Trend",
              description:
                "Compare transactional total value and value per sqft over time.",
              filters: [
                { key: "all", label: "All", data: avgRents },
                {
                  key: "new",
                  label: "New",
                  data: avgRentNew,
                },
                {
                  key: "renew",
                  label: "Renew",
                  data: avgRentRenew,
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
              data: avgRents, // Calculated data will be here
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
        key: "rental_transactions_trend",
        calculate: async (params) => {
          try {
            params = {};
            const date = new Date();
            const currentMonth = date.getMonth();
            const end_year = date.getFullYear();
            const start_year = end_year - 1;
            const response = await axios.get(
              `${BASE_URL}/api/rental/average?usage_en=Residential&start_year=${start_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            const data = response.data.data.data;
            console.log("chddd", data);

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
            const currentYearData = data[data.length - 1].month_data;
            const previousYearData = data[data.length - 2].month_data;
            console.log("currentYearData", currentYearData);
            const allData = [];
            const newData = [];
            const renewData = [];
            for (let i = 0; i < 12; i++) {
              if (i < 12 - currentMonth) {
                allData.push({
                  year: `${months[currentMonth + i]}_${end_year - 1}`,
                  value1: previousYearData[currentMonth + i].Total_Transactions,
                });
                newData.push({
                  year: `${months[currentMonth + i]}_${end_year - 1}`,
                  value1:
                    previousYearData[currentMonth + i].Total_Transactions_New,
                });
                renewData.push({
                  year: `${months[currentMonth + i]}_${end_year - 1}`,
                  value1:
                    previousYearData[currentMonth + i]
                      .Total_Transactions_Renewal,
                });
              } else {
                allData.push({
                  year: months[i - (12 - currentMonth)],
                  value1:
                    currentYearData[i - (12 - currentMonth)].Total_Transactions,
                });
                newData.push({
                  year: months[i - (12 - currentMonth)],
                  value1:
                    currentYearData[i - (12 - currentMonth)]
                      .Total_Transactions_New,
                });
                renewData.push({
                  year: months[i - (12 - currentMonth)],
                  value1:
                    currentYearData[i - (12 - currentMonth)]
                      .Total_Transactions_Renewal,
                });
              }
            }

            console.log("allData", allData);

            // Will do the required calculation here and return the data to build graph
            return {
              name: "Rental Transactions Trend",
              description: "Compare number of transactions over time!",
              filters: [
                { key: "All", label: "All", data: allData },
                { key: "new", label: "New", data: newData },
                { key: "renew", label: "Renew", data: renewData },
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
              data: allData, // Calculated data will be here
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
        key: "rental_index",
        calculate: async (params) => {
          params = {};
          try {
            const response = await axios.get(
              `${BASE_URL}/api/rental/index?usage_en=Residential`,
              {
                params: params,
              }
            );
            const date = new Date();
            const end_year = date.getFullYear();
            const responseRange = await axios.get(
              `${BASE_URL}/api/rental/rentIndex?usage_en=Residential&start_year=${end_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );

            // Will do the required calculation here and return the data to build graph
            const data = response.data.data.quartiles;
            console.log("percentile25", data);
            const percentile25 = data[0].max;
            const percentile75 = data[3].min;

            const rangeData = responseRange.data.data.data[0];
            console.log("rangeData", rangeData);
            const chartData = [
              {
                name: "<25K",
                value: rangeData.total_rents_under_25k,
                colorClass: "bg-[#FFDBDB]",
              },
              {
                name: "25K to 50k",
                value: rangeData.total_rents_25k_to_50k,
                colorClass: "bg-[#EFEEFC]",
              },
              {
                name: "50k to 100k",
                value: rangeData.total_rents_50k_to_100k,
                colorClass: "bg-[#DDF8E4]",
              },
              {
                name: "100k to 200k",
                value: rangeData.total_rents_100k_to_200k,
                colorClass: "bg-[#FCF8D1]",
              },
              {
                name: "200k to 400k",
                value: rangeData.total_rents_200k_to_400k,
                colorClass: "bg-[#FFC8C8]",
              },
              {
                name: ">400k",
                value: rangeData.total_sales_over_400k,
                colorClass: "bg-[#FFC8C8]",
              },
            ];

            return {
              name: "Rental Index",
              description: "This is overall Rental value index in Dubai.",
              chart_type: "percentile_bar",
              filters: [],
              chartConfig: {},
              sub_charts: [
                {
                  key: "price_range",
                  name: "Price Range",
                  chart_type: "donut",
                  chartConfig: {
                    "<25K": { color: "#FFDBDB" },
                    "25K to 50k": { color: "#EFEEFC" },
                    "50k to 100k": { color: "#DDF8E4" },
                    "100k to 200k": { color: "#FCF8D1" },
                    "200k to 400k": { color: "#FFC8C8" },
                    ">400k": { color: "#FFC8C8" },
                  },
                  data: chartData, // Calculated data will be here
                },
              ],
              insights:
                "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
              data: [percentile25, percentile75], // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating sales index chart:", error);
            return {
              name: "Rental Index",
              description: "This is overall Rental value index in Dubai.",
              chart_type: "percentile_bar",
              filters: [],
              chartConfig: {},
              sub_charts: [
                {
                  key: "price_range",
                  name: "Price Range",
                  chart_type: "donut",
                  chartConfig: {
                    "<500K": { color: "#FFDBDB" },
                    "500K to 1M": { color: "#EFEEFC" },
                    "1M to 2M": { color: "#DDF8E4" },
                    "2M to 3M": { color: "#FCF8D1" },
                    "3M to 4M": { color: "#FFC8C8" },
                    "4M to 5M": { color: "#FFC8C8" },
                    "5M to 10M": { color: "#FFC8C8" },
                    ">10M": { color: "#FFC8C8" },
                  },
                  data: [], // Calculated data will be here
                },
              ],
              insights:
                "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
              data: [], // Calculated data will be here
            };
          }
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params) => {
          try {
            const response = await axios.get(
              `${BASE_URL}/api/rental/last?usage_en=Residential`,
              { params: params }
            );

            // Will do the required calculation here and return the data to build graph
            const data = response.data.data.data;
            const chartcolumns = ["Date", "Rent Price", "Sub Property"];
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

              const date = new Date(item.registration_date.value);
              const formattedDate = `${date.getDate()}/${
                months[date.getMonth()]
              }/${date.getFullYear()}`;
              return {
                Date: formattedDate, // Use the formatted date
                "Rent Price": item.annual_amount,
                "Sub Property": item.property_subtype,
              };
            });

            const avgValueNew = data[0].avg_value_new.toFixed(2);
            const avgValueRenewal = data[0].avg_value_renewed.toFixed(2);

            return {
              name: "Similar Transactions",
              chart_type: "table",
              chartConfig: {},
              filters: [],
              sub_metrics: [],
              view_more: true,
              otherInfo: [
                { name: "Average Rent (New)", value: avgValueNew },
                { name: "Average Rent (Renewal)", value: avgValueRenewal },
              ],
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
        key: "rent_Comparison",
        calculate: async (params) => {
          try {
            const date = new Date();
            const end_year = date.getFullYear();
            const start_year = end_year - 1;
            const response = await axios.get(
              `${BASE_URL}/api/rental/comp?usage_en=Residential&start_year=${end_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            // Will do the required calculation here and return the data to build graph

            const data = response.data.data.data;
            console.log("compare data", data);
            const chartData = data.map((item: any) => ({
              name: item.AREA_EN,
              avgPrice: item.avg_rent_value.toFixed(2),
              pricePerSqFt: String(item.renewal_ratio.toFixed(2) * 100) + "%",
              transactions: item.num_rents.toFixed(2),
            }));

            return {
              name: "Rent Comparison",
              chart_type: "comparison_table",
              filters: [],
              chartConfig: {},
              sub_metrics: [],
              view_more: true,
              data: chartData, // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating price comparison chart:", error);
            return {
              name: "Rent Comparison",
              chart_type: "comparison_table",
              filters: [],
              chartConfig: {},
              sub_metrics: [],
              view_more: true,
              data: [], // Calculated data will be here
            };
          }
        },
      },
      {
        key: "rental_segmentation",
        calculate: async (params) => {
          try {
            const date = new Date();
            const end_year = date.getFullYear();
            params = {};
            const response = await axios.get(
              `${BASE_URL}/api/rental/segment?usage_en=Residential&start_year=${end_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            // // Will do the required calculation here and return the data to build graph

            const data = response.data.data.data;
            console.log("data Transs", response);
            const commercialTotalData = data.filter(
              (item: any) => item.USAGE_EN === "Commercial"
            );
            const residentialTotalData = data.filter(
              (item: any) => item.USAGE_EN === "Residential"
            );
            console.log("commercialTotalData", commercialTotalData);
            const chartData = [
              {
                name: "Commercial",
                value: commercialTotalData[0].total_commercial,
                colorClass: "bg-[#FFC8C8]",
              },
              {
                name: "Residential",
                value: residentialTotalData[0].total_residential,
                colorClass: "bg-[#EFEEFC]",
              },
            ];
            console.log("chartData", chartData);

            const colors: Record<string, string> = {
              free_hold: "#DDF8E4",
              lease: "#EFEEFC",
              ready: "#DDF8E4",
              offplan: "#FFDBDB",
              land: "#E5F2FF",
              unit: "#FFE2E2",
              building: "#FFF3E0",
              villa: "#E2FFEB",
              count_1_B_R: "#E2FFEB",
              count_2_B_R: "#FFE2E2",
              count_3_B_R: "#FFF3E0",
              count_4_B_R: "#E5F2FF",
              count_5_B_R: "#FFDBDB",
              count_6_B_R: "#DDF8E4",
              count_7_B_R: "#EFEEFC",
              count_8_B_R: "#CBE5FB",
              count_9_B_R: "#FCF8D1",
              count_studio: "#FFC8C8",
              count_single_room: "#FFC8C8",
              count_penthouse: "#FFC8C8",
            };

            const categories: {
              [key: string]: { key: string; name: string; color: string }[];
            } = {
              free_hold_en: [
                { key: "free_hold", name: "Freehold", color: colors.free_hold },
                { key: "lease", name: "Lease", color: colors.lease },
              ],
              version_en: [
                { key: "new_version", name: "New", color: colors.ready },
                {
                  key: "renew_version",
                  name: "Renew",
                  color: colors.offplan,
                },
              ],
              total_properties: [
                {
                  key: "Individual",
                  name: "Individual",
                  color: colors.count_1_B_R,
                },
                { key: "Bulk", name: "Bulk", color: colors.count_4_B_R },
              ],
              prop_type_en: [
                { key: "land", name: "Land", color: colors.land },
                { key: "unit", name: "Unit", color: colors.unit },
                { key: "building", name: "Building", color: colors.building },
                { key: "villa", name: "Villa", color: colors.villa },
              ],
            };

            const calculateCategoryData = (
              sourceData: any[],
              categoryKey: string
            ) => {
              return categories[categoryKey].map(({ key, name, color }) => {
                const value = sourceData.reduce((sum: number, item: any) => {
                  const commercialValue =
                    item.total_commercial > 0
                      ? item.types[categoryKey]?.[key] || 0
                      : 0;
                  const residentialValue =
                    item.total_residential > 0
                      ? item.types[categoryKey]?.[key] || 0
                      : 0;
                  return sum + commercialValue + residentialValue;
                }, 0);
                return { name, value, fill: color };
              });
            };

            const allData: any = {};
            const residentialData: any = {};
            const commercialData: any = {};

            Object.keys(categories).forEach((categoryKey) => {
              allData[categoryKey] = calculateCategoryData(data, categoryKey);
              residentialData[categoryKey] = calculateCategoryData(
                residentialTotalData,
                categoryKey
              );
              commercialData[categoryKey] = calculateCategoryData(
                commercialTotalData,
                categoryKey
              );
            });
            console.log("allData", residentialData);

            return {
              name: "Rental Segmentation",
              description:
                "Compare rental segmentation across residential and commercial.",
              chart_type: "donut",
              chartConfig: {
                Commercial: {
                  color: "#DDF8E4",
                },
                Residential: {
                  color: "#EFEEFC",
                },
              },
              sub_charts: [
                {
                  key: "sale_type",
                  name: "Sales Type",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  filters: [
                    { key: "all", label: "All", data: allData.free_hold_en },
                    {
                      key: "residential",
                      label: "Residential",
                      data: residentialData.free_hold_en,
                    },
                    {
                      key: "commercial",
                      label: "Commercial",
                      data: commercialData.free_hold_en,
                    },
                  ],
                  data: allData?.free_hold_en, // Calculated data will be here
                  insights:
                    "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
                },
                {
                  key: "property_status",
                  name: "Property Status",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  filters: [
                    { key: "all", label: "All", data: allData.version_en },
                    {
                      key: "residential",
                      label: "Residential",
                      data: residentialData.version_en,
                    },
                    {
                      key: "commercial",
                      label: "Commercial",
                      data: commercialData.version_en,
                    },
                  ],
                  data: allData?.version_en, // Calculated data will be here
                },
                {
                  key: "property_type",
                  name: "Property Type",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  filters: [
                    { key: "all", label: "All", data: allData.prop_type_en },
                    {
                      key: "residential",
                      label: "Residential",
                      data: residentialData.prop_type_en,
                    },
                    {
                      key: "commercial",
                      label: "Commercial",
                      data: commercialData.prop_type_en,
                    },
                  ],
                  data: allData?.prop_type_en, // Calculated data will be here
                },
                {
                  key: "total_properties",
                  name: "Total Propertries",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  filters: [
                    {
                      key: "all",
                      label: "All",
                      data: allData.total_properties,
                    },
                    {
                      key: "residential",
                      label: "Residential",
                      data: residentialData.total_properties,
                    },
                    {
                      key: "commercial",
                      label: "Commercial",
                      data: commercialData.total_properties,
                    },
                  ],
                  data: allData.total_properties, // Calculated data will be here
                },
              ],
              data: chartData, // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating sales segmentation chart:", error);
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
              sub_charts: [],
              data: [], // Calculated data will be here
            };
          }
        },
      },
    ],
  },
  {
    key: "commercial_rentals_overview",
    name: "Commercial Rentals Overview",
    description:
      "Analysis of commercial property rentals including warehouses, offices, and retail units.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: "commercial",
      mode: "rental",
    },
    page_filters: [
      {
        key: "bedroom",
        label: "Bedroom",
        options: ["1", "2", "3", "4", "5", "6"],
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=rooms",
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
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
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
          `${BASE_URL}/api/rental/average?usage_en=Commercial&start_year=2023&end_year=2024`,
          {
            params: params,
          }
        );

        const rents = response.data.data.data;

        if (rents.length === 0) {
          throw new Error("No transactions found for the specified filters.");
        }

        const growthCalculator = (current: number, previous: number) =>
          ((current - previous) / previous) * 100;

        const avgRentNew = rents[1].avg_rent_new_yearly;
        const avgRentNewGrowth = growthCalculator(
          parseFloat(avgRentNew),
          parseFloat(rents[0].avg_rent_new_yearly)
        );
        const avgRentRenewal = rents[1].avg_rent_renewal_yearly;
        const avgRentRenewalGrowth = growthCalculator(
          parseFloat(avgRentRenewal),
          parseFloat(rents[0].avg_rent_renewal_yearly)
        );
        const totalTransaction = rents[1].total_transaction_yearly;
        const totalTransactionGrowth = growthCalculator(
          parseFloat(totalTransaction),
          parseFloat(rents[0].total_transaction_yearly)
        );
        const renewalRatio = rents[1].renewal_ratio_yearly;
        const renewalRatioGrowth = growthCalculator(
          parseFloat(renewalRatio),
          parseFloat(rents[0].renewal_ratio_yearly)
        );

        return [
          {
            key: "avg_rent_new",
            title: "Average Rent (New)",
            value: avgRentNew.toFixed(2),
            growth: avgRentNewGrowth.toFixed(2),
          },
          {
            key: "sales_per_sqft",
            title: "Average Rent (Renewal)",
            value: avgRentRenewal.toFixed(2),
            growth: avgRentRenewalGrowth.toFixed(2),
          },
          {
            key: "total_transactions",
            title: "Total Transactions",
            value: totalTransaction,
            growth: totalTransactionGrowth.toFixed(2),
          },
          {
            key: "renewal_ratio",
            title: "Renewal Ratio",
            value: String((renewalRatio * 100).toFixed(2)) + "%",
            growth: renewalRatioGrowth.toFixed(2),
          },
        ];
      } catch (error) {
        console.error("Error calculating metrics:", error);
        return [
          {
            key: "avg_rent_new",
            title: "Average Rent (New)",
            value: "N/A",
          },
          {
            key: "sales_per_sqft",
            title: "Average Rent Renewal",
            value: "N/A",
          },
          {
            key: "total_transactions",
            title: "Total Transactions",
            value: "N/A",
          },
          {
            key: "renewal_ratio",
            title: "Renewal Ratio",
            value: "N/A",
          },
        ];
      }
    },
    calculate_charts: [
      {
        key: "rental_transactions_value_trend",
        calculate: async (params) => {
          try {
            // Will do the required calculation here and return the data to build graph
            params = {};
            const date = new Date();
            const end_year = date.getFullYear();
            const start_year = end_year - 9;
            console.log("params", params);
            const response = await axios.get(
              `${BASE_URL}/api/rental/average?usage_en=Commercial&start_year${start_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            console.log("response barrr", response.data);
            const data = response.data.data.data;
            console.log("data Transs", data);

            const avgRents = data.map((item: any) => ({
              year: item.Year,
              value: item.avg_rent_yearly.toFixed(2),
            }));

            const avgRentNew = data.map((item: any) => ({
              year: item.Year,
              value: item.avg_rent_new_yearly.toFixed(2),
            }));

            const avgRentRenew = data.map((item: any) => ({
              year: item.Year,
              value: item.avg_rent_renewal_yearly.toFixed(2),
            }));
            console.log("totalValue", avgRents);
            // Will do the required calculation here and return the data to build graph
            return {
              name: "Rental Transactions Value Trend",
              description:
                "Compare transactional total value and value per sqft over time.",
              filters: [
                { key: "all", label: "All", data: avgRents },
                {
                  key: "new",
                  label: "New",
                  data: avgRentNew,
                },
                {
                  key: "renew",
                  label: "Renew",
                  data: avgRentRenew,
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
              data: avgRents, // Calculated data will be here
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
        key: "rental_transactions_trend",
        calculate: async (params) => {
          try {
            params = {};
            const date = new Date();
            const currentMonth = date.getMonth();
            const end_year = date.getFullYear();
            const start_year = end_year - 1;
            const response = await axios.get(
              `${BASE_URL}/api/rental/average?usage_en=Commercial&start_year=${start_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            const data = response.data.data.data;
            console.log("chddd", data);

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
            const currentYearData = data[data.length - 1].month_data;
            const previousYearData = data[data.length - 2].month_data;
            console.log("currentYearData", currentYearData);
            const allData = [];
            const newData = [];
            const renewData = [];
            for (let i = 0; i < 12; i++) {
              if (i < 12 - currentMonth) {
                allData.push({
                  year: `${months[currentMonth + i]}_${end_year - 1}`,
                  value1: previousYearData[currentMonth + i].Total_Transactions,
                });
                newData.push({
                  year: `${months[currentMonth + i]}_${end_year - 1}`,
                  value1:
                    previousYearData[currentMonth + i].Total_Transactions_New,
                });
                renewData.push({
                  year: `${months[currentMonth + i]}_${end_year - 1}`,
                  value1:
                    previousYearData[currentMonth + i]
                      .Total_Transactions_Renewal,
                });
              } else {
                allData.push({
                  year: months[i - (12 - currentMonth)],
                  value1:
                    currentYearData[i - (12 - currentMonth)].Total_Transactions,
                });
                newData.push({
                  year: months[i - (12 - currentMonth)],
                  value1:
                    currentYearData[i - (12 - currentMonth)]
                      .Total_Transactions_New,
                });
                renewData.push({
                  year: months[i - (12 - currentMonth)],
                  value1:
                    currentYearData[i - (12 - currentMonth)]
                      .Total_Transactions_Renewal,
                });
              }
            }

            console.log("allData", allData);

            // Will do the required calculation here and return the data to build graph
            return {
              name: "Rental Transactions Trend",
              description: "Compare number of transactions over time!",
              filters: [
                { key: "All", label: "All", data: allData },
                { key: "new", label: "New", data: newData },
                { key: "renew", label: "Renew", data: renewData },
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
              data: allData, // Calculated data will be here
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
        key: "rental_index",
        calculate: async (params) => {
          params = {};
          try {
            const response = await axios.get(
              `${BASE_URL}/api/rental/index?usage_en=Commercial`,
              {
                params: params,
              }
            );
            const date = new Date();
            const end_year = date.getFullYear();
            const responseRange = await axios.get(
              `${BASE_URL}/api/rental/rentIndex?usage_en=Residential&start_year=${end_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );

            // Will do the required calculation here and return the data to build graph
            const data = response.data.data.quartiles;
            console.log("percentile25", data);
            const percentile25 = data[0].max;
            const percentile75 = data[3].min;

            const rangeData = responseRange.data.data.data[0];
            console.log("rangeData", rangeData);
            const chartData = [
              {
                name: "<25K",
                value: rangeData.total_rents_under_25k,
                colorClass: "bg-[#FFDBDB]",
              },
              {
                name: "25K to 50k",
                value: rangeData.total_rents_25k_to_50k,
                colorClass: "bg-[#EFEEFC]",
              },
              {
                name: "50k to 100k",
                value: rangeData.total_rents_50k_to_100k,
                colorClass: "bg-[#DDF8E4]",
              },
              {
                name: "100k to 200k",
                value: rangeData.total_rents_100k_to_200k,
                colorClass: "bg-[#FCF8D1]",
              },
              {
                name: "200k to 400k",
                value: rangeData.total_rents_200k_to_400k,
                colorClass: "bg-[#FFC8C8]",
              },
              {
                name: ">400k",
                value: rangeData.total_sales_over_400k,
                colorClass: "bg-[#FFC8C8]",
              },
            ];

            return {
              name: "Rental Index",
              description: "This is overall Rental value index in Dubai.",
              chart_type: "percentile_bar",
              filters: [],
              chartConfig: {},
              sub_charts: [
                {
                  key: "price_range",
                  name: "Price Range",
                  chart_type: "donut",
                  chartConfig: {
                    "<25K": { color: "#FFDBDB" },
                    "25K to 50k": { color: "#EFEEFC" },
                    "50k to 100k": { color: "#DDF8E4" },
                    "100k to 200k": { color: "#FCF8D1" },
                    "200k to 400k": { color: "#FFC8C8" },
                    ">400k": { color: "#FFC8C8" },
                  },
                  data: chartData, // Calculated data will be here
                },
              ],
              insights:
                "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
              data: [percentile25, percentile75], // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating sales index chart:", error);
            return {
              name: "Rental Index",
              description: "This is overall Rental value index in Dubai.",
              chart_type: "percentile_bar",
              filters: [],
              chartConfig: {},
              sub_charts: [
                {
                  key: "price_range",
                  name: "Price Range",
                  chart_type: "donut",
                  chartConfig: {
                    "<500K": { color: "#FFDBDB" },
                    "500K to 1M": { color: "#EFEEFC" },
                    "1M to 2M": { color: "#DDF8E4" },
                    "2M to 3M": { color: "#FCF8D1" },
                    "3M to 4M": { color: "#FFC8C8" },
                    "4M to 5M": { color: "#FFC8C8" },
                    "5M to 10M": { color: "#FFC8C8" },
                    ">10M": { color: "#FFC8C8" },
                  },
                  data: [], // Calculated data will be here
                },
              ],
              insights:
                "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
              data: [], // Calculated data will be here
            };
          }
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params) => {
          try {
            const response = await axios.get(
              `${BASE_URL}/api/rental/last?usage_en=Commercial`,
              { params: params }
            );

            // Will do the required calculation here and return the data to build graph
            const data = response.data.data.data;
            const chartcolumns = ["Date", "Rent Price", "Sub Property"];
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

              const date = new Date(item.registration_date.value);
              const formattedDate = `${date.getDate()}/${
                months[date.getMonth()]
              }/${date.getFullYear()}`;
              return {
                Date: formattedDate, // Use the formatted date
                "Rent Price": item.annual_amount,
                "Sub Property": item.property_subtype,
              };
            });

            const avgValueNew = data[0].avg_value_new.toFixed(2);
            const avgValueRenewal = data[0].avg_value_renewed.toFixed(2);

            return {
              name: "Similar Transactions",
              chart_type: "table",
              chartConfig: {},
              filters: [],
              sub_metrics: [],
              view_more: true,
              otherInfo: [
                { name: "Average Rent (New)", value: avgValueNew },
                { name: "Average Rent (Renewal)", value: avgValueRenewal },
              ],
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
        key: "rent_Comparison",
        calculate: async (params) => {
          try {
            const date = new Date();
            const end_year = date.getFullYear();
            const start_year = end_year - 1;
            const response = await axios.get(
              `${BASE_URL}/api/rental/comp?usage_en=Commercial&start_year=${end_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            // Will do the required calculation here and return the data to build graph

            const data = response.data.data.data;
            console.log("compare data", data);
            const chartData = data.map((item: any) => ({
              name: item.AREA_EN,
              avgPrice: item.avg_rent_value.toFixed(2),
              pricePerSqFt: String(item.renewal_ratio.toFixed(2) * 100) + "%",
              transactions: item.num_rents.toFixed(2),
            }));

            return {
              name: "Rent Comparison",
              chart_type: "comparison_table",
              filters: [],
              chartConfig: {},
              sub_metrics: [],
              view_more: true,
              data: chartData, // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating price comparison chart:", error);
            return {
              name: "Rent Comparison",
              chart_type: "comparison_table",
              filters: [],
              chartConfig: {},
              sub_metrics: [],
              view_more: true,
              data: [], // Calculated data will be here
            };
          }
        },
      },
      {
        key: "rental_segmentation",
        calculate: async (params) => {
          try {
            const date = new Date();
            const end_year = date.getFullYear();
            params = {};
            const response = await axios.get(
              `${BASE_URL}/api/rental/segment?usage_en=Commercial&start_year=${end_year}&end_year=${end_year}`,
              {
                params: params,
              }
            );
            // // Will do the required calculation here and return the data to build graph

            const data = response.data.data.data;
            console.log("data Transs", response);
            const commercialTotalData = data.filter(
              (item: any) => item.USAGE_EN === "Commercial"
            );
            const residentialTotalData = data.filter(
              (item: any) => item.USAGE_EN === "Residential"
            );
            console.log("commercialTotalData", commercialTotalData);
            const chartData = [
              {
                name: "Commercial",
                value: commercialTotalData[0].total_commercial,
                colorClass: "bg-[#FFC8C8]",
              },
              {
                name: "Residential",
                value: residentialTotalData[0].total_residential,
                colorClass: "bg-[#EFEEFC]",
              },
            ];
            console.log("chartData", chartData);

            const colors: Record<string, string> = {
              free_hold: "#DDF8E4",
              lease: "#EFEEFC",
              ready: "#DDF8E4",
              offplan: "#FFDBDB",
              land: "#E5F2FF",
              unit: "#FFE2E2",
              building: "#FFF3E0",
              villa: "#E2FFEB",
              count_1_B_R: "#E2FFEB",
              count_2_B_R: "#FFE2E2",
              count_3_B_R: "#FFF3E0",
              count_4_B_R: "#E5F2FF",
              count_5_B_R: "#FFDBDB",
              count_6_B_R: "#DDF8E4",
              count_7_B_R: "#EFEEFC",
              count_8_B_R: "#CBE5FB",
              count_9_B_R: "#FCF8D1",
              count_studio: "#FFC8C8",
              count_single_room: "#FFC8C8",
              count_penthouse: "#FFC8C8",
            };

            const categories: {
              [key: string]: { key: string; name: string; color: string }[];
            } = {
              free_hold_en: [
                { key: "free_hold", name: "Freehold", color: colors.free_hold },
                { key: "lease", name: "Lease", color: colors.lease },
              ],
              version_en: [
                { key: "new_version", name: "New", color: colors.ready },
                {
                  key: "renew_version",
                  name: "Renew",
                  color: colors.offplan,
                },
              ],
              total_properties: [
                {
                  key: "Individual",
                  name: "Individual",
                  color: colors.count_1_B_R,
                },
                { key: "Bulk", name: "Bulk", color: colors.count_4_B_R },
              ],
              prop_type_en: [
                { key: "land", name: "Land", color: colors.land },
                { key: "unit", name: "Unit", color: colors.unit },
                { key: "building", name: "Building", color: colors.building },
                { key: "villa", name: "Villa", color: colors.villa },
              ],
            };

            const calculateCategoryData = (
              sourceData: any[],
              categoryKey: string
            ) => {
              return categories[categoryKey].map(({ key, name, color }) => {
                const value = sourceData.reduce((sum: number, item: any) => {
                  const commercialValue =
                    item.total_commercial > 0
                      ? item.types[categoryKey]?.[key] || 0
                      : 0;
                  const residentialValue =
                    item.total_residential > 0
                      ? item.types[categoryKey]?.[key] || 0
                      : 0;
                  return sum + commercialValue + residentialValue;
                }, 0);
                return { name, value, fill: color };
              });
            };

            const allData: any = {};
            const residentialData: any = {};
            const commercialData: any = {};

            Object.keys(categories).forEach((categoryKey) => {
              allData[categoryKey] = calculateCategoryData(data, categoryKey);
              residentialData[categoryKey] = calculateCategoryData(
                residentialTotalData,
                categoryKey
              );
              commercialData[categoryKey] = calculateCategoryData(
                commercialTotalData,
                categoryKey
              );
            });
            console.log("allData", residentialData);

            return {
              name: "Rental Segmentation",
              description:
                "Compare rental segmentation across residential and commercial.",
              chart_type: "donut",
              chartConfig: {
                Commercial: {
                  color: "#DDF8E4",
                },
                Residential: {
                  color: "#EFEEFC",
                },
              },
              sub_charts: [
                {
                  key: "sale_type",
                  name: "Sales Type",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  filters: [
                    { key: "all", label: "All", data: allData.free_hold_en },
                    {
                      key: "residential",
                      label: "Residential",
                      data: residentialData.free_hold_en,
                    },
                    {
                      key: "commercial",
                      label: "Commercial",
                      data: commercialData.free_hold_en,
                    },
                  ],
                  data: allData?.free_hold_en, // Calculated data will be here
                  insights:
                    "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
                },
                {
                  key: "property_status",
                  name: "Property Status",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  filters: [
                    { key: "all", label: "All", data: allData.version_en },
                    {
                      key: "residential",
                      label: "Residential",
                      data: residentialData.version_en,
                    },
                    {
                      key: "commercial",
                      label: "Commercial",
                      data: commercialData.version_en,
                    },
                  ],
                  data: allData?.version_en, // Calculated data will be here
                },
                {
                  key: "property_type",
                  name: "Property Type",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  filters: [
                    { key: "all", label: "All", data: allData.prop_type_en },
                    {
                      key: "residential",
                      label: "Residential",
                      data: residentialData.prop_type_en,
                    },
                    {
                      key: "commercial",
                      label: "Commercial",
                      data: commercialData.prop_type_en,
                    },
                  ],
                  data: allData?.prop_type_en, // Calculated data will be here
                },
                {
                  key: "total_properties",
                  name: "Total Propertries",
                  chart_type: "horizontal_bar",
                  chartConfig: {},
                  filters: [
                    {
                      key: "all",
                      label: "All",
                      data: allData.total_properties,
                    },
                    {
                      key: "residential",
                      label: "Residential",
                      data: residentialData.total_properties,
                    },
                    {
                      key: "commercial",
                      label: "Commercial",
                      data: commercialData.total_properties,
                    },
                  ],
                  data: allData.total_properties, // Calculated data will be here
                },
              ],
              data: chartData, // Calculated data will be here
            };
          } catch (error) {
            console.error("Error calculating sales segmentation chart:", error);
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
              sub_charts: [],
              data: [], // Calculated data will be here
            };
          }
        },
      },
    ],
  },
  {
    key: "quarterly_market_insights",
    name: "Quarterly Market Insights",
    description:
      "Detailed quarterly reports on Dubai’s property market performance.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: null,
      mode: "sales",
    },
    page_filters: [],
    tag: "upcoming",
  },
  {
    key: "annual_market_insights",
    name: "Annual Market Insights",
    description:
      "Yearly performance trends and insights for Dubai's real estate sector.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: null,
      mode: "sales",
    },
    page_filters: [],
    tag: "upcoming",
  },
  {
    key: "developer_sales_comparison",
    name: "Developer Sales Comparison",
    description: "Compare sales volumes across top Dubai developers.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: null,
      mode: "sales",
    },
    page_filters: [],
    tag: "upcoming",
  },
  {
    key: "dubai_economy_tracker",
    name: "Dubai Economy Tracker",
    description: "Key economic indicators and their impact on real estate.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: null,
      mode: "sales",
    },
    page_filters: [],
    tag: "upcoming",
  },
  {
    key: "dubai_GDP_overview",
    name: "Dubai GDP Overview",
    description: "Insights into Dubai’s GDP trends and economic growth.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: null,
      mode: "sales",
    },
    page_filters: [],
    tag: "upcoming",
  },
  {
    key: "dubai_population_insights",
    name: "Dubai Population Insights",
    description: "Demographic trends shaping Dubai’s property demand.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: null,
      mode: "sales",
    },
    page_filters: [],
    tag: "upcoming",
  },
  // {
  //   key: "custom_dashboard_builder",
  //   name: "Custom Dashboard Builder",
  //   description: "Create dashboards tailored to your unique insights needs.",
  //   type: "custom",
  //   label: "new",
  //   dashboard_filters: {
  //     usage: null,
  //     mode: "sales",
  //   },
  //   page_filters: [],
  //   tag: "upcoming",
  // },
];

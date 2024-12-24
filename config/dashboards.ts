import axios, { all } from "axios";
import { Dashboard } from "./types";
import { RentalFilter, SalesFilter } from "./filters";
import { CalculateMatrix } from "./utility";
import {
  SalesIndex,
  SalesPriceComparison,
  SalesPriceRanges,
  SalesSegmentation,
  SalesSimilarData,
  SalesTrend,
  SalesTypeChart,
  SalesValueTrend,
} from "./sales";
import { BASE_URL } from "./constant";
import {
  RentalComparison,
  RentalIndex,
  RentalSegmentation,
  RentalSimilarData,
  RentalTrend,
  RentalValueTrend,
  RentalVersions,
} from "./rental";

export const dashboards: Dashboard[] = [
  {
    key: "explore",
    name: "Explore",
    description:
      "Explore dubai from your own perspective, sales? rental? we have it all covered.",
    type: "standard",
    dashboard_filters: {
      usage: null,
      mode: null,
    },
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
    page_filters: SalesFilter.slice(1),

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

    page_filters: SalesFilter.slice(1),

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
    page_filters: SalesFilter.slice(1),

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
    page_filters: [...SalesFilter.slice(0, 1), ...SalesFilter.slice(2)],

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
          data.sub_charts.map((item) => {
            item.filters = [item.filters[1]];
          });
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
    page_filters: [...SalesFilter.slice(0, 1), ...SalesFilter.slice(2)],

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
          data.sub_charts.map((item) => {
            item.filters = [item.filters[2]];
          });
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
    page_filters: RentalFilter,

    calculate_matrics: async (params) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      const sourceURL = `${BASE_URL}/api/rental/average`;
      const matrixOutput = await CalculateMatrix(sourceURL, "rental", params);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "rental_version",
        calculate: async (params) => {
          return await RentalVersions(params);
        },
      },
      {
        key: "rental_transactions_value_trend",
        calculate: async (params) => {
          return RentalValueTrend(params);
        },
      },
      {
        key: "rental_transactions_trend",
        calculate: async (params) => {
          return await RentalTrend(params);
        },
      },
      {
        key: "rental_index",
        calculate: async (params) => {
          return await RentalIndex(params);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params) => {
          return await RentalSimilarData(params);
        },
      },
      {
        key: "rent_Comparison",
        calculate: async (params) => {
          return await RentalComparison(params);
        },
      },
      {
        key: "rental_segmentation",
        calculate: async (params) => {
          return await RentalSegmentation(params);
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
    page_filters: RentalFilter,

    calculate_matrics: async (params) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.usage_en = "Residential";
      const sourceURL = `${BASE_URL}/api/rental/average`;
      const matrixOutput = await CalculateMatrix(sourceURL, "rental", params);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "rental_version",
        calculate: async (params) => {
          params.usage_en = "Residential";
          return await RentalVersions(params);
        },
      },
      {
        key: "rental_transactions_value_trend",
        calculate: async (params) => {
          params.usage_en = "Residential";
          return RentalValueTrend(params);
        },
      },
      {
        key: "rental_transactions_trend",
        calculate: async (params) => {
          params.usage_en = "Residential";
          return await RentalTrend(params);
        },
      },
      {
        key: "rental_index",
        calculate: async (params) => {
          params.usage_en = "Residential";
          return await RentalIndex(params);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params) => {
          params.usage_en = "Residential";
          return await RentalSimilarData(params);
        },
      },
      {
        key: "rent_Comparison",
        calculate: async (params) => {
          params.usage_en = "Residential";
          return await RentalComparison(params);
        },
      },
      {
        key: "rental_segmentation",
        calculate: async (params) => {
          params.usage_en = "Residential";
          const data = await RentalSegmentation(params);
          data.sub_charts = [];
          return data;
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
    page_filters: RentalFilter,

    calculate_matrics: async (params) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.usage_en = "Commercial";
      const sourceURL = `${BASE_URL}/api/rental/average`;
      const matrixOutput = await CalculateMatrix(sourceURL, "rental", params);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "rental_version",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          return await RentalVersions(params);
        },
      },
      {
        key: "rental_transactions_value_trend",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          return RentalValueTrend(params);
        },
      },
      {
        key: "rental_transactions_trend",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          return await RentalTrend(params);
        },
      },
      {
        key: "rental_index",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          return await RentalIndex(params);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          return await RentalSimilarData(params);
        },
      },
      {
        key: "rent_Comparison",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          return await RentalComparison(params);
        },
      },
      {
        key: "rental_segmentation",
        calculate: async (params) => {
          params.usage_en = "Commercial";
          const data = await RentalSegmentation(params);
          data.sub_charts = [];
          return data;
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

import axios, { all } from "axios";
import { Dashboard } from "./types";
import { RentalFilter, SalesFilter, SupplyFilter } from "./filters";
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
import {
  DeliveredUnitsPerAreaDubai,
  FuturePlannedSupply,
  FuturePropertySupplyPerArea,
  PlannedPropertiesByCompletionPercentage,
  SupplyByPriceRanges,
  YearlyCompletedUnits,
  YearlyLaunchedProperties,
} from "./supply";
import {
  AnnualPropertySalesValue,
  AnnualPropertySalesVolume,
  AverageValueByRoom,
  MonthlyProperties,
  OffPlanPriceIndex,
  OffPlanPricePErSqft,
  SalesValueProportion,
  SalesVolumeProportion,
} from "./offplan";
import {
  FlatSalesIndex,
  FlatSalesValue,
  OverallSalesIndex,
  OverallSalesValue,
  VillaSalesIndex,
  VillaSalesValue,
} from "./sales_index";
import { CalculateMatrixSales } from "./salesMatrix";
import { CalculateMatrixRental } from "./rentalMatrix";
import { CalculateSupplyMatrix } from "./supplyMatrix";
import { CalculateOffplanMatrix } from "./offplanMatrix";

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

    calculate_matrics: async (params, token) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      const matrixOutput = await CalculateMatrixSales(params, token);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params, token) => {
          return await SalesTypeChart(params, token);
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params, token) => {
          return SalesValueTrend(params, token) as any;
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params, token) => {
          return await SalesTrend(params, token);
        },
      },
      {
        key: "sales_index",
        calculate: async (params, token) => {
          return await SalesIndex(params, token);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params, token) => {
          return await SalesSimilarData(params, token);
        },
      },
      {
        key: "price_Comparison",
        calculate: async (params, token) => {
          return await SalesPriceComparison(params, token);
        },
      },
      {
        key: "sales_segmentation",
        calculate: async (params, token) => {
          return await SalesSegmentation(params, token);
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

    calculate_matrics: async (params, token) => {
      console.log("params", params);
      const date = new Date();
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.group_en = "Sales";
      const matrixOutput = await CalculateMatrixSales(params, token);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params, token) => {
          params.group_en = "Sales";
          return await SalesTypeChart(params, token);
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params, token) => {
          params.group_en = "Sales";
          return SalesValueTrend(params, token) as any;
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params, token) => {
          params.group_en = "Sales";
          return await SalesTrend(params, token);
        },
      },
      {
        key: "sales_index",
        calculate: async (params, token) => {
          params.group_en = "Sales";
          return await SalesIndex(params, token);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params, token) => {
          params.group_en = "Sales";
          return await SalesSimilarData(params, token);
        },
      },
      {
        key: "price_Comparison",
        calculate: async (params, token) => {
          params.group_en = "Sales";
          return await SalesPriceComparison(params, token);
        },
      },
      {
        key: "sales_segmentation",
        calculate: async (params, token) => {
          params.group_en = "Sales";
          return await SalesSegmentation(params, token);
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

    calculate_matrics: async (params, token) => {
      console.log("params", params);
      const date = new Date();
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.group_en = "Mortgage";
      const matrixOutput = await CalculateMatrixSales(params, token);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params, token) => {
          params.group_en = "Mortgage";
          return await SalesTypeChart(params, token);
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params, token) => {
          params.group_en = "Mortgage";
          return SalesValueTrend(params, token);
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params, token) => {
          params.group_en = "Mortgage";
          return (await SalesTrend(params, token)) as any;
        },
      },
      {
        key: "sales_index",
        calculate: async (params, token) => {
          params.group_en = "Mortgage";
          return await SalesIndex(params, token);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params, token) => {
          params.group_en = "Mortgage";
          return await SalesSimilarData(params, token);
        },
      },
      {
        key: "price_Comparison",
        calculate: async (params, token) => {
          params.group_en = "Mortgage";
          return await SalesPriceComparison(params, token);
        },
      },
      {
        key: "sales_segmentation",
        calculate: async (params, token) => {
          params.group_en = "Mortgage";
          return await SalesSegmentation(params, token);
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

    calculate_matrics: async (params, token) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.group_en = "Gifts";
      const matrixOutput = await CalculateMatrixSales(params, token);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params, token) => {
          params.group_en = "Gifts";
          return await SalesTypeChart(params, token);
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params, token) => {
          params.group_en = "Gifts";
          return SalesValueTrend(params, token) as any;
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params, token) => {
          params.group_en = "Gifts";
          return await SalesTrend(params, token);
        },
      },
      {
        key: "sales_index",
        calculate: async (params, token) => {
          params.group_en = "Gifts";
          return await SalesIndex(params, token);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params, token) => {
          params.group_en = "Gifts";
          return await SalesSimilarData(params, token);
        },
      },
      {
        key: "price_Comparison",
        calculate: async (params, token) => {
          params.group_en = "Gifts";
          return await SalesPriceComparison(params, token);
        },
      },
      {
        key: "sales_segmentation",
        calculate: async (params, token) => {
          params.group_en = "Gifts";
          return await SalesSegmentation(params, token);
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

    calculate_matrics: async (params, token) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.usage_en = "Residential";
      const matrixOutput = await CalculateMatrixSales(params, token);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          return await SalesTypeChart(params, token);
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          return SalesValueTrend(params, token) as any;
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          return await SalesTrend(params, token);
        },
      },
      {
        key: "sales_index",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          return await SalesIndex(params, token);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          return await SalesSimilarData(params, token);
        },
      },
      {
        key: "price_Comparison",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          return await SalesPriceComparison(params, token);
        },
      },
      {
        key: "sales_segmentation",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          const data = await SalesSegmentation(params, token);
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

    calculate_matrics: async (params, token) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.usage_en = "Commercial";
      const matrixOutput = await CalculateMatrixSales(params, token);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "transactions_type",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          return await SalesTypeChart(params, token);
        },
      },
      {
        key: "transactions_value_trend",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          return SalesValueTrend(params, token) as any;
        },
      },
      {
        key: "sales_transactions_trend",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          return await SalesTrend(params, token);
        },
      },
      {
        key: "sales_index",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          return await SalesIndex(params, token);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          return await SalesSimilarData(params, token);
        },
      },
      {
        key: "price_Comparison",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          return await SalesPriceComparison(params, token);
        },
      },
      {
        key: "sales_segmentation",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          const data = await SalesSegmentation(params, token);
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

    calculate_matrics: async (params, token) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      const matrixOutput = await CalculateMatrixRental(params, token);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "rental_version",
        calculate: async (params, token) => {
          return await RentalVersions(params, token);
        },
      },
      {
        key: "rental_transactions_value_trend",
        calculate: async (params, token) => {
          return RentalValueTrend(params, token) as any;
        },
      },
      {
        key: "rental_transactions_trend",
        calculate: async (params, token) => {
          return await RentalTrend(params, token);
        },
      },
      {
        key: "rental_index",
        calculate: async (params, token) => {
          return await RentalIndex(params, token);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params, token) => {
          return await RentalSimilarData(params, token);
        },
      },
      {
        key: "rent_Comparison",
        calculate: async (params, token) => {
          return await RentalComparison(params, token);
        },
      },
      {
        key: "rental_segmentation",
        calculate: async (params, token) => {
          return await RentalSegmentation(params, token);
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

    calculate_matrics: async (params, token) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.usage_en = "Residential";
      const matrixOutput = await CalculateMatrixRental(params, token);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "rental_version",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          return await RentalVersions(params, token);
        },
      },
      {
        key: "rental_transactions_value_trend",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          return RentalValueTrend(params, token) as any;
        },
      },
      {
        key: "rental_transactions_trend",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          return await RentalTrend(params, token);
        },
      },
      {
        key: "rental_index",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          return await RentalIndex(params, token);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          return await RentalSimilarData(params, token);
        },
      },
      {
        key: "rent_Comparison",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          return await RentalComparison(params, token);
        },
      },
      {
        key: "rental_segmentation",
        calculate: async (params, token) => {
          params.usage_en = "Residential";
          const data = await RentalSegmentation(params, token);
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

    calculate_matrics: async (params, token) => {
      console.log("params", params);
      const presentYear = params?.end_year;
      params.start_year = Number(presentYear) - 1;
      params.usage_en = "Commercial";
      const matrixOutput = await CalculateMatrixRental(params, token);
      return matrixOutput;
    },

    calculate_charts: [
      {
        key: "rental_version",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          return await RentalVersions(params, token);
        },
      },
      {
        key: "rental_transactions_value_trend",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          return RentalValueTrend(params, token) as any;
        },
      },
      {
        key: "rental_transactions_trend",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          return await RentalTrend(params, token);
        },
      },
      {
        key: "rental_index",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          return await RentalIndex(params, token);
        },
      },
      {
        key: "similar_transactions",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          return await RentalSimilarData(params, token);
        },
      },
      {
        key: "rent_Comparison",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          return await RentalComparison(params, token);
        },
      },
      {
        key: "rental_segmentation",
        calculate: async (params, token) => {
          params.usage_en = "Commercial";
          const data = await RentalSegmentation(params, token);
          data.sub_charts = [];
          return data;
        },
      },
    ],
  },

  {
    key: "supply_trends_dashboard",
    name: "Supply Trends Dashboard",
    description:
      "Insights on property supply, including available inventory across various Dubai areas.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: null,
      mode: "sales",
    },
    page_filters: SupplyFilter,
    calculate_matrics: async (params, token) => {
      console.log("params", params);
      const matrixOutput = await CalculateSupplyMatrix(params, token);
      return matrixOutput;
    },
    calculate_charts: [
      {
        key: "future_properties_per_area",
        calculate: async (params, token) => {
          return (await FuturePropertySupplyPerArea(params, token)) as any;
        },
      },
      {
        key: "yearly_completed_units",
        calculate: async (params, token) => {
          return await YearlyCompletedUnits(params, token);
        },
      },
      {
        key: "yearly_launched_properties",
        calculate: async (params, token) => {
          return await YearlyLaunchedProperties(params, token);
        },
      },
      {
        key: "future_planned_supply",
        calculate: async (params, token) => {
          return await FuturePlannedSupply(params, token);
        },
      },
      {
        key: "supply_by_price_ranges",
        calculate: async (params, token) => {
          return await SupplyByPriceRanges(params, token);
        },
      },

      {
        key: "planned_percentage_completion",
        calculate: async (params, token) => {
          return await PlannedPropertiesByCompletionPercentage(params, token);
        },
      },
      {
        key: "delivered_units_per_area_dubai",
        calculate: async (params, token) => {
          return await DeliveredUnitsPerAreaDubai(params, token);
        },
      },
    ],
  },
  {
    key: "offplan_market_insights",
    name: "Offplan Market Insights",
    description:
      "Analysis of offplan property sales trends, developer performance, and future inventory.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      mode: "sales",
    },
    page_filters: [],
    calculate_matrics: async (params, token) => {
      const matrixOutput = await CalculateOffplanMatrix(params, token);
      return matrixOutput;
    },
    calculate_charts: [
      {
        key: "monthly_properties",
        calculate: async (params, token) => {
          return await MonthlyProperties(token);
        },
      },
      {
        key: "annual_property_sales_volume",
        calculate: async (params, token) => {
          return (await AnnualPropertySalesVolume(token)) as any;
        },
      },
      {
        key: "annual_property_sales_value",
        calculate: async (params, token) => {
          return await AnnualPropertySalesValue(token);
        },
      },
      {
        key: "sales_volume_proportion",
        calculate: async (params, token) => {
          return await SalesVolumeProportion(token);
        },
      },
      {
        key: "sales_value_proportion",
        calculate: async (params, token) => {
          return await SalesValueProportion(token);
        },
      },
      {
        key: "offplan_price_per_sqft",
        calculate: async (params, token) => {
          return await OffPlanPricePErSqft(token);
        },
      },
      {
        key: "offplan_price_index",
        calculate: async (params, token) => {
          return await OffPlanPriceIndex(token);
        },
      },
      {
        key: "average_value_by_room",
        calculate: async (params, token) => {
          return await AverageValueByRoom(token);
        },
      },
    ],
  },
  {
    key: "sales_price_index",
    name: "Sales Price Index",
    description:
      "Breakdown of property price ranges across Dubai’s sales market.",
    type: "standard",
    label: "new",
    dashboard_filters: {
      usage: null,
      mode: "sales",
    },
    page_filters: [],
    calculate_charts: [
      {
        key: "overall_sales_index",
        calculate: async (params, token) => {
          return (await OverallSalesIndex(token)) as any;
        },
      },
      {
        key: "overall_sales_value",
        calculate: async (params, token) => {
          return await OverallSalesValue(token);
        },
      },
      {
        key: "villa_sales_index",
        calculate: async (params, token) => {
          return await VillaSalesIndex(token);
        },
      },
      {
        key: "villa_sales_value",
        calculate: async (params, token) => {
          return await VillaSalesValue(token);
        },
      },
      {
        key: "flat_sales_index",
        calculate: async (params, token) => {
          return await FlatSalesIndex(token);
        },
      },
      {
        key: "flat_sales_value",
        calculate: async (params, token) => {
          return await FlatSalesValue(token);
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

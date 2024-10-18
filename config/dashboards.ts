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
    page_filters: ["year", "location", "developer"],
    matrics: [
      {
        key: "total_rental_value",
        title: "Total Rental Value",
        value: "12000000",
        growth: "-21",
      },
      {
        key: "sales_per_sqft",
        title: "Sales Per Sqft",
        value: "35000000",
        growth: "21",
      },
      {
        key: "total_value",
        title: "Total Value",
        value: "165000",
        growth: "21",
      },
      {
        key: "no_of_transactions",
        title: "No of Transactions",
        value: "20",
        growth: "-21",
      },
    ],
    charts: [
      {
        key: "transactions_type",
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
        sub_metrics: [],
        api_endpoint: "/api/metrics/total_sales_value", // API endpoint to fetch data
      },
      {
        key: "transactions_value_trend",
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
        sub_metrics: [],
        api_endpoint: "/api/metrics/sales_per_sqft",
        insights:
          "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
      },
      {
        key: "sales_transactions_trend",
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
        sub_metrics: [],
        api_endpoint: "/api/metrics/sales_per_sqft",
        insights:
          "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      },
      {
        key: "sales_index",
        name: "Sales Index",
        description: "This is overall sales value index in Dubai.",
        chart_type: "percentile_bar",
        filters: [],
        sub_metrics: [
          {
            key: "properties",
            name: "Sales Index",
            chart_type: "donut",
            chartConfig: {
              "Dubai Marina": { color: "#FFC8C8" },
              "Dubai Central": { color: "#EFEEFC" },
              "Dubai East": { color: "#D1F6DB" },
              "Dubai West": { color: "#FCF8D1" },
            },
            api_endpoint: "/api/metrics/sales_index",
          },
        ],
        api_endpoint: "/api/metrics/top_developers",
        insights:
          "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
      },
      {
        key: "similar_transactions",
        name: "Similar Transactions",
        chart_type: "table",
        filters: [],
        sub_metrics: [],
        view_more: true,
        api_endpoint: "/api/metrics/sales_transactions",
      },
      {
        key: "price_Comparison",
        name: "Price Comparison",
        chart_type: "comparison_table",
        filters: [],
        sub_metrics: [],
        view_more: true,
        api_endpoint: "/api/metrics/sales_transactions",
      },
      {
        key: "sales_segmentation",
        name: "Sales Segmentation",
        description:
          "Compare sales segmentation across residential and commercial.",
        chart_type: "comparison_table",
        filters: ["All", "Residential", "Commercial"],
        sub_metrics: [
          {
            key: "sale_type",
            name: "Sales Type",
            chart_type: "horizontal_bar",
            api_endpoint: "/api/metrics/sales_segmentation",
            insights:
              "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
          },
          {
            key: "property_status",
            name: "Property Status",
            chart_type: "horizontal_bar",
            api_endpoint: "/api/metrics/sales_segmentation",
          },
        ],
        api_endpoint: "/api/metrics/sales_transactions",
      },
    ],
  },
];

import {
  AllSalesLogo,
  AnnualInsightsLogo,
  CashLogo,
  CommercialLogo,
  DeveloperLogo,
  EconomyLogo,
  GdpLogo,
  GiftsLogo,
  MortgageLogo,
  OffplanLogo,
  PopulationLogo,
  QuarterlyInsightsLogo,
  RentalLogo,
  ResidentialLogo,
  SalePriceIndexLogo,
  SupplyLogo,
} from "@/public/svg/dashboard";
import { IntroCardProps } from "@/types/introcard";

export const SalesDashboards: IntroCardProps[] = [
  {
    key: "overall_market_transactions",
    title: "Overall Market Transactions",
    description:
      "Comprehensive overview of all sales, mortgages, and gift property transactions.",
    avatar: <AllSalesLogo />,
    linkto: "/app/dashboards/overall_market_transactions",
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    key: "sales_transactions_overview",
    title: "Cash Transactions Overview",
    description:
      "Analyze sales transactions, values, and trends across the Dubai property market.",
    avatar: <CashLogo />,
    linkto: "/app/dashboards/sales_transactions_overview",
    avatarBg: "bg-[#F8CBDB]",
  },
  {
    key: "mortgage_transactions_analysis",
    title: "Mortgage Transactions Analysis",
    description:
      "Insights into property purchases made using mortgage financing trends and details.",
    avatar: <MortgageLogo />,
    linkto: "/app/dashboards/mortgage_transactions_analysis",
    avatarBg: "bg-[#F7CFB4]",
  },
  {
    key: "gift_transactions_insights",
    title: "Gift Transactions Insights",
    description:
      "Track and analyze property transactions gifted, highlighting market behavior and trends.",
    avatar: <GiftsLogo />,
    linkto: "/app/dashboards/gift_transactions_insights",
    avatarBg: "bg-[#F9F09D]",
  },
  {
    key: "residential_sales_breakdown",
    title: "Residential Sales",
    description:
      "Analysis of residential property sales, including pricing, volumes, and market activity.",
    avatar: <ResidentialLogo />,
    linkto: "/app/dashboards/residential_sales_breakdown",
    avatarBg: "bg-[#DDDAF9]",
  },
  {
    key: "commercial_sales_breakdown",
    title: "Commercial Sales",
    description:
      "Track and analyze sales in the commercial property sector including offices and shops.",
    avatar: <CommercialLogo />,
    linkto: "/app/dashboards/commercial_sales_breakdown",
    avatarBg: "bg-[#F5D0FE]",
  },
  {
    key: "sales_price_index",
    title: "Sales Price Index",
    description:
      " Key indexes to track trends in residential, commercial property sales and rentals",
    avatar: <SalePriceIndexLogo />,
    linkto: "/app/dashboards/sales_price_index",
    avatarBg: "bg-[#A7F3D0]",
  },
];

export const RentalDashboards: IntroCardProps[] = [
  {
    key: "rental_market_trends",
    title: "Rental Market Trends",
    description:
      "Overview of rental transactions and trends, showing market performance across Dubai.",
    avatar: <RentalLogo />,
    linkto: "/app/dashboards/rental_market_trends",
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    key: "residential_rentals_analysis",
    title: "Residential Rentals",
    description:
      "In-depth look into rental transactions for residential properties, including rates and trends.",
    avatar: <RentalLogo />,
    linkto: "/app/dashboards/residential_rentals_analysis",
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    key: "commercial_rentals_overview",
    title: "Commercial Rentals",
    description:
      "Analysis of commercial property rentals including warehouses, offices, and retail units.",
    avatar: <RentalLogo />,
    linkto: "/app/dashboards/commercial_rentals_overview",
    avatarBg: "bg-[#A6E5FF]",
  },
];

export const SupplyAndOffPlanDashboards: IntroCardProps[] = [
  {
    key: "supply_trends_dashboard",
    title: "Supply Trends",
    description:
      "Insights on property supply, including available inventory across various Dubai areas.",
    avatar: <SupplyLogo />,
    linkto: "/app/dashboards/supply_trends_dashboard",
    avatarBg: "bg-[#CBD5E1]",
  },
  {
    key: "offplan_market_insights",
    title: "Offplan Market Insights",
    description:
      "Analysis of offplan property sales trends, developer performance, and future inventory.",
    avatar: <OffplanLogo />,
    linkto: "/app/dashboards/offplan_market_insights",
    avatarBg: "bg-[#D9F99D]",
  },
  {
    key: "developer_sales_comparison",
    title: "Developer Sales Comparison",
    description:
      "Compare sales performance among Dubai's leading property developers.",
    avatar: <DeveloperLogo />,
    linkto: "/app/dashboards/developer_sales_comparison",
    avatarBg: "bg-[#FECACA]",
    soon: true,
  },
];

export const PeriodicDashboards: IntroCardProps[] = [
  {
    key: "quarterly_market_insights",
    title: "Quarterly Market Insights",
    description:
      "Quarterly performance dashboards focused on sales and rental trends",
    avatar: <QuarterlyInsightsLogo />,
    linkto: "/app/dashboards/quarterly_market_insights",
    avatarBg: "bg-[#BFDBFE]",
    soon: true,
  },
  {
    key: "annual_market_insights",
    title: "Annual Market Insights",
    description:
      "Annual overview of market performance, transactions, growth, and other vital metrics.",
    avatar: <AnnualInsightsLogo />,
    linkto: "/app/dashboards/annual_market_insights",
    avatarBg: "bg-[#F9F09D]",
    soon: true,
  },
];

export const GenericGrowthDashboards: IntroCardProps[] = [
  {
    key: "dubai_economy_tracker",
    title: "Dubai Economy Tracker",
    description:
      "General dubai economy trends which can be correlated with trends in real estate transactions",
    avatar: <EconomyLogo />,
    linkto: "/app/dashboards/dubai_economy_tracker",
    avatarBg: "bg-[#A6E5FF]",
    soon: true,
  },
  {
    key: "dubai_population_insights",
    title: "Dubai Population Insights",
    description: "Overview of dubai population segmentation and growth trends",
    avatar: <PopulationLogo />,
    linkto: "/app/dashboards/dubai_population_insights",
    avatarBg: "bg-[#B6B1F0]",
    soon: true,
  },
  {
    key: "dubai_GDP_overview",
    title: "Dubai GDP Overview",
    description:
      "Insights aroud dubai GDP, in correlation with the real estate market performance",
    avatar: <GdpLogo />,
    linkto: "/app/dashboards/dubai_GDP_overview",
    avatarBg: "bg-[#F7CFB4]",
    soon: true,
  },
];

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
    title: "Overall Market Transactions",
    description:
      "Comprehensive overview of all sales, mortgages, and gift property transactions.",
    avatar: <AllSalesLogo />,
    linkto: "/app/dashboard/overall_market_transactions",
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    title: "Cash Transactions Overview",
    description:
      "Analyze sales transactions, values, and trends across the Dubai property market.",
    avatar: <CashLogo />,
    linkto: "/app/dashboard/sales_transactions_overview",
    avatarBg: "bg-[#F8CBDB]",
  },
  {
    title: "Mortgage Transactions Analysis",
    description:
      "Insights into property purchases made using mortgage financing trends and details.",
    avatar: <MortgageLogo />,
    linkto: "/app/dashboard/mortgage_transactions_analysis",
    avatarBg: "bg-[#F7CFB4]",
  },
  {
    title: "Gift Transactions Insights",
    description:
      "Track and analyze property transactions gifted, highlighting market behavior and trends.",
    avatar: <GiftsLogo />,
    linkto: "/app/dashboard/gifts_transactions_insights",
    avatarBg: "bg-[#F9F09D]",
  },
  {
    title: "Residential Sales",
    description:
      "Analysis of residential property sales, including pricing, volumes, and market activity.",
    avatar: <ResidentialLogo />,
    linkto: "/app/dashboard/residential_sales",
    avatarBg: "bg-[#DDDAF9]",
  },
  {
    title: "Commercial Sales",
    description:
      "Track and analyze sales in the commercial property sector including offices and shops.",
    avatar: <CommercialLogo />,
    linkto: "/app/dashboard/commercial_sales",
    avatarBg: "bg-[#F5D0FE]",
  },
  {
    title: "Sales Price Index",
    description:
      " Key indexes to track trends in residential, commercial property sales and rentals",
    avatar: <SalePriceIndexLogo />,
    linkto: "/app/dashboard/sales_price_index",
    avatarBg: "bg-[#A7F3D0]",
  },
];

export const RentalDashboards: IntroCardProps[] = [
  {
    title: "Rental Market Trends",
    description:
      "Overview of rental transactions and trends, showing market performance across Dubai.",
    avatar: <RentalLogo />,
    linkto: "/app/dashboard/rental_market_trends",
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    title: "Residential Rentals",
    description:
      "In-depth look into rental transactions for residential properties, including rates and trends.",
    avatar: <RentalLogo />,
    linkto: "/app/dashboard/residential_rentals",
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    title: "Commercial Rentals",
    description:
      "Analysis of commercial property rentals including warehouses, offices, and retail units.",
    avatar: <RentalLogo />,
    linkto: "/app/dashboard/commercial_rentals",
    avatarBg: "bg-[#A6E5FF]",
  },
];

export const SupplyAndOffPlanDashboards: IntroCardProps[] = [
  {
    title: "Supply Trends",
    description:
      "Insights on property supply, including available inventory across various Dubai areas.",
    avatar: <SupplyLogo />,
    linkto: "/app/dashboard/supply_trends_dashboard",
    avatarBg: "bg-[#CBD5E1]",
  },
  {
    title: "Offplan Market Insights",
    description:
      "Analysis of offplan property sales trends, developer performance, and future inventory.",
    avatar: <OffplanLogo />,
    linkto: "/app/dashboard/offplan_market_insights",
    avatarBg: "bg-[#D9F99D]",
  },
  {
    title: "Developer Sales Comparison",
    description:
      "Compare sales performance among Dubai's leading property developers.",
    avatar: <DeveloperLogo />,
    linkto: "/app/dashboard/developer_sales_comparison",
    avatarBg: "bg-[#FECACA]",
    soon: true,
  },
];

export const PeriodicDashboards: IntroCardProps[] = [
  {
    title: "Quarterly Market Insights",
    description:
      "Quarterly performance dashboards focused on sales and rental trends",
    avatar: <QuarterlyInsightsLogo />,
    linkto: "/app/dashboard/quarterly_market_insights",
    avatarBg: "bg-[#BFDBFE]",
    soon: true,
  },
  {
    title: "Annual Market Insights",
    description:
      "Annual overview of market performance, transactions, growth, and other vital metrics.",
    avatar: <AnnualInsightsLogo />,
    linkto: "/app/dashboard/annual_market_insights",
    avatarBg: "bg-[#F9F09D]",
    soon: true,
  },
];

export const GenericGrowthDashboards: IntroCardProps[] = [
  {
    title: "Dubai Economy Tracker",
    description:
      "General dubai economy trends which can be correlated with trends in real estate transactions",
    avatar: <EconomyLogo />,
    linkto: "/app/dashboard/dubai_economy_tracker",
    avatarBg: "bg-[#A6E5FF]",
    soon: true,
  },
  {
    title: "Dubai Population Insights",
    description: "Overview of dubai population segmentation and growth trends",
    avatar: <PopulationLogo />,
    linkto: "/app/dashboard/dubai_population_insights",
    avatarBg: "bg-[#B6B1F0]",
    soon: true,
  },
  {
    title: "Dubai GDP Overview",
    description:
      "Insights aroud dubai GDP, in correlation with the real estate market performance",
    avatar: <GdpLogo />,
    linkto: "/app/dashboard/dubai_gdp_overview",
    avatarBg: "bg-[#F7CFB4]",
    soon: true,
  },
];

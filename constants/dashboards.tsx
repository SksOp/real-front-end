import {
  MortgageInsightLogo,
  TransactionInsightLogo,
} from "@/public/svg/insights";
import { IntroCardProps } from "@/types/introcard";

export const SalesDashboards: IntroCardProps[] = [
  {
    title: "Overall Market Transactions",
    description:
      "Comprehensive overview of all sales, mortgages, and gift property transactions.",
    avatar: <MortgageInsightLogo />,
    linkto: "/app/dashboard/overall_market_transactions",
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    title: "Sales Transactions Overview",
    description:
      "Analyze sales transactions, values, and trends across the Dubai property market.",
    avatar: <MortgageInsightLogo />,
    linkto: "/app/dashboard/sales_transactions_overview",
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    title: "Mortgage Transactions Analysis",
    description:
      "Insights into property purchases made using mortgage financing trends and details.",
    avatar: <MortgageInsightLogo />,
    linkto: "/app/dashboard/mortgage_transactions_analysis",
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    title: "Sales Transactions Overview",
    description:
      "Analyze sales transactions, values, and trends across the Dubai property market.",
    avatar: <MortgageInsightLogo />,
    linkto: "/app/dashboard/sales_transactions_overview",
    avatarBg: "bg-[#A6E5FF]",
  },
];

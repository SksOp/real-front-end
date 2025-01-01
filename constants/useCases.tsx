import {
  AreaPerformanceInsightLogo,
  MortgageInsightLogo,
  OffplanInsightLogo,
  PriceIndexInsightLogo,
  RentalInsightLogo,
  SalesInsightLogo,
  SupplyInsightLogo,
  TransactionInsightLogo,
} from "@/public/svg/insights";
import { IntroCardProps } from "@/types/introcard";

export const useCaseItems: IntroCardProps[] = [
  {
    title: "Sales Insights",
    description:
      "All sales related insights including bench marking for advanced user friendly insights.",
    linkto: "#",
    avatar: <SalesInsightLogo />,
    avatarBg: "bg-[#F8CBDB]",
  },
  {
    title: "Rental Insights",
    description:
      "Rental data insights with complete market overview. Various usecases covered.",
    linkto: "#",
    avatar: <RentalInsightLogo />,
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    title: "Mortgage Analytics",
    description:
      "Mortgage trends & complete market overview. Advanced filters and segmentation.",
    linkto: "#",
    avatar: <MortgageInsightLogo />,
    avatarBg: "bg-[#F7CFB4]",
  },
  {
    title: "Supply Analysis",
    description:
      "Overview of current and upcoming supply in comparison with the demand and price.",
    linkto: "#",
    avatar: <SupplyInsightLogo />,
    avatarBg: "bg-[#CBD5E1]",
  },
  {
    title: "Offplan Analysis",
    description:
      "Keep yourself updated on offplan properties and selling prices. A detailed analysis.",
    linkto: "#",
    avatar: <OffplanInsightLogo />,
    avatarBg: "bg-[#D9F99D]",
  },
  {
    title: "Transaction Insights",
    description:
      "Not just a raw transaction. Detailed insights for every transactions.",
    linkto: "#",
    avatar: <TransactionInsightLogo />,
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    title: "Area Performance",
    description:
      "Compare the top performing area’s, both from sales and rental perspective.",
    linkto: "#",
    avatar: <AreaPerformanceInsightLogo />,
    avatarBg: "bg-[#F9F09D]",
  },
  {
    title: "Price Indexes",
    description:
      "DLD provided index ranges segmented by property types. All index compared.",
    linkto: "#",
    avatar: <PriceIndexInsightLogo />,
    avatarBg: "bg-[#A7F3D0]",
  },
];

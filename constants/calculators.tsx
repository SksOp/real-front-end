import {
  GoalPlannerIcon,
  HomeAffIcon,
  IncentiveIcon,
  RentVsBuyIcon,
  ROIIcon,
  SalesValueIcon,
  ServiceCharge,
} from "@/public/svg/calculators";
import { MortgageInsightLogo, RentalInsightLogo } from "@/public/svg/insights";
import { IntroCardProps } from "@/types/introcard";

export const CalculatorsItems: IntroCardProps[] = [
  {
    title: "Sales Value Estimator",
    description:
      "Estimate current property sales value based on market trends and attributes.",
    linkto: "#",
    avatar: <SalesValueIcon />,
    avatarBg: "bg-[#F8CBDB]",
  },
  {
    title: "Rental Value Estimator",
    description:
      "Calculate the optimal rental price using property features and market benchmarks.",
    linkto: "#",
    avatar: <RentalInsightLogo />,
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    title: "Mortgage Payment Calculator",
    description:
      "Calculate mortgage payments, rates, and affordability for property financing.",
    linkto: "#",
    avatar: <MortgageInsightLogo />,
    avatarBg: "bg-[#F7CFB4]",
  },
  {
    title: "Investment ROI Estimator",
    description:
      "Estimate property investment returns and future profitability for better decision-making.",
    linkto: "#",
    avatar: <ROIIcon />,
    avatarBg: "bg-[#C5DCFF]",
  },
  {
    title: "Rent vs Buy Comparison Tool",
    description:
      "Compare financial benefits of renting versus buying a property over time.",
    linkto: "#",
    avatar: <RentVsBuyIcon />,
    avatarBg: "bg-[#F9F09D]",
  },
  {
    title: "Home Affordability Calculator",
    description:
      "Assess the budget and affordability of purchasing a property based on finances.",
    linkto: "#",
    avatar: <HomeAffIcon />,
    avatarBg: "bg-[#BAF1CA]",
  },
  {
    title: "Incentive Calculator",
    description:
      "Calculate agent incentives based on sales performance and targets.",
    linkto: "#",
    avatar: <IncentiveIcon />,
    avatarBg: "bg-[#C5DCFF]",
    soon: true,
  },
  {
    title: "Commission Goal Planner",
    description: "Set and plan commission goals to achieve earnings targets.",
    linkto: "#",
    avatar: <GoalPlannerIcon />,
    avatarBg: "bg-[#F8CBDB]",
    soon: true,
  },
  {
    title: "Service Charges Estimator",
    description:
      "Estimate service charges for different property types and locations.",
    linkto: "#",
    avatar: <ServiceCharge />,
    avatarBg: "bg-[#BAF1CA]",
    soon: true,
  },
];

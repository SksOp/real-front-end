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
    key: "sales_value_estimator",
    title: "Sales Value Estimator",
    description:
      "Estimate current property sales value based on market trends and attributes.",
    linkto: "/app/calculator/sales_value_estimator",
    avatar: <SalesValueIcon />,
    avatarBg: "bg-[#F8CBDB]",
  },
  {
    key: "rental_value_estimator",
    title: "Rental Value Estimator",
    description:
      "Calculate the optimal rental price using property features and market benchmarks.",
    linkto: "/app/calculator/rental_value_estimator",
    avatar: <RentalInsightLogo />,
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    key: "mortgage_payment_calculator",
    title: "Mortgage Payment Calculator",
    description:
      "Calculate mortgage payments, rates, and affordability for property financing.",
    linkto: "/app/calculator/mortgage_payment_calculator",
    avatar: <MortgageInsightLogo />,
    avatarBg: "bg-[#F7CFB4]",
  },
  {
    key: "investment_roi_calculator",
    title: "Investment ROI Estimator",
    description:
      "Estimate property investment returns and future profitability for better decision-making.",
    linkto: "/app/calculator/investment_roi_calculator",
    avatar: <ROIIcon />,
    avatarBg: "bg-[#C5DCFF]",
  },
  {
    key: "rent_vs_buy_comparison_tool",
    title: "Rent vs Buy Comparison Tool",
    description:
      "Compare financial benefits of renting versus buying a property over time.",
    linkto: "/app/calculator/rent_vs_buy_comparison_tool",
    avatar: <RentVsBuyIcon />,
    avatarBg: "bg-[#F9F09D]",
  },
  {
    key: "home_affordability_calculator",
    title: "Home Affordability Calculator",
    description:
      "Assess the budget and affordability of purchasing a property based on finances.",
    linkto: "/app/calculator/home_affordability_calculator",
    avatar: <HomeAffIcon />,
    avatarBg: "bg-[#BAF1CA]",
  },
  {
    key: "incentive_calculator",
    title: "Incentive Calculator",
    description:
      "Calculate agent incentives based on sales performance and targets.",
    linkto: "/app/calculator/incentive_calculator",
    avatar: <IncentiveIcon />,
    avatarBg: "bg-[#C5DCFF]",
    soon: true,
  },
  {
    key: "commission_goal_planner",
    title: "Commission Goal Planner",
    description: "Set and plan commission goals to achieve earnings targets.",
    linkto: "/app/calculator/commission_goal_planner",
    avatar: <GoalPlannerIcon />,
    avatarBg: "bg-[#F8CBDB]",
    soon: true,
  },
  {
    key: "service_charges_estimator",
    title: "Service Charges Estimator",
    description:
      "Estimate service charges for different property types and locations.",
    linkto: "/app/calculator/service_charges_estimator",
    avatar: <ServiceCharge />,
    avatarBg: "bg-[#BAF1CA]",
    soon: true,
  },
];

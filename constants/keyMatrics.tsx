import { KeyMatricsIcon } from "@/public/svg/home";
import { IntroCardProps } from "@/types/introcard";

export const SalesMatrices: IntroCardProps[] = [
  {
    key: "total_sales_value",
    title: "Total Sales Value",
    description:
      "Total market value of sales transactions, with growth compared to the previous period.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/total_sales_value",
  },
  {
    key: "average_sales_value",
    title: "Average Sales Value",
    description:
      "Average property sale price, including growth trends from the last period.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/average_sales_value",
  },
  {
    key: "average_price_per_sqft",
    title: "Average Price per Sqft",
    description:
      "Average property price per square foot, compared to previous periods.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/average_price_per_sqft",
  },
  {
    key: "number_of_transactions",
    title: "Number of Transactions",
    description:
      "Total sales transactions completed, with a growth indicator from prior periods.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
];

export const RentalsMatrices: IntroCardProps[] = [
  {
    key: "total_rental_value",
    title: "Total Rental Value",
    description:
      "Total market value of rental transactions, with growth compared to the previous period.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/total_rental_value",
  },
  {
    key: "average_rent_value",
    title: "Average Rent Value",
    description:
      "Average rental price across all properties, with a comparison to prior periods.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/average_rent_value",
  },
  {
    key: "number_of_rental_transactions",
    title: "Number of Rental Transactions",
    description:
      "Total number of rental agreements signed, with growth trends from previous periods.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
];

export const SupplyMatrices: IntroCardProps[] = [
  {
    title: "Total Rental Value",
    description:
      "Total market value of rental transactions, with growth compared to the previous period.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/total_rental_value",
  },
  {
    title: "Average Rent Value",
    description:
      "Average rental price across all properties, with a comparison to prior periods.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/average_rent_value",
  },
];

export const OffplanMatrices: IntroCardProps[] = [
  {
    title: "Total Rental Value",
    description:
      "Total market value of rental transactions, with growth compared to the previous period.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/total_rental_value",
  },
  {
    title: "Average Rent Value",
    description:
      "Average rental price across all properties, with a comparison to prior periods.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/average_rent_value",
  },
];

export const SalesIndexMatrices: IntroCardProps[] = [
  {
    title: "Total Rental Value",
    description:
      "Total market value of rental transactions, with growth compared to the previous period.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-matrics/total_rental_value",
  },
  {
    title: "Average Rent Value",
    description:
      "Average rental price across all properties, with a comparison to prior periods.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-matrics/average_rent_value",
  },
];

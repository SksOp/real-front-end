import { KeyMatricsIcon } from "@/public/svg/home";
import { IntroCardProps } from "@/types/introcard";

export const SalesMatrices: IntroCardProps[] = [
  {
    key: "total_sales_value",
    title: "Total Sales Value",
    description:
      "Total market value of all completed sales transactions, showcasing overall growth trends compared to prior periods.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/total_sales_value",
  },
  {
    key: "average_sales_value",
    title: "Average Sales Value",
    description:
      "Average price of properties sold, offering insights into pricing trends and market behavior across different periods.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/average_sales_value",
  },
  {
    key: "average_price_per_sqft",
    title: "Average Price per Sqft",
    description:
      "Average sales price per square foot, providing a detailed view of property value trends in different segments.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/average_price_per_sqft",
  },
  {
    key: "number_of_transactions",
    title: "Number of Transactions",
    description:
      "Total number of sales transactions finalized, with comparative analysis of growth trends from previous periods.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "transaction_type",
    title: "Transaction Type",
    description:
      "Distribution of transactions by payment method (Cash, Mortgage, or Gifts) for better market segmentation analysis.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "number_of_transactions",
    title: "Transactions Value Trend",
    description:
      "Yearly comparison of transaction values, with the option to drill down into monthly figures for finer granularity.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "number_of_transactions",
    title: "Number of Transactions Trend",
    description:
      "Yearly trend showcasing the volume of transactions, with detailed monthly breakdown to identify seasonal patterns.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "number_of_transactions",
    title: "Sales Price Index",
    description:
      "Index tracking price movements across affordable, mid-range, and luxury segments to understand long-term property valuation.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "number_of_transactions",
    title: "Sales Price Range Distribution",
    description:
      "Segmentation of properties by price ranges, highlighting the concentration of transactions in various market tiers.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "number_of_transactions",
    title: "Residential vs Commercial",
    description:
      "Proportion of transactions split between residential and commercial properties for broader market perspective.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "number_of_transactions",
    title: "First Sale vs Resale",
    description:
      "Distribution of transactions between new sales and resale properties, offering insights into buyer preferences.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "number_of_transactions",
    title: "Property Type (sales)",
    description:
      "Breakdown of sales by property types like villa, apartment, or land to understand market demand distribution.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "number_of_transactions",
    title: "Property Subtype Commercial Sales",
    description:
      "Segmentation of commercial units by subtypes or usage, providing detailed insights into the commercial property market.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "number_of_transactions",
    title: "Number of Bedrooms",
    description:
      "Distribution of residential units sold by the number of bedrooms, showing demand trends across property sizes.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "number_of_transactions",
    title: "Top 10 Areas by Sales",
    description:
      "List of top-performing areas contributing significantly to total market sales volume.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "number_of_transactions",
    title: "Volume of Mortgage Transactions",
    description:
      "Total number of sales transactions registered under mortgages, providing insights into financing trends.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-matrics/number_of_transactions",
  },
  {
    key: "number_of_transactions",
    title: "Value of Mortgage Transactions",
    description:
      "Total monetary value of mortgage-registered sales, highlighting the financial scale of the mortgage market.",
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
      "Combined market value of all rental transactions, with comparisons to previous periods for market performance insights.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/total_rental_value",
  },
  {
    key: "average_rent_value",
    title: "Average Rent Value",
    description:
      "Average rental price across properties, reflecting trends in leasing costs and demand changes over time.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/average_rent_value",
  },
  {
    key: "number_of_rental_transactions",
    title: "Number of Rental Transactions",
    description:
      "Total rental agreements completed, with growth trends compared to prior periods to analyze market dynamics.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Renewal Rate",
    description:
      "Percentage of leases renewed compared to new agreements, indicating tenant retention and market stability.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Rental Value Trend",
    description:
      "Yearly comparison of rental transaction values, with drilldown options for detailed monthly insights.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Rental Transactions Trend",
    description:
      "Trend of rental transactions over the years, showcasing market demand with detailed monthly breakdown.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Rental Price Range Distribution",
    description:
      "Segmentation of rental prices across ranges, providing insights into leasing trends by property value.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Residential vs Commercial Rentals",
    description:
      "Proportion of rental transactions divided between residential and commercial properties for market analysis.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Property Type Rentals",
    description:
      "Rental transactions categorized by property types like villas or apartments to gauge demand across property types.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Property Subtype (Commercial Rentals)",
    description:
      "Segmentation of rental units by subtypes (shop, office etc) for detailed insights into specific property features.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Top 10 areas by Rentals",
    description:
      "Leading areas contributing most to rental transactions, helping identify high-demand locations.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Rental Index Benchmark",
    description:
      "Rental index showcasing average rent values for affordable, medium, and luxury segments to guide pricing strategies.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
];

export const SupplyMatrices: IntroCardProps[] = [
  {
    key: "number_of_rental_transactions",
    title: "No of Projects (Supply)",
    description:
      "Total number of projects contributing to planned property supply in the market.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "No of Projects (Overall)",
    description:
      "Total number of active projects, including completed, ongoing, and planned developments.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Number of Villas",
    description:
      "Total number of villa properties available in the current market supply.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Number of Apartments/Units",
    description:
      "Aggregate count of apartment units available in the market across all projects.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Total Units",
    description:
      "Total number of units, including villas, apartments, and other property types in the market supply.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Properties Completion Rate (2024)",
    description:
      "Percentage of projects completed in 2024, providing insights into market progress.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Number of Yearly Completed Units",
    description:
      "Total count of units completed each year, showcasing annual property delivery trends.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Number of Yearly Launched Properties",
    description:
      "Total properties launched annually, reflecting market development activity.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Future Planned Supply",
    description:
      "Projects and units planned for completion starting from 2024 onwards.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Supply by Price Range",
    description:
      "Distribution of property supply by price ranges to understand market segmentation.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Future Property Supply per Area",
    description:
      "Forecasted supply of properties broken down by specific areas.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Delivered Units in Dubai per Area",
    description:
      "Count of units delivered across different areas of Dubai for regional performance analysis.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Total Developers",
    description:
      "Total number of active developers operating in the real estate market.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Planned Properties by Completion Percentage",
    description:
      "Visualization of planned projects by completion percentage for better tracking of market readiness.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
];

export const OffplanMatrices: IntroCardProps[] = [
  {
    key: "number_of_rental_transactions",
    title: "Monthly Property Sales Volume (Offplan vs Ready)",
    description:
      "Comparative analysis of monthly sales volume for offplan vs ready properties.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Volume of Property Sales in All Areas",
    description:
      "Distribution of property sales volume across various areas in the market.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Value of Property Sales in All Areas",
    description:
      "Total value of property sales broken down by areas, highlighting regional performance.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Sales Volume Proportion in All Areas",
    description:
      "Proportion of total sales volume distributed across different areas of the market.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Sales Value Proportion in All Areas",
    description:
      "Proportion of total sales value by area, showcasing high-value regions.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Offplan vs Ready Properties Price per SQFT",
    description:
      "Average price per square foot comparison for offplan vs ready properties.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Total Units Available",
    description:
      "Total number of available units in the market, including both offplan and ready properties.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Total Offplan Units Planned (in 2024)",
    description: "Number of offplan units planned for completion in 2024.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Total Offplan Units Planned (after 2024)",
    description: "Number of offplan units scheduled for completion after 2024.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Offplan Price Index",
    description:
      "Price index and benchmarks specific to offplan properties for market trend analysis.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Average Value (Villa)",
    description:
      "Average value of offplan villa units for better pricing guidance.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Average Value (Apartment)",
    description:
      "Total rental agreements completed, with growth trends compared to prior periods to analyze market dynamics.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Average Value by No. Of Bedrooms",
    description:
      "Average property value segmented by the number of bedrooms for targeted insights.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Average Price (Overall)",
    description:
      "Overall average price of residential offplan units across all types.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Average Price per SQFT (Villa)",
    description: "Average price per square foot for offplan villa units.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Average Price per SQFT (Apartment)",
    description: "Average price per square foot for offplan apartment units.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Average Price per SQFT (Overall))",
    description:
      "Average price per square foot for all residential offplan units.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
];

export const SalesIndexMatrices: IntroCardProps[] = [
  {
    key: "number_of_rental_transactions",
    title: "Sales Index (Apartments)",
    description:
      "Index tracking sales trends for apartments, compared to previous years and the base year 2012.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Sales Index (Villas)",
    description:
      "Index tracking sales trends for villas, compared to previous years and the base year 2012.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Sales Index (Overall)",
    description:
      "Overall index for sales trends across all property types, compared to previous years and the base year 2012.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Sales Index Value (Apartments)",
    description:
      "Indexed value for apartment sales prices, benchmarked against historical data.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Sales Index Value (Villas)",
    description:
      "Indexed value for villa sales prices, benchmarked against historical data.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
  {
    key: "number_of_rental_transactions",
    title: "Sales Index Value (Overall)",
    description:
      "Indexed value for overall sales prices across all property types, benchmarked against historical data.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-matrics/number_of_rental_transactions",
  },
];

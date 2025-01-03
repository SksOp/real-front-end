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
    linkto: "/app/key-metrics/total_sales_value",
  },
  {
    key: "average_sales_value",
    title: "Average Sales Value",
    description:
      "Average price of properties sold, offering insights into pricing trends and market behavior across different periods.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/average_sales_value",
  },
  {
    key: "average_price_per_sqft",
    title: "Average Price per Sqft",
    description:
      "Average sales price per square foot, providing a detailed view of property value trends in different segments.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/average_price_per_sqft",
  },
  {
    key: "number_of_transactions",
    title: "Number of Transactions",
    description:
      "Total number of sales transactions finalized, with comparative analysis of growth trends from previous periods.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/number_of_transactions",
  },
  {
    key: "transaction_type",
    title: "Transaction Type",
    description:
      "Distribution of transactions by payment method (Cash, Mortgage, or Gifts) for better market segmentation analysis.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/transaction_type",
  },
  {
    key: "transaction_value_trend",
    title: "Transactions Value Trend",
    description:
      "Yearly comparison of transaction values, with the option to drill down into monthly figures for finer granularity.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/transaction_value_trend",
  },
  {
    key: "number_of_transactions_trend",
    title: "Number of Transactions Trend",
    description:
      "Yearly trend showcasing the volume of transactions, with detailed monthly breakdown to identify seasonal patterns.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/number_of_transactions_trend",
  },
  {
    key: "sales_price_index",
    title: "Sales Price Index",
    description:
      "Index tracking price movements across affordable, mid-range, and luxury segments to understand long-term property valuation.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/sales_price_index",
  },
  {
    key: "sales_price_range_distribution",
    title: "Sales Price Range Distribution",
    description:
      "Segmentation of properties by price ranges, highlighting the concentration of transactions in various market tiers.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/sales_price_range_distribution",
  },
  {
    key: "residential_vs_commercial",
    title: "Residential vs Commercial",
    description:
      "Proportion of transactions split between residential and commercial properties for broader market perspective.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/residential_vs_commercial",
  },
  {
    key: "sale_type",
    title: "Sale Type (Freehold vs Leasehold)",
    description:
      "Proportion of freehold vs leasehold properties in the market.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/sale_type",
  },
  {
    key: "first_sale_vs_resale",
    title: "First Sale vs Resale",
    description:
      "Distribution of transactions between new sales and resale properties, offering insights into buyer preferences.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/first_sale_vs_resale",
  },
  {
    key: "property_type",
    title: "Property Type (sales)",
    description:
      "Breakdown of sales by property types like villa, apartment, or land to understand market demand distribution.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/property_type",
  },
  {
    key: "property_subtype_commercial",
    title: "Property Subtype Commercial Sales",
    description:
      "Segmentation of commercial units by subtypes or usage, providing detailed insights into the commercial property market.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/property_subtype_commercial",
  },
  {
    key: "property_subtype_residential",
    title: "Number of Bedrooms",
    description:
      "Distribution of residential units sold by the number of bedrooms, showing demand trends across property sizes.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/property_subtype_residential",
  },
  // {
  //   key: "number_of_transactions",
  //   title: "Top 10 Areas by Sales",
  //   description:
  //     "List of top-performing areas contributing significantly to total market sales volume.",
  //   avatar: <KeyMatricsIcon />,
  //   avatarBg: "bg-[#DDDAF9]",
  //   linkto: "/app/key-metrics/number_of_transactions",
  // },
  {
    key: "volume_of_mortgage_transactions",
    title: "Volume of Mortgage Transactions",
    description:
      "Total number of sales transactions registered under mortgages, providing insights into financing trends.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/volume_of_mortgage_transactions",
  },
  {
    key: "value_of_mortgage_transactions",
    title: "Value of Mortgage Transactions",
    description:
      "Total monetary value of mortgage-registered sales, highlighting the financial scale of the mortgage market.",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
    linkto: "/app/key-metrics/value_of_mortgage_transactions",
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
    linkto: "/app/key-metrics/total_rental_value",
  },
  {
    key: "average_rent_value",
    title: "Average Rent Value",
    description:
      "Average rental price across properties, reflecting trends in leasing costs and demand changes over time.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-metrics/average_rent_value",
  },
  {
    key: "number_of_rental_transactions",
    title: "Number of Rental Transactions",
    description:
      "Total rental agreements completed, with growth trends compared to prior periods to analyze market dynamics.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-metrics/number_of_rental_transactions",
  },
  {
    key: "renewal_ratio",
    title: "Renewal Rate",
    description:
      "Percentage of leases renewed compared to new agreements, indicating tenant retention and market stability.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-metrics/renewal_ratio",
  },
  {
    key: "rental_value_trend",
    title: "Rental Value Trend",
    description:
      "Yearly comparison of rental transaction values, with drilldown options for detailed monthly insights.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-metrics/rental_value_trend",
  },
  {
    key: "rental_transactions_trend",
    title: "Rental Transactions Trend",
    description:
      "Trend of rental transactions over the years, showcasing market demand with detailed monthly breakdown.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-metrics/rental_transactions_trend",
  },
  {
    key: "rental_price_range_distribution",
    title: "Rental Price Range Distribution",
    description:
      "Segmentation of rental prices across ranges, providing insights into leasing trends by property value.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-metrics/rental_price_range_distribution",
  },
  {
    key: "residential_vs_commercial_rental",
    title: "Residential vs Commercial Rentals",
    description:
      "Proportion of rental transactions divided between residential and commercial properties for market analysis.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-metrics/residential_vs_commercial_rental",
  },
  {
    key: "property_type_rental",
    title: "Property Type Rentals",
    description:
      "Rental transactions categorized by property types like villas or apartments to gauge demand across property types.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-metrics/property_type_rental",
  },
  {
    key: "property_subtype_rental",
    title: "Property Subtype (Commercial Rentals)",
    description:
      "Segmentation of rental units by subtypes (shop, office etc) for detailed insights into specific property features.",
    avatar: <KeyMatricsIcon stroke="#67612D" />,
    avatarBg: "bg-[#FBF4BB]",
    linkto: "/app/key-metrics/property_subtype_rental",
  },
  // {
  //   key: "number_of_rental_transactions",
  //   title: "Top 10 areas by Rentals",
  //   description:
  //     "Leading areas contributing most to rental transactions, helping identify high-demand locations.",
  //   avatar: <KeyMatricsIcon stroke="#67612D" />,
  //   avatarBg: "bg-[#FBF4BB]",
  //   linkto: "/app/key-metrics/number_of_rental_transactions",
  // },
  // {
  //   key: "number_of_rental_transactions",
  //   title: "Rental Index Benchmark",
  //   description:
  //     "Rental index showcasing average rent values for affordable, medium, and luxury segments to guide pricing strategies.",
  //   avatar: <KeyMatricsIcon stroke="#67612D" />,
  //   avatarBg: "bg-[#FBF4BB]",
  //   linkto: "/app/key-metrics/number_of_rental_transactions",
  // },
];

export const SupplyMatrices: IntroCardProps[] = [
  {
    key: "number_of_projects_supply",
    title: "No of Projects (Supply)",
    description:
      "Total number of projects contributing to planned property supply in the market.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/number_of_projects_supply",
  },
  {
    key: "number_of_projects_overall",
    title: "No of Projects (Overall)",
    description:
      "Total number of active projects, including completed, ongoing, and planned developments.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/number_of_projects_overall",
  },
  {
    key: "number_of_villas",
    title: "Number of Villas",
    description:
      "Total number of villa properties available in the current market supply.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/number_of_villas",
  },
  {
    key: "number_of_apartments",
    title: "Number of Apartments/Units",
    description:
      "Aggregate count of apartment units available in the market across all projects.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/number_of_apartments",
  },
  {
    key: "total_units",
    title: "Total Units",
    description:
      "Total number of units, including villas, apartments, and other property types in the market supply.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/total_units",
  },
  {
    key: "properties_completion_rate",
    title: "Properties Completion Rate (2024)",
    description:
      "Percentage of projects completed in 2024, providing insights into market progress.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/properties_completion_rate",
  },
  {
    key: "number_of_yearly_completed_units",
    title: "Number of Yearly Completed Units",
    description:
      "Total count of units completed each year, showcasing annual property delivery trends.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/number_of_yearly_completed_units",
  },
  {
    key: "number_of_yearly_launched_properties",
    title: "Number of Yearly Launched Properties",
    description:
      "Total properties launched annually, reflecting market development activity.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/number_of_yearly_launched_properties",
  },
  {
    key: "future_planned_supply",
    title: "Future Planned Supply",
    description:
      "Projects and units planned for completion starting from 2024 onwards.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/future_planned_supply",
  },
  {
    key: "supply_by_price_range",
    title: "Supply by Price Range",
    description:
      "Distribution of property supply by price ranges to understand market segmentation.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/supply_by_price_range",
  },
  {
    key: "future_property_supply_per_area",
    title: "Future Property Supply per Area",
    description:
      "Forecasted supply of properties broken down by specific areas.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/future_property_supply_per_area",
  },
  {
    key: "delivered_units_per_area_dubai",
    title: "Delivered Units in Dubai per Area",
    description:
      "Count of units delivered across different areas of Dubai for regional performance analysis.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/delivered_units_per_area_dubai",
  },
  {
    key: "total_developers",
    title: "Total Developers",
    description:
      "Total number of active developers operating in the real estate market.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/total_developers",
  },
  {
    key: "planed_properties_by_completion_percentage",
    title: "Planned Properties by Completion Percentage",
    description:
      "Visualization of planned projects by completion percentage for better tracking of market readiness.",
    avatar: <KeyMatricsIcon stroke="#3A7C4C" />,
    avatarBg: "bg-[#BAF1CA]",
    linkto: "/app/key-metrics/planed_properties_by_completion_percentage",
  },
];

export const OffplanMatrices: IntroCardProps[] = [
  {
    key: "monthly_properties",
    title: "Monthly Property Sales Volume (Offplan vs Ready)",
    description:
      "Comparative analysis of monthly sales volume for offplan vs ready properties.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/monthly_properties",
  },
  {
    key: "annual_properties_sales_volume",
    title: "Volume of Property Sales in All Areas",
    description:
      "Distribution of property sales volume across various areas in the market.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/annual_properties_sales_volume",
  },
  {
    key: "annual_properties_sales_value",
    title: "Value of Property Sales in All Areas",
    description:
      "Total value of property sales broken down by areas, highlighting regional performance.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/annual_properties_sales_value",
  },
  {
    key: "sales_volume_proportion",
    title: "Sales Volume Proportion in All Areas",
    description:
      "Proportion of total sales volume distributed across different areas of the market.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/sales_volume_proportion",
  },
  {
    key: "sales_value_proportion",
    title: "Sales Value Proportion in All Areas",
    description:
      "Proportion of total sales value by area, showcasing high-value regions.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/sales_value_proportion",
  },
  {
    key: "offplan_price_per_sqft",
    title: "Offplan vs Ready Properties Price per SQFT",
    description:
      "Average price per square foot comparison for offplan vs ready properties.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/offplan_price_per_sqft",
  },
  {
    key: "total_units_available",
    title: "Total Units Available",
    description:
      "Total number of available units in the market, including both offplan and ready properties.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/total_units_available",
  },
  {
    key: "total_offplan_units_planned_2024",
    title: "Total Offplan Units Planned (in 2024)",
    description: "Number of offplan units planned for completion in 2024.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/total_offplan_units_planned_2024",
  },
  {
    key: "total_offplan_units_planned_after2024",
    title: "Total Offplan Units Planned (after 2024)",
    description: "Number of offplan units scheduled for completion after 2024.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/total_offplan_units_planned_after2024",
  },
  {
    key: "offplan_price_index",
    title: "Offplan Price Index",
    description:
      "Price index and benchmarks specific to offplan properties for market trend analysis.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/offplan_price_index",
  },
  {
    key: "avg_value_villa",
    title: "Average Value (Villa)",
    description:
      "Average value of offplan villa units for better pricing guidance.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/avg_value_villa",
  },
  {
    key: "avg_value_units",
    title: "Average Value (Apartment)",
    description:
      "Total rental agreements completed, with growth trends compared to prior periods to analyze market dynamics.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/avg_value_units",
  },
  {
    key: "avg_value_rooms",
    title: "Average Value by No. Of Bedrooms",
    description:
      "Average property value segmented by the number of bedrooms for targeted insights.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/avg_value_rooms",
  },
  {
    key: "avg_price_overall",
    title: "Average Price (Overall)",
    description:
      "Overall average price of residential offplan units across all types.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/avg_price_overall",
  },
  {
    key: "avg_price_per_sqft_villa",
    title: "Average Price per SQFT (Villa)",
    description: "Average price per square foot for offplan villa units.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/avg_price_per_sqft_villa",
  },
  {
    key: "avg_value_units",
    title: "Average Price per SQFT (Apartment)",
    description: "Average price per square foot for offplan apartment units.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/avg_value_units",
  },
  {
    key: "avg_price_per_sqft_overall",
    title: "Average Price per SQFT (Overall))",
    description:
      "Average price per square foot for all residential offplan units.",
    avatar: <KeyMatricsIcon stroke="#305E85" />,
    avatarBg: "bg-[#B2D8F9]",
    linkto: "/app/key-metrics/avg_price_per_sqft_overall",
  },
];

export const SalesIndexMatrices: IntroCardProps[] = [
  {
    key: "flat_sales_index",
    title: "Sales Index (Apartments)",
    description:
      "Index tracking sales trends for apartments, compared to previous years and the base year 2012.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-metrics/flat_sales_index",
  },
  {
    key: "villa_sales_index",
    title: "Sales Index (Villas)",
    description:
      "Index tracking sales trends for villas, compared to previous years and the base year 2012.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-metrics/villa_sales_index",
  },
  {
    key: "overall_sales_index",
    title: "Sales Index (Overall)",
    description:
      "Overall index for sales trends across all property types, compared to previous years and the base year 2012.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-metrics/overall_sales_index",
  },
  {
    key: "flat_sales_value",
    title: "Sales Index Value (Apartments)",
    description:
      "Indexed value for apartment sales prices, benchmarked against historical data.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-metrics/flat_sales_value",
  },
  {
    key: "villa_sales_value",
    title: "Sales Index Value (Villas)",
    description:
      "Indexed value for villa sales prices, benchmarked against historical data.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-metrics/villa_sales_value",
  },
  {
    key: "overall_sales_value",
    title: "Sales Index Value (Overall)",
    description:
      "Indexed value for overall sales prices across all property types, benchmarked against historical data.",
    avatar: <KeyMatricsIcon stroke="#8C2A2A" />,
    avatarBg: "bg-[#FFDBDB]",
    linkto: "/app/key-metrics/overall_sales_value",
  },
];

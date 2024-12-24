import { BASE_URL } from "./constant";
import { PageFilter } from "./types";

export const SalesFilter: PageFilter[] = [
  {
    key: "group_en",
    label: "Transaction Type",
    options: ["Sales", "Mortgage", "Gifts"],
  },
  {
    key: "usage_en",
    label: "Usage",
    source: `${BASE_URL}/api/constants?type=usage_en`,
  },
  {
    key: "location",
    label: "Area",
    searchable: true,
    source: `${BASE_URL}/api/constants?type=location`,
  },
  {
    key: "property_type",
    label: "Property Type",
    source: `${BASE_URL}/api/constants?type=property_type`,
  },
  {
    key: "property_subtype",
    label: "Property Subtype",
    source: `${BASE_URL}/api/constants?type=property_subtype`,
  },
  {
    key: "resale_vs_first_sale",
    label: "Resale v/s First Sale",
    options: ["Resale", "First Sale"],
  },
  {
    key: "IS_OFFPLAN_EN",
    label: "Ready v/s Offplan",
    options: ["Ready", "Off-plan"],
  },
  {
    key: "IS_FREE_HOLD_EN",
    label: "Freehold v/s Leasehold",
    options: ["Freehold", "Non Free Hold"],
  },
  {
    key: "end_year",
    label: "Year",
    options: ["2024", "2023", "2022", "2021", "2020"],
  },
];

export const RentalFilter: PageFilter[] = [
  {
    key: "version_en", // Check only api/rental/ route
    label: "Rental Type",
    options: ["New", "Renew"],
  },
  {
    key: "usage_en", // check
    label: "Usage",
    source: `${BASE_URL}/api/constants?type=usage_rental`, //modified route call on backend changes usage_en to usage_rental
  },
  {
    key: "location", // check
    label: "Area",
    searchable: true,
    source: `${BASE_URL}/api/constants?type=location_rental`, //check
  },
  {
    key: "property_type",
    label: "Property Type",
    source: `${BASE_URL}/api/constants?type=property_type_rental`, // modified route call on backend changes property_type to property_type_rental
  },
  {
    key: "end_year",
    label: "Year",
    options: ["2024", "2023", "2022", "2021", "2020"],
  },
];

export const SupplyFilter: PageFilter[] = [
  {
    key: "location",
    label: "Area",
    searchable: true,
    source: `${BASE_URL}/api/constants?type=location_rental`,
  },
  {
    key: "start_date",
    label: "Project Start Year",
    options: ["2024", "2023", "2022", "2021", "2020"],
  },
  {
    key: "end_date",
    label: "Project End Year",
    options: ["2024", "2023", "2022", "2021", "2020"],
  },
  {
    key: "completion_date",
    label: "Completion Year",
    options: ["2024", "2023", "2022", "2021", "2020"],
  },
  {
    key: "completion_percentage",
    label: "Completion Percentage",
    options: ["0-20", "20-40", "40-60", "60-80", "80-100"],
  },
];

export const TransactionFilterOptions = [
  {
    key: "usage_en",
    label: "Usage",
    type: "radio",
    options: ["Residential", "Commercial"],
    is_mandatory: true,
  },

  {
    key: "property_type", //modified backend
    label: "Property Type",
    type: "dropdown",
    source: `${BASE_URL}/api/constants?type=property_type`,
    is_mandatory: true,
  },
  {
    key: "location", //check
    label: "Area",
    type: "dropdown",
    searchable: true,
    source: `${BASE_URL}/api/constants?type=location`,
    is_mandatory: true,
  },
];

export const ExploreFilterOptionsSales = [
  {
    key: "group_en",
    label: "Type",
    type: "radio",
    options: ["Sales", "Mortgage", "Gifts"],
  },
  {
    key: "usage_en",
    label: "Usage",
    source: `${BASE_URL}/api/constants?type=usage_en`,
  },
  {
    key: "location",
    label: "Area",
    type: "dropdown",
    searchable: true,
    source: `${BASE_URL}/api/constants?type=location`,
    is_mandatory: true,
  },
  {
    key: "property_type",
    label: "Property Type",
    type: "dropdown",
    source: `${BASE_URL}/api/constants?type=property_type`,
    is_mandatory: true,
  },
  {
    key: "rooms",
    label: "No. of Rooms",
    type: "dropdown",
    source: `${BASE_URL}/api/constants?type=rooms`,
  },
];

export const ExploreFilterOptionsRental = [
  {
    key: "version_en", // Check only api/rental/ route
    label: "Rental Type",
    type: "radio",
    options: ["New", "Renew", "All"],
  },
  {
    key: "usage_en",
    label: "Usage",
    source: `${BASE_URL}/api/constants?type=usage_rental`,
  },
  {
    key: "location",
    label: "Area",
    searchable: true,
    source: `${BASE_URL}/api/constants?type=location_rental`,
  },
  {
    key: "property_type",
    label: "Property Type",
    source: `${BASE_URL}/api/constants?type=property_type_rental`,
  },
];

import { PageFilter } from "./types";

export const SalesFilter: PageFilter[] = [
  {
    key: "group_en", //not on backend
    label: "Transaction Type",
    options: ["Sales", "Mortgage", "Gifts"],
  },
  {
    key: "usage_en", //fixed modified backend
    label: "Usage",
    source:
      "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage_en",
  },
  {
    key: "location", //check
    label: "Area",
    source:
      "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
  },
  {
    key: "property_type", //modified backend
    label: "Property Type",
    source:
      "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_type",
  },
  {
    key: "property_subtype", // added route ON BACKEND
    label: "Property Subtype",
    source:
      "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_subtype",
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
    source:
      "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=usage_rental", //modified route call on backend changes usage_en to usage_rental
  },
  {
    key: "location", // check
    label: "Area",
    source:
      "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental", //check
  },
  {
    key: "property_type",
    label: "Property Type",
    source:
      "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_type_rental", // modified route call on backend changes property_type to property_type_rental
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
    source:
      "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location_rental",
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

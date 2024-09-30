"use client";
import DataCards from "@/components/data-cards";
import SecondaryNavbar from "@/components/secondaryNavbar";
import { useRouter } from "next/navigation";
import React from "react";

const data = [
  {
    id: 1,
    title: "Sales Transactions Overview",
    description:
      "Analyze sales transactions, values, and trends across the Dubai property market.",
  },
  {
    id: 2,
    title: "Mortgage Transactions Analysis",
    description:
      "Insights into property purchases made using mortgage financing trends and details.",
  },
  {
    id: 3,
    title: "Gift Transactions Insights",
    description:
      "Track and analyze property transactions gifted, highlighting market behavior and trends.",
  },
  {
    id: 4,
    title: "Overall Market Transactions",
    description:
      "Comprehensive overview of all sales, mortgages, and gift property transactions.",
  },
  {
    id: 5,
    title: "Residential Sales Breakdown",
    description:
      "Analysis of residential property sales, including pricing, volumes, and market activity.",
  },
  {
    id: 6,
    title: "Commercial Sales Overview",
    description:
      "Track and analyze sales in the commercial property sector including offices and shops.",
  },
  {
    id: 7,
    title: "Rental Market Trends",
    description:
      "Overview of rental transactions and trends, showing market performance across Dubai.",
  },
  {
    id: 8,
    title: "Residential Rentals Analysis",
    description:
      "In-depth look into rental transactions for residential properties, including rates and trends.",
  },
  {
    id: 9,
    title: "Commercial Rentals Overview",
    description:
      "Analysis of commercial property rentals including warehouses, offices, and retail units.",
  },
  {
    id: 10,
    title: "Developer Sales Comparison",
    description:
      "Compare sales performance among Dubai's leading property developers.",
  },
  {
    id: 11,
    title: "Residential Index Overview",
    description:
      "Key metrics and index to track trends in residential property sales and rentals.",
  },
  {
    id: 12,
    title: "Commercial Index Overview",
    description:
      "Commercial property index tracking trends and performance across different sectors and areas.",
  },
  {
    id: 13,
    title: "Annual Performance Summary",
    description:
      "Annual overview of market performance, transactions, growth, and other vital metrics.",
  },
  {
    id: 14,
    title: "Supply Trends Dashboard",
    description:
      "Insights on property supply, including available inventory across various Dubai areas.",
  },
  {
    id: 15,
    title: "Top Performing Areas",
    description:
      "Discover high-performing areas based on transactions, demand, and property trends.",
  },
  {
    id: 16,
    title: "Offplan Market Insights",
    description:
      "Analysis of offplan property sales trends, developer performance, and future inventory.",
  },
];

function DashboardPage() {
  const router = useRouter();
  return (
    <SecondaryNavbar title="Dashboards">
      <div className="grid grid-cols-2 gap-3 px-3 pt-5 mt-12 mb-4">
        {data.map((card) => (
          <DataCards
            key={card.id}
            bgColor="bg-[#FFFEFA]"
            onClick={() => router.push(`/app/dashboard/${card.id}`)}
          >
            <h3 className="text-secondary font-semibold text-sm">
              {card.title}
            </h3>
            <p className="text-base text-muted-foreground font-normal leading-6">
              {card.description}
            </p>
          </DataCards>
        ))}
      </div>
    </SecondaryNavbar>
  );
}

export default DashboardPage;

"use client";
import HomeTransactionCard from "@/components/home-transaction-card";
import InsightDrawerView from "@/components/insightDrawerView";
import SecondaryNavbar from "@/components/secondaryNavbar";
import TransactionCard from "@/components/transaction-card";
import TransactionTabs from "@/components/transaction-tabs";
import TransactionTable from "@/components/transactionTable";
import Layout from "@/layout/secondary";
import React from "react";

function SalesTransactionPage() {
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  return (
    <Layout page="transactions" title="Sales Transactions">
      <div className="flex flex-col gap-3 px-3 py-20 md:hidden">
        <TransactionTabs tabs={["All", "Cash", "Mortgage"]} />
        <TransactionCard
          date={new Date("2024-07-25")}
          formattedValue={"3.5"}
          formattedPerSqFtWithUnits={"1546"}
          badges={["Sale", "Villa", "Residential", "OffPlan"]}
          AREA_EN={"Wonderlust, Wonderland"}
          ROOMS_EN={"3"}
          ACTUAL_AREA={2456}
          TRANS_VALUE={35099900}
          growth={21}
          tag="First"
        />
        <TransactionCard
          date={new Date("2024-07-25")}
          formattedValue={"3.5"}
          formattedPerSqFtWithUnits={"1546"}
          badges={["Sale", "Villa", "Residential", "OffPlan"]}
          AREA_EN={"Wonderlust, Wonderland"}
          ROOMS_EN={"3"}
          ACTUAL_AREA={2456}
          TRANS_VALUE={35099900}
          growth={21}
          tag="Resale"
        />
        <TransactionCard
          date={new Date("2024-07-25")}
          formattedValue={"3.5"}
          formattedPerSqFtWithUnits={"1546"}
          badges={["Sale", "Villa", "Residential", "OffPlan"]}
          AREA_EN={"Wonderlust, Wonderland"}
          ROOMS_EN={"3"}
          ACTUAL_AREA={2456}
          TRANS_VALUE={35099900}
          growth={21}
          tag="First"
        />
        <TransactionCard
          date={new Date("2024-07-25")}
          formattedValue={"3.5"}
          formattedPerSqFtWithUnits={"1546"}
          badges={["Sale", "Villa", "Residential", "OffPlan"]}
          AREA_EN={"Wonderlust, Wonderland"}
          ROOMS_EN={"3"}
          ACTUAL_AREA={2456}
          TRANS_VALUE={35099900}
          growth={21}
          tag="Resale"
        />
      </div>
      <div className="hidden md:flex w-full gap-3 px-3 py-20">
        <div className="w-2/3 flex flex-col gap-3">
          <HomeTransactionCard />
          <TransactionTable
            selectedRow={selectedRow}
            onRowSelect={(index) => setSelectedRow(index)}
            data={[
              {
                areaName: "Wonderlust, Wonderland",
                transactionAmount: "3.5",
                date: new Date("2024-07-25"),
                pricePerSqFt: "1546",
                badges: ["Sale", "Villa", "Residential", "OffPlan"],
                bathrooms: 3,
                bedrooms: 3,
                area: 2456,
                tag: "Sale",
              },
              {
                areaName: "Wonderlust, Wonderland",
                transactionAmount: "3.5",
                date: new Date("2024-07-25"),
                pricePerSqFt: "1546",
                badges: ["Sale", "Villa", "Residential", "OffPlan"],
                bathrooms: 3,
                bedrooms: 3,
                area: 2456,
                tag: "Rent",
              },
              {
                areaName: "Wonderlust, Wonderland",
                transactionAmount: "3.5",
                date: new Date("2024-07-25"),
                pricePerSqFt: "1546",
                badges: ["Sale", "Villa", "Residential", "OffPlan"],
                bathrooms: 3,
                bedrooms: 3,
                area: 2456,
                tag: "Sale",
              },
              {
                areaName: "Wonderlust, Wonderland",
                transactionAmount: "3.5",
                date: new Date("2024-07-25"),
                pricePerSqFt: "1546",
                badges: ["Sale", "Villa", "Residential", "OffPlan"],
                bathrooms: 3,
                bedrooms: 3,
                area: 2456,
                tag: "Rent",
              },
              {
                areaName: "Wonderlust, Wonderland",
                transactionAmount: "3.5",
                date: new Date("2024-07-25"),
                pricePerSqFt: "1546",
                badges: ["Sale", "Villa", "Residential", "OffPlan"],
                bathrooms: 3,
                bedrooms: 3,
                area: 2456,
                tag: "Sale",
              },
            ]}
          />
        </div>
        <div className="w-1/3">
          <InsightDrawerView />
        </div>
      </div>
    </Layout>
  );
}

export default SalesTransactionPage;

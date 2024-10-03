"use client";
import SecondaryNavbar from "@/components/secondaryNavbar";
import TransactionCard from "@/components/transaction-card";
import TransactionTabs from "@/components/transaction-tabs";
import React from "react";

function SalesTransactionPage() {
  return (
    <SecondaryNavbar title="Sales Transactions">
      <div className="flex flex-col gap-3 px-3 py-14">
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
    </SecondaryNavbar>
  );
}

export default SalesTransactionPage;

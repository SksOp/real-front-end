"use client";
import TransactionCard from "@/components/transaction-card";
import TransactionTabs from "@/components/transaction-tabs";
import Layout from "@/layout/secondary";
import React from "react";

function RentalTransactionPage() {
  return (
    <Layout page="transactions" title="Rental Transactions">
      <div className="flex flex-col gap-3 px-3 py-14">
        {/* <TransactionTabs tabs={["All", "New", "Renewal"]} />
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
          tag="Renew"
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
          tag="New"
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
          tag="Renew"
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
          tag="New"
        /> */}
      </div>
    </Layout>
  );
}

export default RentalTransactionPage;

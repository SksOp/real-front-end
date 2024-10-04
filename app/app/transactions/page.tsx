"use client";
import SecondaryNavbar from "@/components/secondaryNavbar";
import TransactionCard from "@/components/transaction-card";
import TransactionTabs from "@/components/transaction-tabs";
import React from "react";

function TransactionPage() {
  return (
    <SecondaryNavbar title="Transactions">
      <div className="flex flex-col gap-3 px-3 py-14">
        <TransactionTabs tabs={["Cash", "Mortgage"]} />
      </div>
    </SecondaryNavbar>
  );
}

export default TransactionPage;

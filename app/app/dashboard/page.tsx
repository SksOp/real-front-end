"use client";
import DataCards from "@/components/data-cards";
import SecondaryNavbar from "@/components/secondaryNavbar";
import { dashboards } from "@/config/dashboards";
import { useRouter } from "next/navigation";
import React from "react";

function DashboardPage() {
  const router = useRouter();
  return (
    <SecondaryNavbar title="Dashboards">
      <div className="grid grid-cols-2 gap-3 px-3 pt-16 mb-4">
        {dashboards.map((card) => (
          <DataCards
            key={card.key}
            bgColor="bg-[#FFFEFA]"
            onClick={() => router.push(`/app/dashboard/${card.key}`)}
          >
            <h3 className="text-secondary font-semibold text-sm">
              {card.name}
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

"use client";
import { KeyMatrices, Matrix } from "@/config/matrices";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import KeyMatricesCard from "./keyMatricesCard";
import Link from "next/link";
import { TabsContent } from "./ui/tabs";
import HomeMatrics from "./home-matrics";
import {
  OffplanMatrices,
  RentalsMatrices,
  SalesIndexMatrices,
  SalesMatrices,
  SupplyMatrices,
} from "@/constants/keyMatrics";
import { ClassValue } from "clsx";
import IntoCard from "./intoCard";
import KeyMatricsTrigger from "./key-matricsTrigger";
import { IntroCardProps } from "@/types/introcard";

function MatricesData({ className }: { className?: ClassValue }) {
  const { matrix } = useParams<{ matrix: string }>();
  const [selectedMatrix, setSelectedMatrix] = React.useState<Matrix | null>(
    KeyMatrices.find((m) => m.key === matrix) || null
  );
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") ?? "all";

  const createLink = (matrix: Matrix) => (
    <Link
      href={`/app/key-matrics/${matrix.key}?tab=${tab}`}
      onClick={() => setSelectedMatrix(matrix)}
    >
      <KeyMatricesCard
        key={matrix.key}
        title={matrix.title}
        description={matrix.description}
        tag={matrix.tag}
        className={
          selectedMatrix?.key === matrix.key
            ? "border border-secondary rounded-lg bg-[#FEF8F5] h-full"
            : "bg-[#FFFEFA] h-full"
        }
      />
    </Link>
  );

  const allMatrices = KeyMatrices.map((matrix) => createLink(matrix));

  const salesMatrices = KeyMatrices.filter(
    (matrix) => matrix.type === "sales"
  ).map((matrix) => createLink(matrix));

  const rentalsMatrices = KeyMatrices.filter(
    (matrix) => matrix.type === "rentals"
  ).map((matrix) => createLink(matrix));

  const supplyMatrices = KeyMatrices.filter(
    (matrix) => matrix.type === "supply"
  ).map((matrix) => createLink(matrix));

  const offplanMatrices = KeyMatrices.filter(
    (matrix) => matrix.type === "offplan"
  ).map((matrix) => createLink(matrix));

  const salesIndexMatrices = KeyMatrices.filter(
    (matrix) => matrix.type === "sales_index"
  ).map((matrix) => createLink(matrix));

  const filterMatrices = (type: string) => {
    if (type === "all") return KeyMatrices;
    return KeyMatrices.filter((matrix) => matrix.type === type);
  };

  const filteredMatrices = filterMatrices(tab);
  const tabNames: Record<string, string> = {
    all: "All Listings",
    sales: "Sales Listings",
    rentals: "Rentals Listings",
    supply: "Supply Listings",
    offplan: "OffPlan Listings",
    sales_index: "Sales Index Listings",
  };

  // const MatrixOpener = (item: IntroCardProps) => {
  //   <KeyMatricsTrigger matrix={item.key ?? "#"}>
  //     <IntoCard
  //       title={item.title}
  //       description={item.description}
  //       avatar={item.avatar}
  //       avatarBg={item.avatarBg}
  //       linkto={item.key ?? "#"}
  //       soon={item.soon}
  //     />
  //   </KeyMatricsTrigger>;
  // };

  return (
    <div className="w-full p-2">
      <TabsContent value="all" className={"flex flex-col gap-3 mt-0 "}>
        <HomeMatrics
          title="Sales Metrics"
          items={SalesMatrices}
          className={className}
        />
        <HomeMatrics
          title="Rental Metrics"
          items={RentalsMatrices}
          className={className}
        />
        <HomeMatrics
          title="Offplan Metrics"
          items={OffplanMatrices}
          className={className}
        />
        <HomeMatrics
          title="Supply Metrics"
          items={SupplyMatrices}
          className={className}
        />
        <HomeMatrics
          title="Index Metrics"
          items={SalesIndexMatrices}
          className={className}
        />
      </TabsContent>
      <TabsContent value="sales" className={"flex flex-col gap-3 mt-0 "}>
        <HomeMatrics
          title="Sales Metrics"
          items={SalesMatrices}
          className={className}
        />
      </TabsContent>

      <TabsContent value="rentals" className={"flex flex-col gap-3 mt-0 "}>
        <HomeMatrics
          title="Rental Metrics"
          items={RentalsMatrices}
          className={className}
        />
      </TabsContent>
      <TabsContent value="supply" className={"flex flex-col gap-3 mt-0 "}>
        <HomeMatrics
          title="Supply Metrics"
          items={SupplyMatrices}
          className={className}
        />
      </TabsContent>
      <TabsContent value="offplan" className={"flex flex-col gap-3 mt-0 "}>
        <HomeMatrics
          title="Offplan Metrics"
          items={OffplanMatrices}
          className={className}
        />
      </TabsContent>
      <TabsContent value="sales_index" className={"flex flex-col gap-3 mt-0 "}>
        <HomeMatrics
          title="Index Metrics"
          items={SalesIndexMatrices}
          className={className}
        />
      </TabsContent>
    </div>
  );
}

export default MatricesData;

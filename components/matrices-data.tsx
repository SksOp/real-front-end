"use client";
import { KeyMatrices, Matrix } from "@/config/matrices";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import KeyMatricesCard from "./keyMatricesCard";
import Link from "next/link";
import { TabsContent } from "./ui/tabs";

function MatricesData() {
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
          selectedMatrix?.key === matrix.key &&
          "border-2 border-secondary rounded-lg bg-[#FEF8F5]"
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

  return (
    <div className="w-full p-2">
      <h3 className="text-secondary font-semibold text-base pl-2 mb-2">
        {tabNames[tab]} ({filteredMatrices.length})
      </h3>
      <div className="w-full md:border rounded-xl p-2">
        <TabsContent value="all" className="flex flex-col  gap-3   mt-0">
          {allMatrices}
        </TabsContent>
        <TabsContent value="sales" className="flex flex-col  gap-3  mt-0">
          {salesMatrices}
        </TabsContent>

        <TabsContent value="rentals" className="flex flex-col  gap-3  mt-0">
          {rentalsMatrices}
        </TabsContent>
        <TabsContent value="supply" className="flex flex-col  gap-3   mt-0">
          {supplyMatrices}
        </TabsContent>
        <TabsContent value="offplan" className="flex flex-col  gap-3  mt-0">
          {offplanMatrices}
        </TabsContent>
        <TabsContent value="sales_index" className="flex flex-col  gap-3  mt-0">
          {salesIndexMatrices}
        </TabsContent>
      </div>
    </div>
  );
}

export default MatricesData;

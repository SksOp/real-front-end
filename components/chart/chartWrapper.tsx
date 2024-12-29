"use client";
import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toPng } from "html-to-image";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ClassValue } from "clsx";
import ChartException from "../chartException";
import EllipsisMenu from "../ellipsisMenu";
import { useRouter } from "next/navigation";

interface ChartWrapperProps {
  title: string;
  description?: string;
  filters?: string[];
  children?: React.ReactNode;
  viewAll?: boolean;
  className?: ClassValue;
}

function ChartWrapper({
  title,
  description,
  children,
  filters = [],
  viewAll = false,
  className,
}: ChartWrapperProps) {
  const router = useRouter();
  const chartRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (chartRef.current) {
      try {
        const dataUrl = await toPng(chartRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${title}.png`;
        link.click();
      } catch (error) {
        console.error("Failed to download chart:", error);
      }
    }
  };

  return (
    <Card
      className={cn(
        "border rounded-xl w-full bg-background px-4 py-5",
        className
      )}
    >
      <CardHeader className="p-0">
        <div className="flex justify-between items-center ">
          <CardTitle className="text-sm font-semibold text-secondary">
            {title}
          </CardTitle>
          <div className="flex justify-end items-center gap-2">
            {viewAll && (
              <span
                className="text-sm font-semibold text-primary cursor-pointer"
                onClick={() => router.push("/app/market-pulse")}
              >
                View All
              </span>
            )}
            <EllipsisMenu handleDownload={handleDownload} />
          </div>
        </div>
        <CardDescription className="text-base text-accent font-normal line-clamp-2">
          {description}
        </CardDescription>
        {filters?.length > 0 && (
          <Tabs defaultValue={filters[0]}>
            <TabsList className="w-full gap-3 items-center overflow-scroll justify-start bg-background mb-4">
              {filters.map((filter) => (
                <TabsTrigger
                  value={filter}
                  key={filter}
                  className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  {filter}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </CardHeader>
      <CardContent ref={chartRef} className="w-full p-0 mt-2 overflow-x-scroll">
        {children ?? <ChartException />}
      </CardContent>
    </Card>
  );
}

export default ChartWrapper;

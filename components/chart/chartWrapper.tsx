"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ClassValue } from "clsx";
import {
  DownloadIcon,
  Ellipsis,
  InfoIcon,
  ShareIcon,
} from "@/public/svg/Indicator";
import ChartException from "../chartException";
import EllipsisMenu from "../ellipsisMenu";

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
              <span className="text-sm font-semibold text-primary cursor-pointer">
                View All
              </span>
            )}
            <EllipsisMenu />
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
      <CardContent className="w-full p-0 mt-2 overflow-x-scroll">
        {children ?? <ChartException />}
      </CardContent>
    </Card>
  );
}

export default ChartWrapper;

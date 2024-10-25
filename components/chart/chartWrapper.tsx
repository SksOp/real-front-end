"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
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
  const defaultView = (
    <div className="flex flex-col gap-6 justify-center items-center">
      <Image
        src="/imgs/exception.png"
        width={120}
        height={120}
        className="object-cover"
        alt={"exception"}
      />
      <span className="text-muted-foreground text-center">
        No data available!
      </span>
    </div>
  );

  return (
    <Card
      className={cn(
        "border rounded-xl w-full bg-background px-4 py-5",
        className
      )}
    >
      <CardHeader className="p-0">
        <div className="flex justify-between items-center ">
          <CardTitle className="text-base font-semibold text-secondary">
            {title}
          </CardTitle>
          <div className="flex justify-end items-center gap-2">
            {viewAll && (
              <span className="text-primary font-semibold text-sm">
                View All
              </span>
            )}
            <span className="flex items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <DownloadIcon className="mr-2" />
                    <span className="text-sm text-muted-foreground font-medium">
                      Download
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShareIcon className="mr-2 " />
                    <span className="text-sm text-muted-foreground font-medium">
                      Share
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <InfoIcon className="mr-2 " />
                    <span className="text-sm text-muted-foreground font-medium">
                      Info
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </div>
        </div>
        <CardDescription className="text-sm text-accent font-normal">
          {description}
        </CardDescription>
        {filters.length > 0 && (
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

              {/* <div className="flex space-x-2 py-2 w-full overflow-scroll">
                {filters.map((filter) => (
                  <div
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={cn(
                      "h-10 px-4 py-2 rounded-full border border-input bg-background  whitespace-nowrap ",
                      selectedFilter === filter && "bg-secondary text-white"
                    )}
                  >
                    {filter}
                  </div>
                ))}
              </div> */}
            </TabsList>
          </Tabs>
        )}
      </CardHeader>
      <CardContent className="w-full p-0 mt-2 overflow-x-scroll">
        {children ?? defaultView}
      </CardContent>
    </Card>
  );
}

export default ChartWrapper;

"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Download, Ellipsis, Info, Share2 } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ChartWrapperProps {
  title: string;
  description?: string;
  filters?: string[];
  children?: React.ReactNode;
  viewAll?: boolean;
}

function ChartWrapper({
  title,
  description,
  children,
  filters = [],
  viewAll = false,
}: ChartWrapperProps) {
  const [selectedFilter, setSelectedFilter] = useState(filters[0] ?? "");

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
    <Card className="border-2 rounded-xl w-full bg-background">
      <CardHeader>
        <div className="flex justify-between items-center ">
          <CardTitle className="text-base font-bold text-secondary">
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
                <DropdownMenuTrigger asChild>
                  <Ellipsis size={24} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download size={22} className="mr-2" />
                    <span className="text-sm">Download</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 size={22} className="mr-2 " />
                    <span className="text-sm">Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Info size={22} className="mr-2 " />
                    <span className="text-sm">Info</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
        {filters.length > 0 && (
          <div className="flex space-x-2 py-2 w-full overflow-scroll">
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
          </div>
        )}
      </CardHeader>
      <CardContent className="w-full px-4">
        {children ?? defaultView}
      </CardContent>
    </Card>
  );
}

export default ChartWrapper;
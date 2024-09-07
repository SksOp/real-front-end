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
  isFilter?: boolean;
  children?: React.ReactNode;
}

function ChartWrapper({
  title,
  description,
  children,
  isFilter = true,
}: ChartWrapperProps) {
  const [selectedFilter, setSelectedFilter] = useState("Monthly");

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
    <Card className="border-0 w-full bg-background">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-secondary">
            {title}
          </CardTitle>
          <span className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download size={22} className="mr-2" />
                  <span className="text-base">Download</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 size={22} className="mr-2 " />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Info size={22} className="mr-2 " />
                  <span>Info</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>
        <CardDescription className="text-base text-muted-foreground">
          {description}
        </CardDescription>
        {isFilter && (
          <div className="flex space-x-2 p-2 w-full">
            {["Monthly", "Quarterly", "Yearly"].map((filter) => (
              <div
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={cn(
                  "h-10 px-4 py-2 rounded-full border border-input bg-background  hover:text-accent-foreground",
                  selectedFilter === filter && "bg-primary/20"
                )}
              >
                {filter}
              </div>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="w-full">{children ?? defaultView}</CardContent>
    </Card>
  );
}

export default ChartWrapper;

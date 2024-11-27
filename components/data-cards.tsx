import React from "react";
import { Card, CardDescription, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";
import { Drawer, DrawerTrigger } from "./ui/drawer";
import { Badge } from "./ui/badge";

interface DataCardsProps {
  children?: React.ReactNode;
  description?: string;
  bgColor?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  tag?: string;
  className?: string;
}

function DataCards({
  children,
  description,
  onClick,
  tag,
  className,
}: DataCardsProps) {
  return (
    <Card
      className={cn("border rounded-xl w-full p-4 ", className)}
      onClick={onClick}
    >
      {tag === "upcoming" && (
        <Badge
          variant={"outline"}
          className="bg-[#584DCB] text-white px-2 py-1 mb-1"
        >
          Coming Soon!
        </Badge>
      )}

      <CardHeader className="w-full flex flex-col md:gap-3 p-0">
        {children}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default DataCards;

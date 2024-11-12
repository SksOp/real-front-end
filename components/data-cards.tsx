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
}

function DataCards({
  children,
  description,
  bgColor = "bg-card",
  onClick,
  tag,
}: DataCardsProps) {
  return (
    <Card
      className={cn("border rounded-xl w-full p-3 ", bgColor)}
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

      <CardHeader className="w-full p-0">
        {children}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default DataCards;

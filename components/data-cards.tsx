import React from "react";
import { Card, CardDescription, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";
import { Drawer, DrawerTrigger } from "./ui/drawer";

interface DataCardsProps {
  children?: React.ReactNode;
  description?: string;
  bgColor?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function DataCards({
  children,
  description,
  bgColor = "bg-card",
  onClick,
}: DataCardsProps) {
  return (
    <Card
      className={cn("border-2 rounded-xl w-full p-0 ", bgColor)}
      onClick={onClick}
    >
      <CardHeader className="w-full p-3">
        {children}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default DataCards;

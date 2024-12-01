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
          className="bg-[#58AAF2] text-white text-sm font-medium px-3 py-[0.313rem] mb-1"
        >
          Soon
        </Badge>
      )}

      <CardHeader className="w-full flex flex-col  p-0">
        {children}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default DataCards;

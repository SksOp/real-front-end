import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import {
  AreaSizeIcon,
  BathIcon,
  BedIcon,
  LocationIcon,
} from "@/public/svg/icons";
import { Badge } from "./ui/badge";

function TransactionCard() {
  return (
    <Card className="border-0">
      <CardHeader>
        <p className="text-muted-foreground font-bold">25 Jul/2024</p>
        <h1 className="text-xl text-secondary font-bold ">
          AED 350,99900{" "}
          <span className="text-muted-foreground text-lg font-bold">
            (1546 per sq. ft)
          </span>
        </h1>
        <div className="flex justify-start gap-2 items-center">
          <LocationIcon />
          <p className="text-muted-foreground">Wonderlust, Wonderland</p>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex justify-start gap-4 items-center w-full">
          <Badge
            className="bg-muted text-muted-foreground font-medium text-sm"
            variant={"outline"}
          >
            Sale
          </Badge>
          <Badge
            className="bg-muted text-muted-foreground font-medium text-sm"
            variant={"outline"}
          >
            Villa
          </Badge>
          <Badge
            className="bg-muted text-muted-foreground font-medium text-sm"
            variant={"outline"}
          >
            Residential
          </Badge>
          <Badge
            className="bg-muted text-muted-foreground font-medium text-sm"
            variant={"outline"}
          >
            OffPlan
          </Badge>
        </div>
        <div className="flex justify-start gap-4 items-center w-full">
          <div className="flex justify-center items-center gap-1">
            <BedIcon />
            <p className="text-muted-foreground">3 Bedrooms</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <BathIcon />
            <p className="text-muted-foreground">2 Bathroom</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <AreaSizeIcon />
            <p className="text-muted-foreground">2456 sqft</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default TransactionCard;

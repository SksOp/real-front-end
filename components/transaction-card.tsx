import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import {
  AreaSizeIcon,
  BathIcon,
  BedIcon,
  LocationIcon,
} from "@/public/svg/icons";
import { Badge } from "./ui/badge";
import { TransactionCardProps } from "@/types/transactionCard";

const TransactionCard: React.FC<TransactionCardProps> = ({
  date,
  price,
  pricePerSqFt,
  location,
  badges,
  bedrooms,
  bathrooms,
  areaSize,
}) => {
  return (
    <Card className="border-0">
      <CardHeader>
        <p className="text-muted-foreground font-bold">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <h1 className="text-xl text-secondary font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "AED",
          }).format(price)}{" "}
          <span className="text-muted-foreground text-lg font-bold">
            ({pricePerSqFt} per sq. ft)
          </span>
        </h1>
        <div className="flex justify-start gap-2 items-center">
          <LocationIcon />
          <p className="text-muted-foreground">{location}</p>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex justify-start gap-4 items-center w-full">
          {badges.map((badge, index) => (
            <Badge
              key={index}
              className="bg-muted text-muted-foreground font-medium text-sm"
              variant={"outline"}
            >
              {badge}
            </Badge>
          ))}
        </div>
        <div className="flex justify-start gap-4 items-center w-full">
          <div className="flex justify-center items-center gap-1">
            <BedIcon />
            <p className="text-muted-foreground">{bedrooms} Bedrooms</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <BathIcon />
            <p className="text-muted-foreground">{bathrooms} Bathroom</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <AreaSizeIcon />
            <p className="text-muted-foreground">{areaSize} sqft</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TransactionCard;

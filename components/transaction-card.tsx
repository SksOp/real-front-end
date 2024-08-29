import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import {
  AreaSizeIcon,
  BathIcon,
  BedIcon,
  LocationIcon,
} from "@/public/svg/icons";
import { Badge } from "./ui/badge";
import { LastFiveTransactionprops } from "@/types/transactionCard";

function formatNumber(value: number): number {
  if (value >= 1_000_000_000) {
    return value / 1_000_000_000;
  } else if (value >= 1_000_000) {
    return value / 1_000_000;
  } else if (value >= 1_000) {
    return value / 1_000;
  } else {
    return value;
  }
}

const TransactionCard: React.FC<LastFiveTransactionprops> = ({ ...props }) => {
  const formattedValue = formatNumber(Number(props.TRANS_VALUE));
  const formattedPerSqFt = (
    Number(props.TRANS_VALUE) / Number(props.ACTUAL_AREA)
  ).toFixed(1);

  const date = props.INSTANCE_DATE.value;
  console.log(props.INSTANCE_DATE);

  return (
    <Card className="border-0">
      <CardHeader>
        <p className="text-muted-foreground font-bold">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <h1 className="text-xl text-secondary font-bold ">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "AED",
          }).format(Number(formattedValue))}
          {Number(props.TRANS_VALUE) > 1_000_000_000
            ? "B"
            : Number(props.TRANS_VALUE) > 1_000_000
            ? "M"
            : "K"}
          <span className="text-muted-foreground text-lg font-bold mx-1">
            ({formattedPerSqFt} per sq. m)
          </span>
        </h1>
        <div className="flex justify-start gap-2 items-center">
          <LocationIcon />
          <p className="text-muted-foreground">{props.AREA_EN}</p>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex justify-start gap-4 items-center w-full">
          {/* {badges.map((badge, index) => (
            <Badge
              key={index}
              className="bg-muted text-muted-foreground font-medium text-sm"
              variant={"outline"}
            >
              {badge}
            </Badge>
          ))} */}
        </div>
        <div className="flex justify-start gap-4 items-center w-full">
          <div className="flex justify-center items-center gap-1">
            <BedIcon />
            <p className="text-muted-foreground ">{props.ROOMS_EN} Bedrooms</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <AreaSizeIcon />
            <p className="text-muted-foreground ">{props.ACTUAL_AREA} sqft</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TransactionCard;

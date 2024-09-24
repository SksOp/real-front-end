import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import {
  AreaSizeIcon,
  BathIcon,
  BedIcon,
  LocationIcon,
} from "@/public/svg/icons";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { CircularDownIcon, CircularUpIcon } from "@/public/svg/Indicator";
// import { LastFiveTransactionprops } from "@/types/transactionCard";

// function formatNumber(value: number): number {
//   if (value >= 1_000_000_000) {
//     return value / 1_000_000_000;
//   } else if (value >= 1_000_000) {
//     return value / 1_000_000;
//   } else if (value >= 1_000) {
//     return value / 1_000;
//   } else {
//     return value;
//   }
// }

// function formatValueWithUnits(value: number): string {
//   const formattedValue = formatNumber(value);
//   if (value >= 1_000_000_000) {
//     return `${formattedValue.toFixed(2)}B`;
//   } else if (value >= 1_000_000) {
//     return `${formattedValue.toFixed(2)}M`;
//   } else if (value >= 1_000) {
//     return `${formattedValue.toFixed(2)}K`;
//   } else {
//     return `${formattedValue}`;
//   }
// }

// function convertToPerSqFt(perSqMeterValue: number): number {
//   const sqMeterToSqFt = 10.7639; // Conversion factor from square meters to square feet
//   return perSqMeterValue / sqMeterToSqFt;
// }

interface TransactionCardProps {
  date: Date;
  formattedValue: string;
  formattedPerSqFtWithUnits: string;
  badges: string[];
  AREA_EN: string;
  ROOMS_EN: string;
  ACTUAL_AREA: number;
  TRANS_VALUE: number;
  growth: number;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ ...props }) => {
  // const formattedValue = formatNumber(Number(props.TRANS_VALUE));
  // const formattedPerSqMeter =
  //   Number(props.TRANS_VALUE) / Number(props.ACTUAL_AREA);
  // const formattedPerSqFt = convertToPerSqFt(formattedPerSqMeter);
  // const formattedPerSqFtWithUnits = formatValueWithUnits(formattedPerSqFt);

  // const date = props.INSTANCE_DATE.value;

  // const badges = [
  //   props.IS_OFFPLAN ? "OffPlan" : "Ready",
  //   props.USAGE_EN,
  //   props.PROP_TYPE_EN,
  // ];

  return (
    <Card className="relative border rounded-2xl bg-background w-full p-3 flex flex-col gap-3">
      <CardHeader className="p-0 flex flex-col gap-1">
        {/* <p className="text-muted-foreground font-bold">
          {new Date(props.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p> */}
        <div className="flex justify-between items-center ">
          <h3 className="text-xs font-semibold text-secondary">
            {new Date(props.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h3>
          <div
            className={cn(
              "px-2  h-5 text-xs absolute pt-[0.1rem] font-normal right-0 text-white rounded-l-full",
              "bg-[#8177E5]"
            )}
          >
            Resale
          </div>
        </div>
        <h1 className="text-secondary text-sm font-semibold flex gap-1 items-center justify-start">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "AED",
          }).format(Number(props.formattedValue))}
          {Number(props.TRANS_VALUE) > 1_000_000_000
            ? "B"
            : Number(props.TRANS_VALUE) > 1_000_000
            ? "M"
            : "K"}
          <span className="text-muted-foreground text-sm font-medium ">
            ({props.formattedPerSqFtWithUnits} per sq. ft)
          </span>
          {props.growth > 0 ? (
            <div className="flex items-center justify-start gap-0.5">
              <CircularUpIcon className="h-4 w-4" />
              <p className="text-green-600 font-medium text-xs">
                {props.growth}%
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-start gap-0.5">
              <CircularDownIcon className="h-4 w-4" />
              <p className="text-red-600 font-medium text-xs">
                {-props.growth}%
              </p>
            </div>
          )}
        </h1>
        <div className="flex justify-start gap-2 items-center">
          <LocationIcon />
          <p className="text-muted-foreground text-xs font-normal">
            {props.AREA_EN}
          </p>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2 p-0 w-full">
        <div className="flex justify-start gap-1 items-center w-full">
          {props.badges.map((badge, index) => (
            <Badge
              key={index}
              className="bg-card border-0 py-0.5 px-2 text-muted-foreground font-normal text-xs"
              variant={"outline"}
            >
              {badge}
            </Badge>
          ))}
        </div>
        <div className="flex w-full justify-start items-center gap-6 ">
          <div className="flex gap-1 justify-start items-center">
            <BedIcon className="w-4 h-4" />
            <p className="text-muted-foreground font-normal text-xs">
              {props.ROOMS_EN}{" "}
            </p>
          </div>
          <div className="flex gap-1 justify-start items-center">
            <BathIcon className="w-4 h-4" />
            <p className="text-muted-foreground font-normal text-xs">
              {props.ROOMS_EN}{" "}
            </p>
          </div>

          <div className="flex gap-1 justify-start items-center">
            <AreaSizeIcon className="w-[0.8rem] h-[0.8rem]" />
            <p className="text-muted-foreground font-normal text-xs">
              {1456} sqft
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TransactionCard;

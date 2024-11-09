import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  AreaSizeIcon,
  BathIcon,
  BedIcon,
  LocationIcon,
} from "@/public/svg/icons";
import { PropertiescardProps } from "@/types/propertyCard";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  }).format(price);
}

function PropertiesCard({
  imageUrl,
  name,
  location,
  bedrooms,
  bathrooms,
  area,
  price,
  className,
}: PropertiescardProps) {
  return (
    <Card
      className={cn(
        "flex justify-start relative gap-3 border rounded-2xl bg-background w-full p-3",
        className
      )}
    >
      <CardHeader className="p-0">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover rounded-xl w-full h-full min-w-20 "
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 justify-around p-0 ">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center ">
            <h3 className="text-sm font-semibold text-secondary max-w-44 truncate">
              {name}
            </h3>
            <div
              className={cn(
                "px-2  h-5 text-xs absolute pt-[0.1rem] font-normal right-0 text-white rounded-l-full",
                "bg-[#8177E5]"
              )}
            >
              Sale
            </div>
          </div>
          <div className="flex justify-start text-sm items-center gap-1">
            <LocationIcon className="w-4 h-4" />
            <p className="text-muted-foreground text-xs font-normal max-w-[12rem] truncate">
              {location}
            </p>
          </div>
          <div className="flex gap-1 w-full overflow-x-scroll">
            {["Villa", "Residential", "Off plan"].map((tag, index) => (
              <Badge
                variant={"outline"}
                className="bg-card text-xs font-normal text-muted-foreground py-0.5 px-2 border-0"
                key={index}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap justify-start items-center gap-6 text-muted-foreground text-bold ">
            <div className="flex gap-1 justify-start items-center">
              <BedIcon className="w-4 h-4" />
              <p className="text-muted-foreground font-normal text-xs">
                {bedrooms}{" "}
              </p>
            </div>
            <div className="flex gap-1 justify-start items-center">
              <BathIcon className="w-4 h-4" />
              <p className="text-muted-foreground font-normal text-xs">
                {bathrooms}{" "}
              </p>
            </div>

            <div className="flex gap-1 justify-start items-center">
              <AreaSizeIcon className="w-[0.8rem] h-[0.8rem]" />
              <p className="text-muted-foreground font-normal text-xs">
                {formatPrice(area)} sqft
              </p>
            </div>
          </div>
        </div>
        <Separator className="m-0 p-0" />
        <h3 className="text-sm   font-semibold text-secondary ">
          {formatPrice(price)}{" "}
          <span className="text-xs font-semibold text-muted-foreground">
            AED
          </span>
        </h3>
      </CardContent>
    </Card>
  );
}

export default PropertiesCard;

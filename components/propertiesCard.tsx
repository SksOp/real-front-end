import React from "react";
import { Card } from "./ui/card";
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
}: PropertiescardProps) {
  return (
    <Card className="flex justify-start relative gap-4 border rounded-2xl bg-background w-full p-4">
      <div className="">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover rounded-xl w-24 h-full"
        />
      </div>
      <div className="flex  flex-col gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center ">
            <h3 className="text-base font-semibold text-secondary">{name}</h3>
            <div
              className={cn(
                "px-3  h-6 text-sm absolute pt-[0.15rem] font-normal right-0 text-white rounded-l-full",
                "bg-[#8177E5]"
              )}
            >
              Sale
            </div>
          </div>
          <div className="flex justify-start text-sm items-center gap-1">
            <LocationIcon className="w-4 h-4" />
            <p className="text-muted-foreground text-sm font-normal">
              {location}
            </p>
          </div>
          <div className="flex gap-1 w-full overflow-x-scroll">
            {["Villa", "Residential", "Off plan"].map((tag, index) => (
              <Badge
                variant={"outline"}
                className="bg-card text-xs font-normal py-1 px-2"
                key={index}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap justify-start items-center gap-6 text-muted-foreground text-bold mt-2">
            <div className="flex gap-1 justify-start items-center">
              <BedIcon className="w-4 h-4" />
              <p className="text-muted-foreground font-normal text-sm">
                {bedrooms}{" "}
              </p>
            </div>
            <div className="flex gap-1 justify-start items-center">
              <BathIcon className="w-4 h-4" />
              <p className="text-muted-foreground font-normal text-sm">
                {bathrooms}{" "}
              </p>
            </div>

            <div className="flex gap-1 justify-start items-center">
              <AreaSizeIcon className="w-[0.8rem] h-[0.8rem]" />
              <p className="text-muted-foreground font-normal text-sm">
                {0} sqft
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <h3 className="text-base   font-semibold text-secondary ">
          {formatPrice(price)}{" "}
          <span className="text-sm font-semibold text-muted-foreground">
            AED
          </span>
        </h3>
      </div>
    </Card>
  );
}

export default PropertiesCard;

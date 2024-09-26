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
  bedrooms,
  bathrooms,
  area,
  price,
}: ListingDataType) {
  // console.log(location);
  return (
    <Card className="flex justify-start relative gap-3 border rounded-2xl bg-background w-full p-3">
      <CardHeader className="p-0">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover rounded-xl w-24 h-full"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 justify-around p-0 ">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center ">
            <h3 className="text-sm font-semibold text-secondary">{name}</h3>
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
            <p>{location}</p>
          </div>
          <div className="flex flex-wrap justify-start items-center gap-6 text-muted-foreground text-bold ">
            <div className="flex gap-1 justify-start items-center">
              <BedIcon className="w-4 h-4" />
              <p>{bedrooms}</p>
            </div>
            <div className="flex gap-1 justify-start items-center">
              <BathIcon className="w-4 h-4" />
              <p>{bathrooms}</p>
            </div>

            <div className="flex gap-1 justify-start items-center">
              <AreaSizeIcon className="w-[0.9rem] h-[0.9rem]" />
              <p>{area}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-base font-extrabold">{price}</h3>
          {/* <Drawer> */}
          <div>
            {/* <DrawerTrigger asChild> */}
            <Button
              variant={"ghost"}
              className="flex justify-end items-center gap-2 p-0 cursor-pointer"
            >
              <LightBulbIcon className="w-5 h-5" />
              <span className="text-primary text-sm font-semibold">
                See Insights
              </span>
            </Button>
            {/* </DrawerTrigger> */}
          </div>
          {/* <DrawerContent>
              <InsightDrawerView />
            </DrawerContent>
          </Drawer> */}
        </div>
      </div>
    </Card>
  );
}

export default PropertiesCard;

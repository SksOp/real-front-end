import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import {
  AreaSizeIcon,
  BathIcon,
  BedIcon,
  LocationIcon,
  RedirectIcon,
} from "@/public/svg/icons";
import Image from "next/image";
import { UpIcon } from "@/public/svg/Indicator";

interface PropertyHeaderProps {
  imageURL: string;
  title: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  price: string;
}

function PropertyHeader({
  imageURL,
  title,
  location,
  bedrooms,
  bathrooms,
  area,
  price,
}: PropertyHeaderProps) {
  return (
    <Card className="border-0 p-0 w-full bg-background ">
      <CardHeader className="relative px-0 pb-2 ">
        <div className="relative w-full ">
          <Image
            src={imageURL}
            className="object-cover w-full  rounded-t-xl"
            height={200}
            width={400}
            alt=""
          />
          <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent ">
            <h3 className="text-white text-base font-semibold">{title}</h3>
            <div className="flex items-center gap-2">
              <LocationIcon fill="white" />
              <p className="text-white text-xs">{location}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-3 border-0 p-0 justify-center items-start">
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center gap-1">
            <BedIcon className="w-4 h-4" />
            <p className="text-accent text-xs font-medium">
              {bedrooms} Bedrooms
            </p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <BathIcon className="w-4 h-4" />
            <p className="text-accent text-xs font-medium">
              {bathrooms} Bathrooms
            </p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <AreaSizeIcon className="w-3 h-3" />
            <p className="text-accent text-xs font-medium">{area} sqft</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <h1 className="text-xl font-bold">{price}</h1>
          <div className="flex justify-start items-center gap-1">
            <UpIcon />
            <span className="text-green-600 font-medium text-xs ">21 %</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PropertyHeader;

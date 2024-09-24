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

function PropertyHeader(props: any) {
  return (
    <Card className="border-0 mt-8">
      <CardHeader>
        <Image
          src={props.imageURL}
          className=" object-cover w-full rounded-t-xl "
          height={200}
          width={400}
          alt={""}
        />
      </CardHeader>
      <CardFooter className="flex flex-col gap-3 border-0    ">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-3xl font-bold">{props.price}</h1>
            <h3 className="text-xl  font-bold">{props.title}</h3>
            <div className="flex justify-start gap-2 items-center">
              <LocationIcon />
              <p className="text-muted-foreground">{props.location}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-3 border-0 p-0 justify-center items-start">
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center gap-1">
            <BedIcon />
            <p className="text-muted-foreground">{props.bedrooms} Bedroom</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <BathIcon />
            <p className="text-muted-foreground">{props.bathrooms} Bathroom</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <AreaSizeIcon />
            <p className="text-muted-foreground">{props.area}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PropertyHeader;

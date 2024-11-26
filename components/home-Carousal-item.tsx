import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface HomeCarousalItemProps {
  title: string;
  description: string;
  image: string;
}

function HomeCarousalItem({
  title,
  description,
  image,
}: HomeCarousalItemProps) {
  return (
    <Card className="bg-[#F7F6F8] rounded-2xl py-5 px-4 flex flex-col  gap-3">
      <CardHeader className="p-0 relative flex flex-col gap-2">
        <CardTitle className="text-black text-base font-semibold ">
          {title}
        </CardTitle>
        <CardDescription className="text-[#7A7A7A] font-normal text-sm max-w-[70%]">
          {description}
        </CardDescription>
        <div className="absolute -right-2">
          <img src={image} alt="image" className="object-fit" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Button
          variant={"secondary"}
          className="px-4 py-2 w-fit rounded-md text-base font-semibold text-white"
        >
          Join Now
        </Button>
      </CardContent>
    </Card>
  );
}

export default HomeCarousalItem;

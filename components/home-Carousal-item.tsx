import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface HomeCarousalItemProps {
  title: string;
  description: string;
  image: string;
  btn?: boolean;
}

function HomeCarousalItem({
  title,
  description,
  image,
  btn = false,
}: HomeCarousalItemProps) {
  return (
    <Card className="bg-[#F7F6F8] rounded-2xl py-5 px-4 flex flex-row items-center justify-between  overflow-hidden">
      {/* Text Section */}
      <div className="flex flex-col gap-3 max-w-[60%]">
        <CardHeader className="p-0">
          <CardTitle className="text-black text-base font-semibold truncate">
            {title}
          </CardTitle>
          <CardDescription className="text-[#7A7A7A] line-clamp-3 text-base font-normal">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {btn && (
            <Button
              variant={"secondary"}
              className="px-4 py-2 w-fit rounded-md text-base font-semibold text-white"
            >
              Join Now
            </Button>
          )}
        </CardContent>
      </div>
      {/* Image Section */}
      <div className="flex-shrink-0 max-w-[40%] h-full">
        <img src={image} alt="image" className="object-contain w-full h-full" />
      </div>
    </Card>
  );
}

export default HomeCarousalItem;

import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

function HomeListing() {
  const router = useRouter();
  const images = ["/prop1.png", "/prop2.png", "/prop3.png", "/prop4.png"];
  return (
    <Card
      className="border rounded-xl w-full p-0 bg-[#FCFBEE]"
      onClick={() => router.push("/insights")}
    >
      <CardHeader className="w-full flex flex-col gap-2">
        <CardTitle className="text-base font-semibold text-secondary">
          Your listings (24)
        </CardTitle>
        <div className="flex items-center">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Image ${index}`}
              className={cn(
                "w-10 h-10 rounded-full object-cover border border-white shadow-lg ",
                index !== 0 ? "-ml-4" : ""
              )}
            />
          ))}
          <div className="w-10 h-10 rounded-full bg-white border border-white shadow-lg -ml-4 flex items-center justify-center text-xs font-medium text-muted-foreground">
            +56
          </div>
        </div>
        <h3 className="text-sm text-muted-foreground font-normal">
          Get detailed insights about the properties that you have listed
          online. AI driven insights!
        </h3>
      </CardHeader>
    </Card>
  );
}

export default HomeListing;
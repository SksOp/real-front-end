import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

function PropertyKeyInformation() {
  return (
    <Card className="border-0 bg-background">
      <CardHeader className="p-0">
        <CardTitle className="text-xl text-secondary font-medium">
          Key Information
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-3 px-1 py-2">
        <div className="w-full">
          <h3 className="text-secondary/80 text-base font-semibold">
            Reference
          </h3>
          <p className="text-muted-foreground font-normal">
            dar-al-rehab-real-9108966
          </p>
        </div>
        <div>
          <h3 className="text-secondary/80 text-base font-semibold">
            Broker ORN
          </h3>
          <p className="text-muted-foreground font-normal">33494</p>
        </div>
        <div>
          <h3 className="text-secondary/80 text-base font-semibold">Listed</h3>
          <p className="text-muted-foreground font-normal">15/07/2024</p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-secondary/80 text-base font-semibold">
            DLD permit number
          </h3>
          <p className="text-primary font-normal">7153299987</p>
          <Image
            src="/takeshiQR.png"
            alt="QR code"
            className="object-cover w-1/2"
            width={100}
            height={100}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default PropertyKeyInformation;

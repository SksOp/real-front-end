import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function PropertyKeyInformation() {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Key Information</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-3">
        <div className="w-full">
          <h3 className="text-secondary font-semibold">Reference</h3>
          <p className="text-muted font-normal">dar-al-rehab-real-9108966</p>
        </div>
        <div className="flex justify-between w-full">
          <div>
            <h3 className="text-secondary font-semibold">Broker ORN</h3>
            <p className="text-muted font-normal">33494</p>
          </div>
          <div>
            <h3 className="text-secondary font-semibold">Listed</h3>
            <p className="text-muted font-normal">15/07/2024</p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-secondary font-semibold">DLD permit number</h3>
          <p className="text-primary-foreground font-normal">7153299987</p>
          <img
            src="/takeshiQR.png"
            alt="QR code"
            className="object-cover w-1/2"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default PropertyKeyInformation;

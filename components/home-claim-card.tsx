import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

function HomeClaimCard() {
  return (
    <Card className="border rounded-xl w-full p-6 bg-[#E0F1F5] flex flex-col gap-2 items-center">
      <CardHeader className="p-0 w-full">
        <CardTitle className="text-lg font-semibold text-secondary">
          Manage your team and customize.
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground font-normal">
          Contact our support team to claim admin rights for your agency. Change
          app branding, manage your team effectively, access exclusive manager
          features, and so much more. Bring your team together now!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 w-full">
        <Button
          variant={"outline"}
          className="w-fit bg-[#6155DF] text-white font-semibold text-base rounded-md"
        >
          Claim admin rights
        </Button>
      </CardContent>
    </Card>
  );
}

export default HomeClaimCard;

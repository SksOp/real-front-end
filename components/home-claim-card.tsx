import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { WhatsAppIcon, WhatsAppIconWhite } from "@/public/svg/social";

function HomeClaimCard() {
  return (
    <Card className="border rounded-xl w-full  bg-[#E0F1F5]    ">
      <div className=" relative overflow-hidden p-6  rounded-xl flex flex-col gap-4 items-center">
        <div className="absolute top-0 left-0 transform -translate-x-[20%] -translate-y-[20%] bg-[#F3F9FB]  h-52 w-52 rounded-full" />

        <CardHeader className="p-0 w-full z-10">
          <CardTitle className="text-lg font-semibold text-secondary">
            Manage your team and customize.
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground font-normal z-10">
            Contact our support team to claim admin rights for your agency.
            Change app branding, manage your team effectively, access exclusive
            manager features, and so much more. Bring your team together now!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 w-full flex justify-center">
          <Button
            variant="outline"
            className="bg-primary-600 hover:bg-primary-400 text-white flex gap-2 hover:text-white items-center justify-center font-semibold text-base rounded-md py-[0.625rem] px-4 text-center "
          >
            <WhatsAppIconWhite />
            Claim admin rights
          </Button>
        </CardContent>
        <div className="absolute bottom-0 right-0 transform translate-x-[60%] translate-y-[60%] bg-[#F6D049] h-40 w-40 rounded-full" />
      </div>
    </Card>
  );
}

export default HomeClaimCard;

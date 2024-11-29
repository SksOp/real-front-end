import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CopyIcon } from "@/public/svg/icons";
import {
  FacebookIcon,
  InstagramIcon,
  LinkdinIcon,
  TiktokIcon,
  WhatsAppIcon,
} from "@/public/svg/social";

function SharingCard() {
  return (
    <Card className="bg-background flex flex-col gap-5 border rounded-xl  w-full px-3 py-4">
      <CardHeader className="p-0 flex flex-col gap-1">
        <CardTitle className="font-semibold text-secondary text-base">
          Help by sharing!
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground font-normal">
          Let them know that this is the best place for finding all kinds of
          insights you and your customers are ever looking for~
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-5">
        <div className="flex  justify-around gap-2 items-center">
          <FacebookIcon />
          <LinkdinIcon />
          <WhatsAppIcon />
          <img
            src="/imgs/sharing/insta.svg"
            alt="insights"
            className="object-cover"
          />
          <TiktokIcon />
        </div>
        <div className="flex gap-3 items-center justify-start">
          <h3 className="truncate rounded-lg text-sm border px-3 py-4 bg-card">
            https://keypilot/Property_10435903?page=1&position=9&term=copy&origin=search&related_id=10435903
          </h3>
          <div className="rounded-lg flex items-center justify-center gap-4 border p-4">
            <CopyIcon />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SharingCard;

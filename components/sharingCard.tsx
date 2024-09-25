import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CopyIcon } from "@/public/svg/icons";

function SharingCard() {
  return (
    <Card className="bg-background flex flex-col gap-5 border rounded-xl  w-full px-3 py-4">
      <CardHeader className="p-0 flex flex-col gap-1">
        <CardTitle className="font-semibold text-secondary text-base">
          Help by sharing!
        </CardTitle>
        <CardDescription className="font-normal text-muted-foreground text-base">
          Let them know that this is the best place for finding all kinds of
          insights you and your customers are ever looking for~
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-5">
        <div className="flex gap-5 justify-around items-center">
          <img src="/imgs/sharing/whatsapp.svg" alt="whatsApp" />
          <img src="/imgs/sharing/insta.svg" alt="instagram" />
          <img src="/imgs/sharing/facebook.svg" alt="facebook" />
          <img src="/imgs/sharing/linkdin.svg" alt="linkdin" />
          <img src="/imgs/sharing/tiktok.svg" alt="tiktok" />
          <img src="/imgs/sharing/telegram.svg" alt="telegram" />
        </div>
        <div className="flex gap-3 items-center justify-start">
          <h3 className="truncate rounded-lg text-sm border px-3 py-4 bg-card">
            https://keypilot/Property_10435903?page=1&position=9&term=copy&origin=search&related_id=10435903
          </h3>
          <div className="rounded-lg px-4 border py-3">
            <CopyIcon />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SharingCard;

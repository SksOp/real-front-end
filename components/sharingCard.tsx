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
import { useToast } from "./ui/use-toast";

function SharingCard() {
  const { toast } = useToast();
  const shareLink =
    "https://keypilot/Property_10435903?page=1&position=9&term=copy&origin=search&related_id=10435903";

  const handleShare = (platform: string) => {
    const encodedLink = encodeURIComponent(shareLink);
    let url = "";

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodedLink}`;
        break;
      case "instagram":
        url = `https://www.instagram.com/?url=${encodedLink}`;
        break;
      case "tiktok":
        url = `https://www.tiktok.com/?url=${encodedLink}`;
        break;
      default:
        break;
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  const handleCopy = () => {
    toast({
      title: "Link copied!",
      description: "You can now paste the link anywhere you want.",
    });
  };

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
        <div className="flex justify-around gap-2 items-center">
          <FacebookIcon
            className="cursor-pointer"
            onClick={() => handleShare("facebook")}
          />
          <LinkdinIcon
            className="cursor-pointer"
            onClick={() => handleShare("linkedin")}
          />
          <WhatsAppIcon
            className="cursor-pointer"
            onClick={() => handleShare("whatsapp")}
          />
          <img
            src="/imgs/sharing/insta.svg"
            alt="insights"
            className="object-cover cursor-pointer"
            onClick={() => handleShare("instagram")}
          />
          <TiktokIcon
            className="cursor-pointer"
            onClick={() => handleShare("tiktok")}
          />
        </div>
        <div className="flex gap-3 items-center justify-start">
          <h3 className="truncate rounded-lg text-sm border px-3 py-4 bg-card">
            {shareLink}
          </h3>
          <div
            className="rounded-lg flex items-center justify-center gap-4 border p-4 cursor-pointer"
            onClick={handleCopy}
          >
            <CopyIcon />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SharingCard;

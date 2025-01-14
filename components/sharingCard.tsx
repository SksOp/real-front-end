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

function SharingCard({ link }: { link?: string }) {
  const { toast } = useToast();
  const shareLink = "https://www.keypilot.io";

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
      case "telegram":
        url = `https://t.me/share/url?url=${encodedLink}`;
        break;
      default:
        break;
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast({
        title: "Link copied!",
        description: "You can now paste the link anywhere you want.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy the link. Please try again.",
      });
    }
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
          <img
            src="/imgs/sharing/telegram.svg"
            alt="insights"
            className="object-cover cursor-pointer"
            onClick={() => handleShare("telegram")}
          />
        </div>
        <div className="flex gap-3 items-center justify-start">
          <h3 className="truncate rounded-lg text-sm border px-3 py-4 bg-card w-full">
            {link ?? shareLink}
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

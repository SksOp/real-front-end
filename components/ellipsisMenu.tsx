import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DownloadIcon,
  Ellipsis,
  InfoIcon,
  ShareIcon,
} from "@/public/svg/Indicator";

function EllipsisMenu() {
  return (
    <span className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <DownloadIcon className="mr-2" />
            <span className="text-sm text-muted-foreground font-medium">
              Download
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon className="mr-2 " />
            <span className="text-sm text-muted-foreground font-medium">
              Share
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <InfoIcon className="mr-2 " />
            <span className="text-sm text-muted-foreground font-medium">
              Info
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </span>
  );
}

export default EllipsisMenu;
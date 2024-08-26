import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Download, Ellipsis, Info, Share2 } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChartWrapperProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

function ChartWrapper({ title, description, children }: ChartWrapperProps) {
  const defaultView = (
    <div className="flex flex-col gap-6 justify-center items-center">
      <Image
        src="/imgs/exception.png"
        width={120}
        height={120}
        className="object-cover"
        alt={"exception"}
      />
      <span className="text-muted-foreground text-center">
        No data available!
      </span>
    </div>
  );
  return (
    <Card className="border-0 w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <span className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Info className="mr-2 h-4 w-4" />
                  <span>Info</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children ?? defaultView}</CardContent>
    </Card>
  );
}

export default ChartWrapper;

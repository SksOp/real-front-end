import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SalesIndexCardComponentProps {
  title: string;
  description: string;
  percentile25: number;
  percentile75: number;
  trendDescription: string;
  footerText: string;
}

const SalesIndexCardComponent: React.FC<SalesIndexCardComponentProps> = ({
  title,
  description,
  percentile25,
  percentile75,
  trendDescription,
  footerText,
}) => {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {title}
        </CardTitle>
        <CardDescription className="flex justify-between items-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="h-4 flex gap-1">
            <div className="w-1/4 h-4 rounded-lg bg-green-500"></div>
            <div className="w-1/2 h-4 rounded-lg bg-yellow-500"></div>
            <div className="w-1/4 h-4 rounded-lg bg-red-500"></div>
          </div>
          <div className="flex justify-between text-gray-600 mt-2 text-sm">
            <div className="w-full flex justify-center">
              <span>${percentile25}</span>
            </div>
            <div className="w-full flex justify-center">
              <span>${percentile75}</span>
            </div>
          </div>
        </div>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trendDescription} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{footerText}</div>
      </CardFooter> */}
    </Card>
  );
};

export default SalesIndexCardComponent;

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ExploreFormatsProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function ExploreFormats({ title, description, children }: ExploreFormatsProps) {
  return (
    <Card className="border-0 px-4 w-full">
      <CardHeader className="p-0">
        <CardTitle className="text-base">{title}</CardTitle>
        {description && (
          <CardDescription className="text-muted text-base">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}

export default ExploreFormats;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

function PropertyDescription() {
  const [isExpanded, setIsExpanded] = useState(false);
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, consectetur neque ab porro quasi culpa nulla rerum quis minus voluptatibus sed hic ad quo sint, libero commodi officia aliquam! Maxime.";

  const wordLimit = 20;
  const splittedText = text.split(" ");
  const itCanOverflow = splittedText.length > wordLimit;

  const beginText = itCanOverflow
    ? splittedText.slice(0, wordLimit).join(" ")
    : text;
  const endText = splittedText.slice(wordLimit).join(" ");

  return (
    <Card className="border-0 bg-background">
      <CardHeader className="p-0">
        <CardTitle className="text-base text-secondary font-medium">
          Property Description
        </CardTitle>
        <CardDescription className="text-muted-foreground font-normal text-sm">
          {beginText}
          {itCanOverflow && (
            <>
              {!isExpanded && <span>... </span>}
              <span className={`${!isExpanded ? "hidden" : ""}`}>
                {endText}
              </span>
              <span
                className="text-primary text-sm font-semibold ml-1 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Read less" : "Read more"}
              </span>
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 py-4 grid grid-cols-2 gap-4 justify-items-start">
        <div>
          <h3 className="text-sm text-secondary/80 font-semibold">Builder</h3>
          <p className="text-muted-foreground text-sm font-normal">Apartment</p>
        </div>
        <div>
          <h3 className="text-sm text-secondary/80 font-semibold">Builder</h3>
          <p className="text-muted-foreground text-sm font-normal">Apartment</p>
        </div>
        <div>
          <h3 className="text-sm text-secondary/80 font-semibold">Builder</h3>
          <p className="text-muted-foreground text-sm font-normal">Apartment</p>
        </div>
        <div>
          <h3 className="text-sm text-secondary/80 font-semibold">Builder</h3>
          <p className="text-muted-foreground text-sm font-normal">Apartment</p>
        </div>
        <div>
          <h3 className="text-sm text-secondary/80 font-semibold">Builder</h3>
          <p className="text-muted-foreground text-sm font-normal">Apartment</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default PropertyDescription;

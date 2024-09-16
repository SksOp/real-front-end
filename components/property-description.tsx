import React, { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

function PropertyDescription() {
  const [isExpanded, setIsExpanded] = useState(false);
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, consectetur neque ab porro quasi culpa nulla rerum quis minus voluptatibus sed hic ad quo sint, libero commodi officia aliquam! Maxime.";

  const wordLimit = 10;
  const splittedText = text.split(" ");
  const itCanOverflow = splittedText.length > wordLimit;

  const beginText = itCanOverflow
    ? splittedText.slice(0, wordLimit).join(" ")
    : text;
  const endText = splittedText.slice(wordLimit).join(" ");

  return (
    <Card className="border-0 bg-background">
      <CardHeader className="px-0">
        <CardTitle className="font-medium">Property Description</CardTitle>
        <CardDescription className="text-secondary">
          {beginText}
          {itCanOverflow && (
            <>
              {!isExpanded && <span>... </span>}
              <span className={`${!isExpanded ? "hidden" : ""}`}>
                {endText}
              </span>
              <span
                className="text-primary font-bold ml-2 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Read less" : "Read more"}
              </span>
            </>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default PropertyDescription;

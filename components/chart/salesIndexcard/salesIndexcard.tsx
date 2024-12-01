import { cn } from "@/lib/utils";
import { FormatValue } from "@/utils/formatNumbers";
import React, { useEffect, useState } from "react";

interface SalesIndexCardComponentProps {
  percentile25: number;
  percentile75: number;
  knob?: number;
}

const SalesIndexCardComponent: React.FC<SalesIndexCardComponentProps> = ({
  percentile25,
  percentile75,
  knob,
}) => {
  const [knobPosition, setKnobPosition] = useState<string>("left-[0%]");

  // Function to calculate the knob's position
  const getKnobPosition = () => {
    if (knob === undefined) return null;

    if (knob <= percentile25) {
      // Knob is in the first box (0% - 25%)
      const positionPercentage = (knob / percentile25) * 25; // Scale to 0-25%
      return Math.max(0, positionPercentage); // Keep within 0% (at the start)
    } else if (knob >= percentile75) {
      // Knob is in the third box (75% - 100%)
      const extraRange = knob - percentile75;
      const maxRange = percentile75 * 0.25; // Maximum distance beyond the 75th percentile
      const positionPercentage = 75 + (extraRange / maxRange) * 25; // Scale within 75%-100%
      return Math.min(100, positionPercentage); // Cap at 100%
    } else {
      // Knob is in the middle box (25th to 75th percentile)
      const middleRange = percentile75 - percentile25;
      const positionPercentage =
        25 + ((knob - percentile25) / middleRange) * 50; // Scale within 25%-75%
      return Math.max(25, Math.min(75, positionPercentage)); // Keep within 25%-75%
    }
  };

  // Update knob position when knob, percentile25, or percentile75 change
  useEffect(() => {
    const position = getKnobPosition();
    if (position !== null) {
      setKnobPosition(`left-[${position}%]`);
    }
  }, [knob, percentile25, percentile75]);

  return (
    <div className="w-full flex flex-col  items-center gap-2">
      {knob && (
        <div className="flex justify-center items-center rounded-full py-2 px-3 bg-muted-foreground text-white w-fit">
          AED 1.356M is Avg.
        </div>
      )}
      <div className="relative h-6 flex gap-1 w-full">
        {/* Background bars */}
        <div className="w-1/4 h-6 border border-secondary rounded-sm bg-[#DDF8E4]"></div>
        <div className="w-1/2 h-6 border border-secondary rounded-sm bg-[#FCF8D1]"></div>
        <div className="w-1/4 h-6 border border-secondary rounded-sm bg-[#FFDBDB]"></div>

        {/* Knob */}
        {knob !== undefined && (
          <div
            className={cn(
              `absolute w-8 h-8 border-4 -top-1 border-secondary rounded-full bg-white`,
              knobPosition
            )}
          />
        )}
      </div>
      <div className="flex justify-between text-gray-600 text-sm w-full">
        <div className="w-full flex justify-center">
          <span>AED {FormatValue(percentile25)}</span>
        </div>
        <div className="w-full flex justify-center">
          <span>AED {FormatValue(percentile75)}</span>
        </div>
      </div>
    </div>
  );
};

export default SalesIndexCardComponent;

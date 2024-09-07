import React from "react";

interface SalesIndexCardComponentProps {
  percentile25: number;
  percentile75: number;
}

const SalesIndexCardComponent: React.FC<SalesIndexCardComponentProps> = ({
  percentile25,
  percentile75,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="flex justify-center items-center rounded-full py-2 px-3 bg-muted-foreground text-white w-fit">
        AED 1.356M is Avg.
      </div>
      <div className="relative h-6 flex gap-1 w-full">
        {/* Background bars */}
        <div className="w-1/4 h-6 rounded-sm bg-[#D1F6DB]"></div>
        <div className="w-1/2 h-6 rounded-sm bg-[#FCF8D1]"></div>
        <div className="w-1/4 h-6 rounded-sm bg-[#FFC8C8]"></div>

        {/* Knobs */}
        <div className="absolute w-8 h-8 border-4 -top-1 left-[45%] border-secondary rounded-full bg-white" />
      </div>
      <div className="flex justify-between text-gray-600 text-sm w-full">
        <div className="w-full flex justify-center">
          <span>AED {percentile25}</span>
        </div>
        <div className="w-full flex justify-center">
          <span>AED {percentile75}</span>
        </div>
      </div>
    </div>
  );
};

export default SalesIndexCardComponent;

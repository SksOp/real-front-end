import { useRouter } from "next/navigation";
import React from "react";

interface ToolboxItemProps {
  title: string;
  svg: React.ReactNode;
  linkto?: string;
}

function ToolboxItemView({ title, svg, linkto }: ToolboxItemProps) {
  const router = useRouter();
  return (
    <div
      className="px-4 py-5 border border-[#E2E7EC] flex flex-col gap-3 items-center justify-center rounded-2xl hover:bg-[#EFEEFC] hover:border-[#B6B1F0]"
      onClick={() => linkto && router.push(linkto)}
    >
      <div>{svg}</div>
      <h3 className="text-sm font-normal text-[#334155] text-center">
        {title}
      </h3>
    </div>
  );
}

export default ToolboxItemView;

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

interface Props {
  className?: ClassValue;
  color?: string
}

export function UpIcon({ className, color }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_581_3938)">
      <path d="M8 12.6666V3.33325" stroke={color || "#0AAE11"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.33337 7.99992L8.00004 3.33325L12.6667 7.99992" stroke={color || "#0AAE11"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
  );
}


export function DownIcon({ className, color }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_581_3938)">
      <path d="M8 3.33342V12.6667" stroke={color || "#EB3C70"}  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.33337 8.00008L8.00004 12.6667L12.6667 8.00008" stroke={color || "#EB3C70"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
  );
}




import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

interface Props {
  className?: ClassValue;
  color?: string;
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
      <g clipPath="url(#clip0_581_3938)">
        <path
          d="M8 12.6666V3.33325"
          stroke={color || "#0AAE11"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33337 7.99992L8.00004 3.33325L12.6667 7.99992"
          stroke={color || "#0AAE11"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
      <g clipPath="url(#clip0_581_3938)">
        <path
          d="M8 3.33342V12.6667"
          stroke={color || "#EB3C70"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33337 8.00008L8.00004 12.6667L12.6667 8.00008"
          stroke={color || "#EB3C70"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function CircularUpIcon({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="8"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 0 0.5)"
        fill="#D1F6DB"
      />
      <path
        d="M5.24121 11.462L10.9742 5.73575M5.24121 5.74255H10.9742V11.4688"
        stroke="#42BE64"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function CircularDownIcon({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8.5"
        r="8"
        transform="rotate(-90 8 8.5)"
        fill="#FFC8C8"
      />
      <path
        d="M5.24121 5.53805L10.9742 11.2642M5.24121 11.2575H10.9742V5.53125"
        stroke="#E84646"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

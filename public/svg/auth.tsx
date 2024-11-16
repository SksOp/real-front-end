import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

interface Props {
  className?: ClassValue;
}

export function GoogleIcon({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
        fill="#FFC107"
      />
      <path
        d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z"
        fill="#FF3D00"
      />
      <path
        d="M12 21.9964C14.583 21.9964 16.93 21.0079 18.7045 19.4004L15.6095 16.7814C14.5719 17.571 13.3038 17.9978 12 17.9964C9.39897 17.9964 7.19047 16.3379 6.35847 14.0234L3.09747 16.5359C4.75247 19.7744 8.11347 21.9964 12 21.9964Z"
        fill="#4CAF50"
      />
      <path
        d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
        fill="#1976D2"
      />
    </svg>
  );
}

export function SplashIcon({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="29"
      height="33"
      viewBox="0 0 29 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28.971" height="4.13099" fill="black" />
      <rect y="7.35938" width="28.971" height="4.13099" fill="black" />
      <path
        d="M14.547 14.7812H29V23.8178V32.9996L14.547 25.0442L0 32.9996V14.7812H14.547Z"
        fill="black"
      />
    </svg>
  );
}

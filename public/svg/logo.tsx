import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface Props {
  className?: ClassValue;
}

export function MainLogo({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="19"
      height="21"
      viewBox="0 0 19 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18.981" height="2.62799" fill="black" />
      <rect y="4.67969" width="18.981" height="2.62799" fill="black" />
      <path
        d="M9.53082 9.40625H19V15.155V20.9961L9.53082 15.9352L0 20.9961V9.40625H9.53082Z"
        fill="black"
      />
    </svg>
  );
}

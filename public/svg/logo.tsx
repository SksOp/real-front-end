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

export function HomeLogo({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6050_4476)">
        <path
          d="M1.66675 10.1712C1.66675 8.26421 1.66675 7.3107 2.09942 6.52025C2.53208 5.72981 3.32254 5.23923 4.90344 4.25807L6.57011 3.22369C8.24124 2.18654 9.0768 1.66797 10.0001 1.66797C10.9234 1.66797 11.7589 2.18654 13.4301 3.22369L15.0967 4.25807C16.6776 5.23923 17.4681 5.72981 17.9007 6.52025C18.3334 7.3107 18.3334 8.26421 18.3334 10.1712V11.4388C18.3334 14.6895 18.3334 16.3149 17.3571 17.3248C16.3808 18.3346 14.8094 18.3346 11.6667 18.3346H8.33341C5.19072 18.3346 3.61937 18.3346 2.64306 17.3248C1.66675 16.3149 1.66675 14.6895 1.66675 11.4388V10.1712Z"
          stroke="#353535"
          stroke-width="2"
        />
        <path
          d="M12.5 15H7.5"
          stroke="#353535"
          stroke-width="2"
          stroke-linecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6050_4476">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

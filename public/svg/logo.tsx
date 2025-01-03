import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface Props {
  className?: ClassValue;
}

export function MainLogo({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9999 40.9688L30.2539 30.7146L23.194 23.6547C28.6356 26.4111 35.4521 25.5164 40 20.9687L29.7459 10.7147L22.686 17.7747C25.4424 12.3331 24.5477 5.51653 19.9999 0.96875L9.74597 11.2227L16.8059 18.2827C11.3643 15.5262 4.54778 16.4209 0 20.9687L10.2539 31.2227L17.3139 24.1627C14.5575 29.6043 15.4522 36.421 19.9999 40.9688Z"
        fill="#584DCB"
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

export function CompassLogo({ className }: Props) {
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
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="#453C9E"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.2398 7.76172L14.1198 14.1217L7.75977 16.2417L9.87977 9.88172L16.2398 7.76172Z"
        fill="#DDDAF9"
        stroke="#453C9E"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

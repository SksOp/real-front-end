import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

interface Props {
  className?: ClassValue;
}

export function OverallSalesIcon({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.8044 7.9165L20.8039 4.17951L17.2484 3.02629L15.0545 0L11.5 1.15958L7.94544 7.75896e-05L5.75159 3.02629L2.1961 4.17951L2.19556 7.91657L0 10.9399L2.19563 13.9633L2.1961 17.7003L5.75159 18.8535L7.94552 21.8798L11.5 20.7203L15.0546 21.8798L17.2484 18.8535L20.8039 17.7003L20.8044 13.9633L23 10.9399L20.8044 7.9165ZM7.49314 9.87492C7.10974 9.4892 6.89604 9.00368 6.89604 8.41831V7.89431C6.89604 7.30443 7.10858 6.8155 7.48972 6.42752C7.87095 6.03962 8.42405 5.84571 9.12745 5.84571C9.83977 5.84571 10.3763 6.03962 10.7574 6.42752C11.1386 6.8155 11.319 7.3045 11.319 7.89431V8.41831C11.319 9.00826 11.1441 9.49486 10.7628 9.8781C10.3817 10.2617 9.83636 10.4532 9.13311 10.4532C8.42529 10.4533 7.87661 10.2605 7.49314 9.87492ZM9.51263 15.1562L8.44415 14.6185L13.2832 6.87338L14.3519 7.41112L9.51263 15.1562ZM16.0523 13.9925C16.0523 14.5869 15.8667 15.0758 15.4878 15.4592C15.1089 15.8426 14.5698 16.0341 13.8665 16.0341C13.1588 16.0341 12.605 15.8415 12.217 15.4557C11.8292 15.0701 11.6294 14.5823 11.6294 13.9925V13.4684C11.6294 12.8831 11.829 12.3965 12.2147 12.0085C12.6003 11.6204 13.1483 11.4266 13.8514 11.4266C14.5638 11.4266 15.1072 11.6196 15.4861 12.005C15.865 12.3908 16.0523 12.8786 16.0523 13.4684V13.9925Z"
        fill="#16577A"
      />
      <path
        d="M9.67211 8.98006C9.79688 8.82899 9.84491 8.64074 9.84491 8.41525V7.89451C9.84491 7.66925 9.79564 7.47883 9.66862 7.32325C9.54144 7.16767 9.36724 7.08984 9.13135 7.08984C8.90004 7.08984 8.70427 7.16767 8.57732 7.32325C8.4503 7.47883 8.37061 7.66925 8.37061 7.89451V8.41525C8.37061 8.64074 8.45394 8.82899 8.58089 8.98006C8.70791 9.13099 8.89445 9.20649 9.13507 9.20649C9.36638 9.20649 9.54726 9.13099 9.67211 8.98006Z"
        fill="#16577A"
      />
      <path
        d="M13.8548 12.6719C13.6188 12.6719 13.4292 12.7499 13.3023 12.9053C13.175 13.0609 13.1035 13.2492 13.1035 13.47V13.9905C13.1035 14.2072 13.1841 14.3941 13.3295 14.552C13.4747 14.7098 13.6556 14.7885 13.8643 14.7885C14.1456 14.7885 14.3322 14.7188 14.4322 14.5789C14.5318 14.4392 14.5778 14.2431 14.5778 13.9905V13.47C14.5778 13.2491 14.5192 13.0609 14.3899 12.9053C14.2605 12.7499 14.0861 12.6719 13.8548 12.6719Z"
        fill="#16577A"
      />
    </svg>
  );
}

export function CashSalesIcon({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6564_6101)">
        <path
          d="M20.4163 18.6287V12.7504C20.4163 9.11773 18.0561 6.02612 14.7887 4.928C15.4839 4.24694 15.9165 3.2986 15.9165 2.25075V0.750807C15.9165 0.194494 15.3297 -0.169193 14.8311 0.0800332C13.1628 0.914322 11.1708 0.914322 9.50212 0.0800332C9.00285 -0.169643 8.41676 0.195527 8.41676 0.750807V2.25075C8.41676 3.2986 8.84931 4.24694 9.54457 4.928C6.27713 6.02612 3.91693 9.11769 3.91693 12.7504V18.6287C3.04392 18.9382 2.41699 19.7723 2.41699 20.7501C2.41695 21.9907 3.4263 23 4.6669 23H19.6663C20.9069 23 21.9162 21.9907 21.9162 20.7501C21.9162 19.7723 21.2893 18.9382 20.4163 18.6287ZM9.9167 1.86024C11.3772 2.31966 12.956 2.31966 14.4165 1.86024V2.25079C14.4165 3.4914 13.4072 4.50071 12.1666 4.50071C10.926 4.50071 9.9167 3.4914 9.9167 2.25079V1.86024ZM19.6663 21.5001H4.6669C4.25335 21.5001 3.91693 21.1637 3.91693 20.7501C3.91693 20.3366 4.25335 20.0001 4.6669 20.0001C5.08108 20.0001 5.41688 19.6644 5.41688 19.2502V12.7504C5.41688 9.02861 8.44483 6.00069 12.1666 6.00069C15.8884 6.00069 18.9163 9.02865 18.9163 12.7504V19.2502C18.9163 19.6644 19.2521 20.0001 19.6663 20.0001C20.0799 20.0001 20.4163 20.3366 20.4163 20.7501C20.4163 21.1636 20.0799 21.5001 19.6663 21.5001Z"
          fill="#903F62"
        />
        <path
          d="M12.4866 13.0868C11.6998 12.6709 10.8862 12.2408 10.8862 11.7499C10.8862 11.0606 11.4469 10.4999 12.1361 10.4999C12.8254 10.4999 13.3861 11.0606 13.3861 11.7499C13.3861 12.164 13.7219 12.4998 14.136 12.4998C14.5502 12.4998 14.886 12.164 14.886 11.7499C14.886 10.4936 14.0389 9.43215 12.8861 9.10476V8.74997C12.8861 8.33579 12.5503 8 12.1361 8C11.7219 8 11.3862 8.33579 11.3862 8.74997V9.10476C10.2334 9.43211 9.38623 10.4936 9.38623 11.7499C9.38623 13.1445 10.7166 13.8478 11.7857 14.4129C12.5725 14.8288 13.3861 15.2588 13.3861 15.7497C13.3861 16.4389 12.8254 16.9996 12.1361 16.9996C11.4469 16.9996 10.8862 16.4389 10.8862 15.7497C10.8862 15.3355 10.5504 14.9997 10.1362 14.9997C9.72202 14.9997 9.38623 15.3355 9.38623 15.7497C9.38623 17.006 10.2334 18.0674 11.3862 18.3948V18.7496C11.3862 19.1638 11.7219 19.4996 12.1361 19.4996C12.5503 19.4996 12.8861 19.1638 12.8861 18.7496V18.3948C14.0389 18.0674 14.886 17.006 14.886 15.7497C14.886 14.3551 13.5556 13.6518 12.4866 13.0868Z"
          fill="#903F62"
        />
      </g>
      <defs>
        <clipPath id="clip0_6564_6101">
          <rect
            width="23"
            height="23"
            fill="white"
            transform="translate(0.666504)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
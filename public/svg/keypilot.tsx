import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

interface Props {
  className?: ClassValue;
}

export function BrokerFocused({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6551_5677)">
        <path
          d="M11.1025 2.0186C10.7166 2.0186 10.4037 1.70576 10.4037 1.31984C10.4037 0.933936 10.7166 0.621094 11.1025 0.621094H13.8975C14.2834 0.621094 14.5963 0.933936 14.5963 1.31984C14.5963 1.70576 14.2834 2.0186 13.8975 2.0186H11.1025ZM16.5304 2.72407C16.1962 2.53112 16.0816 2.10377 16.2746 1.76956C16.4676 1.43535 16.8949 1.32084 17.2291 1.5138L19.6497 2.9113C19.9839 3.10425 20.0984 3.53161 19.9054 3.86581C19.7125 4.20002 19.2851 4.31454 18.9509 4.12159L16.5304 2.72407ZM20.8783 6.04896C20.6853 5.71476 20.7999 5.28742 21.1341 5.09446C21.4683 4.9015 21.8956 5.01602 22.0886 5.35022L23.4861 7.77075C23.6791 8.10495 23.5645 8.53233 23.2303 8.72529C22.8961 8.91824 22.4688 8.80372 22.2758 8.46952L20.8783 6.04896ZM22.9813 11.1024C22.9813 10.7165 23.2941 10.4036 23.68 10.4036C24.0659 10.4036 24.3788 10.7165 24.3788 11.1024V13.8974C24.3788 14.2833 24.0659 14.5962 23.68 14.5962C23.2941 14.5962 22.9813 14.2833 22.9813 13.8974V11.1024ZM22.2758 16.5302C22.4688 16.196 22.8961 16.0815 23.2303 16.2745C23.5645 16.4674 23.6791 16.8948 23.4861 17.229L22.0886 19.6495C21.8956 19.9837 21.4683 20.0983 21.1341 19.9053C20.7999 19.7123 20.6853 19.285 20.8783 18.9508L22.2758 16.5302ZM18.9509 20.8782C19.2851 20.6852 19.7125 20.7997 19.9054 21.1339C20.0984 21.4681 19.9839 21.8955 19.6497 22.0885L17.2291 23.486C16.8949 23.6789 16.4676 23.5644 16.2746 23.2302C16.0816 22.896 16.1962 22.4686 16.5304 22.2757L18.9509 20.8782ZM13.8975 22.9812C14.2834 22.9812 14.5963 23.294 14.5963 23.6799C14.5963 24.0658 14.2834 24.3787 13.8975 24.3787H11.1025C10.7166 24.3787 10.4037 24.0658 10.4037 23.6799C10.4037 23.294 10.7166 22.9812 11.1025 22.9812H13.8975ZM8.46964 22.2757C8.80384 22.4686 8.91836 22.896 8.72541 23.2302C8.53245 23.5644 8.10511 23.6789 7.77087 23.486L5.35035 22.0885C5.01611 21.8955 4.90163 21.4681 5.09458 21.1339C5.28754 20.7997 5.71488 20.6852 6.04908 20.8782L8.46964 22.2757ZM4.12171 18.9508C4.31467 19.285 4.20015 19.7123 3.86594 19.9053C3.53173 20.0983 3.10438 19.9837 2.91143 19.6495L1.51392 17.229C1.32097 16.8948 1.43548 16.4674 1.76969 16.2745C2.10389 16.0815 2.53124 16.196 2.72419 16.5302L4.12171 18.9508ZM2.01872 13.8974C2.01872 14.2833 1.70588 14.5962 1.31997 14.5962C0.934059 14.5962 0.621216 14.2833 0.621216 13.8974V11.1024C0.621216 10.7165 0.934059 10.4036 1.31997 10.4036C1.70588 10.4036 2.01872 10.7165 2.01872 11.1024V13.8974ZM2.72419 8.46952C2.53124 8.80372 2.10389 8.91824 1.76969 8.72529C1.43548 8.53233 1.32097 8.10495 1.51392 7.77075L2.91143 5.35022C3.10438 5.01602 3.53173 4.9015 3.86594 5.09446C4.20015 5.28742 4.31467 5.71476 4.12171 6.04896L2.72419 8.46952ZM6.04908 4.12159C5.71488 4.31454 5.28754 4.20002 5.09458 3.86581C4.90163 3.53161 5.01611 3.10425 5.35035 2.9113L7.77087 1.5138C8.10511 1.32084 8.53245 1.43535 8.72541 1.76956C8.91836 2.10377 8.80384 2.53112 8.46964 2.72407L6.04908 4.12159Z"
          fill="white"
          stroke="#B6B1F0"
          stroke-width="0.4"
        />
        <path
          d="M6.90863 12.5002C6.90863 15.5875 9.41138 18.0902 12.4986 18.0902C15.5859 18.0902 18.0886 15.5875 18.0886 12.5002C18.0886 9.4129 15.5859 6.91016 12.4986 6.91016C9.41138 6.91016 6.90863 9.4129 6.90863 12.5002Z"
          fill="#DDDAF9"
        />
      </g>
      <defs>
        <clipPath id="clip0_6551_5677">
          <rect
            width="24.5"
            height="24.5"
            fill="white"
            transform="translate(0.25 0.25)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function CompleteJourney({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="23"
      height="25"
      viewBox="0 0 23 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.242 12.6256C17.242 12.8599 17.3351 13.0846 17.5007 13.2502C17.6664 13.4159 17.8911 13.509 18.1254 13.509C18.9454 13.509 19.7318 13.8348 20.3117 14.4146C20.8916 14.9945 21.2173 15.7809 21.2173 16.6009C21.2173 17.421 20.8916 18.2074 20.3117 18.7873C19.7318 19.3671 18.9454 19.6929 18.1254 19.6929H10.528C10.3091 18.6204 9.69978 17.6674 8.81809 17.0186C7.93647 16.3699 6.8453 16.0716 5.75628 16.1816C4.66717 16.2916 3.65778 16.8021 2.92369 17.6141C2.18961 18.4261 1.78314 19.4817 1.78314 20.5764C1.78314 21.671 2.18961 22.7265 2.92369 23.5386C3.65778 24.3505 4.66717 24.861 5.75628 24.971C6.8453 25.0811 7.93647 24.7828 8.81809 24.134C9.69978 23.4853 10.3091 22.5322 10.528 21.4597H18.1254C19.414 21.4597 20.6499 20.9478 21.5611 20.0367C22.4722 19.1254 22.9841 17.8895 22.9841 16.6009C22.9841 15.3123 22.4722 14.0765 21.5611 13.1653C20.6499 12.2541 19.414 11.7422 18.1254 11.7422C17.8911 11.7422 17.6664 11.8353 17.5007 12.0009C17.3351 12.1666 17.242 12.3913 17.242 12.6256ZM6.19934 23.2266C5.67512 23.2266 5.16276 23.0711 4.72689 22.7799C4.2911 22.4887 3.95139 22.0748 3.7508 21.5905C3.5502 21.1062 3.49776 20.5734 3.59997 20.0592C3.70226 19.5452 3.95468 19.073 4.32532 18.7023C4.69596 18.3317 5.1682 18.0793 5.68224 17.977C6.19636 17.8748 6.72923 17.9272 7.21349 18.1278C7.69775 18.3284 8.11172 18.6681 8.40289 19.1039C8.69413 19.5398 8.84956 20.0521 8.84956 20.5764C8.84956 21.2792 8.57033 21.9533 8.07329 22.4503C7.57632 22.9473 6.90219 23.2266 6.19934 23.2266Z"
        fill="#DDDAF9"
      />
      <path
        d="M4.87444 13.5101H12.4585L12.2023 13.7707C12.1098 13.8499 12.0347 13.9474 11.9817 14.0569C11.9287 14.1666 11.8989 14.2859 11.8942 14.4076C11.8895 14.5292 11.91 14.6506 11.9544 14.7639C11.9988 14.8773 12.0662 14.9803 12.1523 15.0663C12.2384 15.1525 12.3413 15.2198 12.4547 15.2642C12.568 15.3086 12.6894 15.3292 12.8111 15.3244C12.9327 15.3197 13.0521 15.29 13.1617 15.2369C13.2713 15.1838 13.3687 15.1087 13.4479 15.0163L15.2147 13.2495C15.2565 13.2081 15.2936 13.1621 15.3252 13.1125C15.3401 13.0915 15.3533 13.0693 15.365 13.0463L15.4091 12.9579L15.4356 12.8696C15.4456 12.8454 15.453 12.8203 15.4577 12.7945C15.4803 12.6808 15.4803 12.5637 15.4577 12.45C15.453 12.4242 15.4456 12.399 15.4356 12.3749L15.4091 12.2866L15.365 12.1982C15.3533 12.1752 15.3401 12.153 15.3252 12.132C15.2936 12.0824 15.2565 12.0364 15.2147 11.995L13.4479 10.2282C13.2789 10.0835 13.0616 10.0078 12.8392 10.0164C12.6169 10.025 12.406 10.1172 12.2486 10.2745C12.0913 10.4318 11.9991 10.6428 11.9905 10.8651C11.982 11.0874 12.0576 11.3048 12.2023 11.4738L12.4585 11.7344H4.87444C4.05437 11.7344 3.26792 11.4086 2.68804 10.8288C2.10823 10.2489 1.78246 9.46248 1.78246 8.6425C1.78246 7.82244 2.10823 7.03599 2.68804 6.4561C3.26792 5.87629 4.05437 5.55052 4.87444 5.55052H12.4717C12.6907 6.62301 13.3001 7.57606 14.1817 8.22477C15.0634 8.87356 16.1545 9.17185 17.2436 9.06183C18.3326 8.95181 19.3421 8.44129 20.0762 7.62935C20.8102 6.81732 21.2166 5.76176 21.2166 4.66706C21.2166 3.57245 20.8102 2.51688 20.0762 1.70486C19.3421 0.892917 18.3326 0.382398 17.2436 0.272378C16.1545 0.162357 15.0634 0.460645 14.1817 1.10944C13.3001 1.75815 12.6907 2.7112 12.4717 3.78369H4.87444C3.58581 3.78369 2.34994 4.29558 1.43869 5.20675C0.527522 6.118 0.015625 7.35387 0.015625 8.6425C0.015625 9.93112 0.527522 11.1669 1.43869 12.0782C2.34994 12.9893 3.58581 13.5012 4.87444 13.5012V13.5101ZM16.8005 2.02566C17.3246 2.02566 17.8371 2.18116 18.2729 2.47232C18.7087 2.76357 19.0484 3.17747 19.249 3.66172C19.4496 4.14598 19.5021 4.67886 19.3998 5.19297C19.2976 5.70709 19.0452 6.17933 18.6745 6.54997C18.3039 6.92061 17.8316 7.17296 17.3175 7.27524C16.8034 7.37753 16.2705 7.32501 15.7863 7.12442C15.302 6.92382 14.8881 6.58419 14.5969 6.14832C14.3057 5.71253 14.1502 5.20009 14.1502 4.67595C14.1502 3.97303 14.4294 3.29897 14.9265 2.80193C15.4235 2.30488 16.0976 2.02566 16.8005 2.02566Z"
        fill="white"
      />
      <path
        d="M6.46035 19.5132L5.73155 20.2376C5.56426 20.1496 5.37323 20.1175 5.18634 20.1462C4.99953 20.1747 4.82681 20.2625 4.69351 20.3966C4.52898 20.5621 4.43665 20.7861 4.43665 21.0194C4.43665 21.2528 4.52898 21.4767 4.69351 21.6422L5.13528 22.0839C5.30081 22.2485 5.52467 22.3408 5.75804 22.3408C5.99148 22.3408 6.21535 22.2485 6.38087 22.0839L7.70602 20.7588C7.85072 20.5898 7.92636 20.3724 7.91779 20.1501C7.90914 19.9277 7.81703 19.7169 7.6597 19.5595C7.50236 19.4022 7.29143 19.31 7.06909 19.3014C6.84676 19.2929 6.6294 19.3684 6.46035 19.5132Z"
        fill="white"
      />
    </svg>
  );
}

export function GrowthOriented({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="23"
      height="20"
      viewBox="0 0 23 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.8901 14.8001C2.0358 14.8003 2.18005 14.7717 2.31457 14.7159C2.44916 14.6602 2.57136 14.5784 2.67418 14.4753L8.91272 8.23675L11.4551 10.7792C11.5581 10.8822 11.6804 10.9638 11.8149 11.0196C11.9494 11.0753 12.0936 11.104 12.2392 11.104C12.3848 11.104 12.5291 11.0753 12.6636 11.0196C12.7981 10.9638 12.9204 10.8822 13.0234 10.7792L20.0007 3.80187L20.0003 6.29903C20.0003 6.59311 20.1171 6.87517 20.3251 7.08311C20.533 7.29105 20.815 7.40789 21.1091 7.40789C21.4031 7.40789 21.6852 7.29105 21.8931 7.08311C22.1011 6.87517 22.2179 6.59311 22.2179 6.29903L22.2187 1.12448C22.2187 0.830403 22.1019 0.548347 21.894 0.340403C21.686 0.132459 21.404 0.015625 21.1099 0.015625H15.9353C15.6413 0.015625 15.3592 0.132459 15.1513 0.340403C14.9433 0.548347 14.8265 0.830403 14.8265 1.12448C14.8265 1.41856 14.9433 1.70061 15.1513 1.90856C15.3592 2.1165 15.6413 2.23326 15.9353 2.23326H18.433L12.2392 8.42701L9.6968 5.88452C9.59382 5.78155 9.47163 5.69993 9.33711 5.64419C9.20259 5.58846 9.05834 5.55975 8.91272 5.55975C8.7671 5.55975 8.62293 5.58846 8.48841 5.64419C8.35389 5.69993 8.23162 5.78155 8.12864 5.88452L1.10603 12.9071C0.950987 13.0623 0.84533 13.2598 0.802532 13.4749C0.759734 13.69 0.781708 13.9129 0.865621 14.1156C0.94961 14.3182 1.09171 14.4914 1.27408 14.6132C1.45645 14.7351 1.67083 14.8001 1.8901 14.8001Z"
        fill="#DDDAF9"
      />
      <path
        d="M21.1099 17.0195H1.8901C1.59603 17.0195 1.31397 17.1364 1.10603 17.3443C0.898084 17.5523 0.78125 17.8342 0.78125 18.1283C0.78125 18.4225 0.898084 18.7044 1.10603 18.9124C1.31397 19.1203 1.59603 19.2372 1.8901 19.2372H21.1099C21.404 19.2372 21.686 19.1203 21.894 18.9124C22.1019 18.7044 22.2187 18.4225 22.2187 18.1283C22.2187 17.8342 22.1019 17.5523 21.894 17.3443C21.686 17.1364 21.404 17.0195 21.1099 17.0195Z"
        fill="white"
      />
    </svg>
  );
}

export function FasterIcon({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="49"
      height="49"
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.5 49C38.031 49 49 38.031 49 24.5C49 10.969 38.031 0 24.5 0C10.969 0 0 10.969 0 24.5C0 38.031 10.969 49 24.5 49Z"
        fill="#584DCB"
      />
      <path
        d="M30.129 22.2695L26.0541 23.8689C25.6451 23.4998 25.0931 23.2709 24.4815 23.2709C23.2229 23.2709 22.2031 24.2313 22.2031 25.4167C22.2031 26.6021 23.2229 27.5625 24.4815 27.5625C25.7261 27.5625 26.7346 26.6212 26.7559 25.4539L30.8297 23.8555C31.2945 23.6733 31.5143 23.1698 31.3198 22.733C31.1264 22.2953 30.5928 22.0864 30.129 22.2695Z"
        fill="#DDDAF9"
      />
      <path
        d="M24.5005 11.4844C16.9007 11.4844 10.7188 17.6543 10.7188 25.2371C10.7188 28.9088 12.1535 32.3608 14.7581 34.96C15.1011 35.3024 15.6514 35.3034 16.0004 34.9728C16.0064 34.9679 16.0124 34.9679 16.0183 34.963L17.4639 33.5194C17.8119 33.1712 17.8119 32.6072 17.4639 32.2599C17.1159 31.9126 16.5507 31.9116 16.2017 32.2599L15.4194 33.0405C13.7329 31.0934 12.7355 28.6921 12.5471 26.1286H13.6565C14.1493 26.1286 14.5489 25.7298 14.5489 25.2381C14.5489 24.7464 14.1493 24.3476 13.6565 24.3476H12.5481C12.7434 21.7168 13.7904 19.3235 15.4194 17.4376L16.2007 18.2173C16.3752 18.3914 16.6033 18.4785 16.8323 18.4785C17.0613 18.4785 17.2883 18.3914 17.4629 18.2173C17.8119 17.869 17.8119 17.305 17.4629 16.9578L16.6826 16.1761C18.5724 14.5496 20.9718 13.5057 23.6081 13.3108V14.416C23.6081 14.9077 24.0077 15.3065 24.5005 15.3065C24.9933 15.3065 25.3929 14.9077 25.3929 14.416V13.3108C28.0292 13.5057 30.4286 14.5496 32.3184 16.1761L31.5371 16.9558C31.1891 17.304 31.1891 17.868 31.5371 18.2153C31.7117 18.3895 31.9397 18.4765 32.1677 18.4765C32.3957 18.4765 32.6248 18.3895 32.7993 18.2153L33.5806 17.4357C35.2106 19.3215 36.2566 21.7148 36.4519 24.3457H35.3445C34.8517 24.3457 34.4521 24.7444 34.4521 25.2361C34.4521 25.7278 34.8517 26.1266 35.3445 26.1266H36.4539C36.2655 28.6901 35.2681 31.0914 33.5815 33.0386L32.7993 32.2579C32.4503 31.9096 31.8861 31.9096 31.5371 32.2579C31.1881 32.6062 31.1881 33.1702 31.5371 33.5175L32.9827 34.961L32.9866 34.962C33.1602 35.1322 33.3852 35.2182 33.6113 35.2182C33.8393 35.2182 34.0674 35.1312 34.2419 34.9571C36.8465 32.3578 38.2812 28.9058 38.2812 25.2342C38.2822 17.6543 32.1003 11.4844 24.5005 11.4844Z"
        fill="white"
      />
    </svg>
  );
}

export function SecureIcon({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="24"
      height="31"
      viewBox="0 0 24 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1172 0.1875L0.25 4.50318V14.9424C0.252833 16.9798 0.736171 18.9879 1.66082 20.8034C2.58546 22.619 3.92523 24.1909 5.57148 25.3914L12.1172 30.1521L18.6629 25.3914C20.3091 24.1909 21.6489 22.619 22.5736 20.8034C23.4982 18.9879 23.9815 16.9798 23.9844 14.9424V4.50318L12.1172 0.1875ZM22.0065 14.9424C22.0038 16.6679 21.5943 18.3685 20.8113 19.9062C20.0283 21.4438 18.8938 22.7752 17.4999 23.7923L12.1172 27.7075L6.73446 23.7923C5.34056 22.7752 4.20606 21.4438 3.42306 19.9062C2.64005 18.3685 2.23059 16.6679 2.22784 14.9424V5.88773L12.1172 2.29197L22.0065 5.88773V14.9424Z"
        fill="white"
      />
      <path
        d="M7.87127 12.6559L6.47293 14.0543L10.8806 18.462L17.7606 11.5819L16.3623 10.1836L10.8806 15.6652L7.87127 12.6559Z"
        fill="#DDDAF9"
      />
    </svg>
  );
}

export function ResponsiveIcon({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6551_5742)">
        <path
          d="M22.6638 8.57533H18.7693V3.59298C18.7693 1.75033 17.2465 0.25 15.3732 0.25H3.64604C1.77278 0.25 0.25 1.75033 0.25 3.59298V10.1679C0.25 12.0106 1.77278 13.5109 3.64604 13.5109H7.41971V15.4418H6.90894C5.12534 15.4418 3.67321 16.8699 3.67321 18.627V18.8864C3.67321 19.2555 3.97749 19.555 4.35243 19.555H12.7013V22.7442C12.7013 23.8501 13.6154 24.75 14.7389 24.75H22.6638C23.7873 24.75 24.7015 23.8501 24.7015 22.7442V10.5798C24.7015 9.47394 23.7873 8.57533 22.6638 8.57533ZM1.60842 10.1679V3.59298C1.60842 2.48712 2.52263 1.58719 3.64604 1.58719H15.3732C16.4966 1.58719 17.4109 2.48712 17.4109 3.59298V8.57533H14.7402C13.6168 8.57533 12.7026 9.47528 12.7026 10.5811V12.1751H10.919H8.09891H3.64604C2.52263 12.1737 1.60842 11.2751 1.60842 10.1679ZM10.2398 13.5109V15.2773H8.77814V13.5109H10.2398ZM11.5982 13.5109H12.7026V15.5181C12.507 15.4819 12.31 15.4418 12.109 15.4418H11.5982V13.5109ZM5.07918 18.2192C5.26935 17.3968 6.01648 16.7803 6.91031 16.7803H12.1103C12.3141 16.7803 12.5124 16.8231 12.7039 16.886V18.2192H5.07918ZM23.3431 22.7456C23.3431 23.1146 23.0374 23.4141 22.6638 23.4141H14.7402C14.3667 23.4141 14.061 23.1146 14.061 22.7456V10.5811C14.061 10.2121 14.3667 9.91253 14.7402 9.91253H22.6638C23.0374 9.91253 23.3431 10.2121 23.3431 10.5811V22.7456Z"
          fill="white"
        />
        <path
          d="M20.1989 20.7695H17.2063C16.8314 20.7695 16.5271 21.0691 16.5271 21.4381C16.5271 21.8072 16.8314 22.1067 17.2063 22.1067H20.1989C20.5738 22.1067 20.8781 21.8072 20.8781 21.4381C20.8781 21.0691 20.5738 20.7695 20.1989 20.7695Z"
          fill="#DDDAF9"
        />
      </g>
      <defs>
        <clipPath id="clip0_6551_5742">
          <rect
            width="24.5"
            height="24.5"
            fill="white"
            transform="translate(0.25 0.25)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function CustomizableIcon({ className }: Props) {
  return (
    <svg
      className={cn("", className)}
      width="26"
      height="24"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6489 15.3635C13.3108 15.3635 12.9828 15.4266 12.6698 15.5299V13.623C12.6698 13.2591 12.3752 12.9648 12.0117 12.9648H8.59956C8.5664 12.9648 8.538 12.979 8.50615 12.9837C8.45799 12.9907 8.41029 12.9946 8.36413 13.0123C8.31758 13.0302 8.27937 13.0596 8.23864 13.0871C8.21215 13.1048 8.18191 13.1134 8.15756 13.1354C8.1535 13.1391 8.1522 13.1443 8.1483 13.148C8.11132 13.1832 8.08628 13.2273 8.05826 13.2702C8.03904 13.2997 8.0137 13.3254 7.99969 13.3571C7.98552 13.389 7.98338 13.4254 7.97442 13.46C7.96171 13.5092 7.94579 13.557 7.94456 13.6077C7.94449 13.613 7.9415 13.6175 7.9415 13.623C7.9415 13.6559 7.95559 13.6841 7.96026 13.7158C7.96715 13.7644 7.97113 13.8123 7.98912 13.8588C8.00719 13.9056 8.03659 13.944 8.06431 13.9849C8.08192 14.0111 8.09026 14.041 8.11208 14.0651C8.40432 14.3875 8.56556 14.8127 8.56556 15.2607C8.56556 16.2565 7.75561 17.0655 6.75976 17.0655C5.76399 17.0655 4.95403 16.2565 4.95403 15.2607C4.95403 14.8127 5.11527 14.3875 5.40789 14.0651C5.43056 14.0399 5.43952 14.0087 5.45766 13.9814C5.4843 13.9415 5.51294 13.9041 5.53047 13.8588C5.54846 13.812 5.55252 13.7638 5.55941 13.7149C5.564 13.6836 5.57802 13.6557 5.57802 13.6231C5.57802 13.6175 5.57503 13.6131 5.57495 13.6076C5.57373 13.5553 5.55765 13.5059 5.5441 13.4551C5.53537 13.4226 5.53353 13.3878 5.52013 13.3575C5.5049 13.323 5.47764 13.2948 5.4562 13.2627C5.42941 13.2229 5.40644 13.1815 5.37191 13.1486C5.3677 13.1445 5.36624 13.1389 5.36188 13.135C5.33608 13.1115 5.304 13.1023 5.27567 13.0837C5.23655 13.0579 5.20033 13.0297 5.15593 13.0125C5.10877 12.9943 5.05999 12.9901 5.01061 12.9832C4.97968 12.9788 4.95204 12.9649 4.91981 12.9649H1.50811C1.14474 12.9649 0.849976 13.2591 0.849976 13.6231V23.3489C0.849976 23.7128 1.14474 24.0076 1.50811 24.0076H12.0118C12.3752 24.0076 12.6699 23.7128 12.6699 23.3489V21.442C12.9829 21.5453 13.3109 21.6084 13.6489 21.6084C15.3706 21.6084 16.7719 20.2072 16.7719 18.4855C16.7719 16.7638 15.3706 15.3635 13.6489 15.3635ZM13.6489 20.2912C13.2014 20.2912 12.7772 20.13 12.4533 19.8373C12.4284 19.8149 12.3976 19.8062 12.3706 19.7882C12.3304 19.7612 12.2925 19.7324 12.2466 19.7147C12.203 19.6979 12.1579 19.6945 12.1123 19.6875C12.0782 19.682 12.0475 19.6672 12.0117 19.6672C12.0055 19.6672 12.0005 19.6705 11.9943 19.6707C11.9496 19.6719 11.9078 19.6869 11.8643 19.697C11.8237 19.7066 11.7813 19.71 11.744 19.7268C11.7165 19.739 11.6943 19.7615 11.6684 19.7777C11.6212 19.8075 11.5738 19.8355 11.5357 19.8758C11.5321 19.8796 11.5271 19.8809 11.5237 19.8848C11.503 19.9077 11.4952 19.9362 11.4783 19.961C11.4494 20.003 11.4194 20.0429 11.4009 20.0911C11.3836 20.1363 11.3799 20.1829 11.373 20.23C11.368 20.2626 11.3536 20.2918 11.3536 20.3259V22.6903H2.16624V14.2816H3.8036C3.70063 14.5946 3.63769 14.9225 3.63769 15.2606C3.63769 16.9823 5.03794 18.3826 6.75968 18.3826C8.48134 18.3826 9.88167 16.9823 9.88167 15.2606C9.88167 14.9223 9.81866 14.5944 9.71576 14.2816H11.3536V16.6461C11.3536 16.68 11.368 16.7093 11.373 16.7419C11.3799 16.7891 11.3836 16.8357 11.4009 16.8808C11.4194 16.929 11.4494 16.9689 11.4783 17.0109C11.4952 17.0357 11.503 17.0643 11.5237 17.0872C11.5272 17.0911 11.5322 17.0923 11.5357 17.0961C11.5726 17.1352 11.6187 17.1622 11.6643 17.1914C11.6917 17.2089 11.7153 17.2326 11.7447 17.2456C11.7803 17.2615 11.8208 17.2645 11.8595 17.2739C11.9045 17.2848 11.9479 17.2999 11.994 17.3011C12.0002 17.3013 12.0054 17.3047 12.0116 17.3047C12.0488 17.3047 12.0807 17.2895 12.1161 17.2837C12.1599 17.2765 12.2032 17.2736 12.2452 17.2576C12.2925 17.2394 12.3316 17.21 12.373 17.182C12.3992 17.1645 12.4291 17.1562 12.4533 17.1346C12.7771 16.8419 13.2013 16.6807 13.6489 16.6807C14.6446 16.6807 15.4546 17.4896 15.4546 18.4855C15.4546 19.4813 14.6447 20.2912 13.6489 20.2912Z"
        fill="white"
      />
      <path
        d="M25.5986 6.67275L17.188 0.380844C17.0476 0.276566 16.8736 0.232542 16.6995 0.256276C16.5265 0.281542 16.3712 0.373953 16.2663 0.513909L15.1242 2.0408C14.9355 1.77099 14.7106 1.52407 14.4398 1.32134C13.0593 0.289964 11.1003 0.57179 10.0693 1.95129C9.03841 3.32934 9.32123 5.2898 10.6993 6.32125C10.9692 6.52315 11.2657 6.6778 11.5771 6.78262L10.4407 8.30154C10.2231 8.59233 10.2825 9.00469 10.5732 9.22274L13.3051 11.2668C13.366 11.3123 13.4323 11.3447 13.5009 11.3664C13.5079 11.3687 13.5158 11.3679 13.5228 11.3699C13.5809 11.3862 13.64 11.3979 13.6992 11.3979C13.7088 11.3979 13.7175 11.3918 13.7272 11.3914C13.7388 11.3908 13.7493 11.396 13.7609 11.3949C13.8197 11.3895 13.8706 11.3656 13.9233 11.346C13.9483 11.337 13.9743 11.3357 13.9981 11.3235C14.0836 11.2798 14.1564 11.2186 14.2146 11.1443C14.218 11.14 14.2234 11.1387 14.2267 11.1343C14.2482 11.1055 14.2548 11.0716 14.2711 11.0408C14.2924 11.0005 14.3166 10.9631 14.3291 10.9187C14.3436 10.8679 14.3435 10.8171 14.3455 10.7651C14.3467 10.7356 14.3574 10.7086 14.3547 10.6784C14.3142 10.2442 14.4397 9.80768 14.7078 9.44967C15.3031 8.65312 16.4383 8.48897 17.2354 9.08523C17.6221 9.37403 17.8723 9.79627 17.9415 10.2734C18.0098 10.7505 17.8891 11.2262 17.5993 11.6123C17.3314 11.9713 16.9476 12.2146 16.5205 12.2977C16.4843 12.3048 16.4559 12.3258 16.4225 12.3382C16.3804 12.3537 16.3381 12.3649 16.2994 12.389C16.256 12.4162 16.223 12.4529 16.1876 12.4887C16.1655 12.5107 16.1381 12.5243 16.1189 12.5499C16.1156 12.5543 16.1153 12.5596 16.1122 12.5641C16.0828 12.6055 16.0668 12.6534 16.0476 12.7004C16.0342 12.7333 16.0142 12.7635 16.0064 12.7975C15.9986 12.8316 16.0034 12.8678 16.0012 12.9034C15.9981 12.9544 15.9918 13.0043 16.0003 13.0545C16.0012 13.0598 15.9992 13.0647 16.0002 13.0701C16.0105 13.1226 16.0346 13.1679 16.0561 13.2146C16.066 13.2365 16.0693 13.2601 16.0816 13.2809C16.1238 13.3517 16.179 13.4117 16.2427 13.4614C16.2462 13.4641 16.2478 13.4684 16.2514 13.4711L18.9837 15.5152C19.0984 15.6012 19.2368 15.6467 19.3783 15.6467C19.4099 15.6467 19.4406 15.6437 19.4723 15.6397C19.6453 15.6151 19.8006 15.5221 19.9054 15.3827L25.731 7.59403C25.9487 7.30317 25.8894 6.89034 25.5986 6.67275ZM19.246 14.0663L17.9344 13.0852C18.2042 12.8967 18.451 12.672 18.6536 12.4015C19.153 11.733 19.3636 10.9107 19.244 10.0855C19.1254 9.26026 18.6923 8.53092 18.0247 8.03105C16.6432 6.99967 14.6852 7.2815 13.6538 8.661C13.4513 8.93157 13.3053 9.23185 13.2005 9.54407L11.8891 8.56308L13.3057 6.66938C13.3255 6.64281 13.3313 6.61158 13.3465 6.58325C13.3699 6.54053 13.395 6.50018 13.4085 6.45256C13.4218 6.40493 13.4213 6.35724 13.4238 6.30854C13.4254 6.27639 13.4368 6.24691 13.4338 6.21391C13.4333 6.2084 13.4297 6.20419 13.4291 6.19867C13.4228 6.14516 13.4018 6.09585 13.3826 6.04532C13.3713 6.016 13.3669 5.98361 13.3517 5.95666C13.3277 5.91325 13.2899 5.87872 13.2559 5.84113C13.2325 5.81594 13.2147 5.78646 13.1878 5.7651C13.1817 5.7602 13.179 5.75293 13.1726 5.74818C13.1335 5.71886 13.0883 5.70714 13.0454 5.6877C13.017 5.67468 12.9919 5.65684 12.9617 5.64781C12.9063 5.63158 12.8505 5.63012 12.7937 5.62882C12.7678 5.6279 12.7437 5.61795 12.7173 5.62017C12.2827 5.65876 11.8461 5.53457 11.4886 5.26706C10.691 4.67079 10.5273 3.53652 11.1237 2.73996C11.7195 1.94241 12.8543 1.77926 13.6514 2.37553C14.0103 2.64403 14.2535 3.02723 14.3366 3.45445C14.3432 3.48737 14.3626 3.51294 14.3735 3.54372C14.3896 3.5895 14.4025 3.63536 14.4286 3.67709C14.4541 3.71759 14.4888 3.74791 14.5219 3.78144C14.5454 3.80556 14.5606 3.83519 14.5883 3.85586C14.5929 3.85931 14.5984 3.85961 14.603 3.86283C14.6416 3.89032 14.6869 3.90486 14.7308 3.92347C14.767 3.93878 14.801 3.96075 14.8385 3.96925C14.8636 3.97492 14.8908 3.97025 14.9169 3.973C14.9768 3.97905 15.036 3.98525 15.0949 3.97492C15.0996 3.97423 15.1038 3.97591 15.1084 3.97507C15.1378 3.96933 15.1603 3.95157 15.1878 3.94222C15.2376 3.92561 15.2871 3.91114 15.3322 3.88266C15.3727 3.85709 15.4031 3.82195 15.4367 3.78864C15.4603 3.76537 15.4894 3.75036 15.5099 3.72295L16.926 1.82918L24.2825 7.33287L19.246 14.0663Z"
        fill="#DDDAF9"
      />
    </svg>
  );
}
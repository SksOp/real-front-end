import { ClassValue } from "clsx";

export interface IntroCardProps {
  key?: string | number;
  title: string;
  description: string;
  avatar: React.ReactNode;
  linkto?: string;
  avatarBg?: ClassValue;
  soon?: boolean;
}

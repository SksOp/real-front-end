import { ClassValue } from "clsx";

export interface PropertiescardProps {
  imageUrl: string;
  name: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number;
  className?: ClassValue;
}

export interface ListingDataType {
  imageURLs: string[];
  price: string;
  title: string;
  location: string;
  permitNumber: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  articleURL?: string;
  amenities: Record<string, string>;
  referenceNumber: string;
}

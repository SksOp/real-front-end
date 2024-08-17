export interface PropertyDetailsProps {
  propertyHeader: {
    imgURL: string;
    price: number;
    name: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
  };
  gallery: string[];
  propertyDescription: string;
  amenities: {
    icon: React.ReactSVGElement;
    title: string;
  }[];
  keyInformation: {
    reference: string;
    brokenORN: string;
    listed: string;
    dldPermit: string;
    dldQRCode: string;
  };
  mortageCalculator: {
    description: string;
    downPayment: number;
    monthlyPayment: number;
    interestRate: number;
    duration: number;
  };
}

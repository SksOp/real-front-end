import {
  ACIcon,
  SwimmingPoolIcon,
  BalconyIcon,
  PlayAreaIcon,
  // SecurityIcon, // Hypothetical SVG for Security
  // SpaIcon,      // Hypothetical SVG for Shared Spa
  // ConciergeIcon,// Hypothetical SVG for Concierge
  // MaidServiceIcon, // Hypothetical SVG for Maid Service
  // ParkingIcon,  // Hypothetical SVG for Covered Parking
  // WardrobeIcon, // Hypothetical SVG for Built in Wardrobes
  // ClosetIcon,   // Hypothetical SVG for Walk-in Closet
  // LandmarkIcon, // Hypothetical SVG for View of Landmark
  // WaterViewIcon,// Hypothetical SVG for View of Water
  // GymIcon,      // Hypothetical SVG for Shared Gym
  // PetsIcon,     // Hypothetical SVG for Pets Allowed
  // Concierge24Icon, // Hypothetical SVG for 24 Hours Concierge
  // HealthClubIcon,  // Hypothetical SVG for Gym or Health Club
  // KitchenIcon,     // Hypothetical SVG for Kitchen Appliances
  // StudyIcon,       // Hypothetical SVG for Study
  // BarbecueIcon,    // Hypothetical SVG for Barbecue Area
  // CentralHeatingIcon // Hypothetical SVG for Central Heating
} from "@/public/svg/aminitiesIcon";

type Amenity = {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
};

export const AmenitiesMap: Record<string, Amenity> = {
  "amenity-AC": { svg: ACIcon, title: "Air Conditioner" },
  "amenity-SE": { svg: ACIcon, title: "Security" },
  "amenity-SP": { svg: SwimmingPoolIcon, title: "Swimming Pool" },
  "amenity-SS": { svg: ACIcon, title: "Shared Spa" },
  "amenity-CS": { svg: ACIcon, title: "Concierge" },
  "amenity-MS": { svg: ACIcon, title: "Maid Service" },
  "amenity-CP": { svg: ACIcon, title: "Covered Parking" },
  "amenity-BW": { svg: ACIcon, title: "Built in Wardrobes" },
  "amenity-WC": { svg: ACIcon, title: "Walk-in Closet" },
  "amenity-BA": { svg: BalconyIcon, title: "Balcony" },
  "amenity-BL": { svg: ACIcon, title: "View of Landmark" },
  "amenity-VW": { svg: ACIcon, title: "View of Water" },
  "amenity-SY": { svg: ACIcon, title: "Shared Gym" },
  "amenity-PA": { svg: ACIcon, title: "Pets Allowed" },
  "amenity-24C": { svg: ACIcon, title: "24 Hours Concierge" },
  "amenity-GH": { svg: ACIcon, title: "Gym or Health Club" },
  "amenity-KA": { svg: ACIcon, title: "Kitchen Appliances" },
  "amenity-ST": { svg: ACIcon, title: "Study" },
  "amenity-PR": { svg: PlayAreaIcon, title: "Children's Play Area" },
  "amenity-BR": { svg: ACIcon, title: "Barbecue Area" },
  "amenity-Parking Spaces": { svg: ACIcon, title: "Parking Spaces" },
  "amenity-Security Staff": { svg: ACIcon, title: "Security Staff" },
  "amenity-Central Heating": { svg: ACIcon, title: "Central Heating" },
  "amenity-Balcony or Terrace": {
    svg: BalconyIcon,
    title: "Balcony or Terrace",
  },
  "amenity-Gym or Health Club": { svg: ACIcon, title: "Gym or Health Club" },
  "amenity-Swimming Pool": { svg: SwimmingPoolIcon, title: "Swimming Pool" },
  "amenity-24 Hours Concierge": { svg: ACIcon, title: "24 Hours Concierge" },
  "amenity-Centrally Air-Conditioned": {
    svg: ACIcon,
    title: "Centrally Air-Conditioned",
  },
};

// exort const AminitiesArray = [<ACIcon/>, SwimmingPoolIcon, BalconyIcon, PlayAreaIcon]

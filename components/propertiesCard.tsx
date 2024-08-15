import React from 'react';
import { Card } from './ui/card';
import {
  AreaSizeIcon,
  BathIcon,
  BedIcon,
  LightBulbIcon,
  LocationIcon,
} from '@/public/svg/icons';
import { PropertiescardProps } from '@/types/propertyCard';
import Image from 'next/image';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
  }).format(price);
}

function PropertiesCard({
  imageUrl,
  name,
  location,
  bedrooms,
  bathrooms,
  area,
  price,
}: PropertiescardProps) {
  return (
    <Card className="w-full p-4 border-0 flex justify-start gap-0 ">
      <div className="flex-grow ">
        <Image src={imageUrl} alt={name} className="object-cover rounded-lg " />
      </div>
      <div className="flex w-2/3 flex-col justify-between">
        <div>
          <h3 className="text-lg font-extrabold">{name}</h3>
          <div className="flex justify-start text-sm items-center gap-2">
            <LocationIcon className="w-4 h-4" />
            <p className="text-muted font-light">{location}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-muted text-bold mt-2">
            <div className="flex gap-1 justify-start items-center">
              <BedIcon className="w-4 h-4" />
              <p>{bedrooms} Bedrooms</p>
            </div>
            <div className="flex gap-1 justify-start items-center">
              <BathIcon className="w-4 h-4" />
              <p>{bathrooms} Bathrooms</p>
            </div>

            <div className="flex gap-1 justify-start items-center">
              <AreaSizeIcon className="w-[0.9rem] h-[0.9rem]" />
              <p>{area} sqft</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-extrabold">{formatPrice(price)}</h3>
          <div className="flex justify-end items-center gap-2 cursor-pointer">
            <LightBulbIcon className="w-5 h-5" />
            <p className="text-primary-foreground text-sm font-semibold">
              See Insights
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default PropertiesCard;

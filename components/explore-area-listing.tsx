import React from 'react';
import InsightCard from './insightCard';
import ExploreFormats from './explore-formats';
import { Card } from './ui/card';
import Image from 'next/image';

function ExploreActiveListing() {
  return (
    <ExploreFormats title={'Active listings (50)'}>
      <div className="w-full  flex justify-center items-center gap-4">
        <Card className="border-0 bg-[#F2F2F2] w-1/2 px-8 py-6">
          <div className="flex gap-4 justify-between items-start leading-none">
            <h3 className="text-base text-muted font-semibold">
              Property Finder
            </h3>
            <Image src="/pf.png" alt="pf" className="object-cover" width={30} height={30} />
          </div>
          <p className="text-2xl font-bold">50</p>
        </Card>
        <Card className="border-0 bg-[#F2F2F2] w-1/2   px-8 py-6">
          <div className="flex gap-4 justify-between items-start leading-none">
            <h3 className="text-base text-muted font-semibold">Bayut</h3>
            <Image src="/bayut.png" alt="pf" className="object-cover" width={20} height={20} />
          </div>
          <p className="text-2xl mt-5 font-bold">50</p>
        </Card>
      </div>
      <InsightCard>
        <span>
          Your ads are <span className="font-bold text-secondary">30% </span>
          less than the average number of ads by agents and{' '}
          <span className="font-bold text-secondary">30%</span> less than the
          average number of ads by agency/broker.
        </span>
      </InsightCard>
    </ExploreFormats>
  );
}

export default ExploreActiveListing;

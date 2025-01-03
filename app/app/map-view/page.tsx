import Exceptions from "@/components/exceptions";
import Layout from "@/layout/secondary";
import { MapView } from "@/public/svg/exceptions";
import React from "react";

function MapViewPage() {
  return (
    <Layout page={"map-view"} title="Map View">
      <div className="flex w-full justify-center px-2 items-center h-[calc(100vh-1rem)]">
        <Exceptions
          svg={<MapView />}
          title="Visualize insights with mapview"
          description="You can visualize insights with map view, all your properties and by each area in Dubai."
          buttonText="Request Access"
        />
      </div>
    </Layout>
  );
}

export default MapViewPage;

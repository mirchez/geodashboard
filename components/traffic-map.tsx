"use client";

import MapWrapper from "./mapWrapper";

interface Filters {
  accidents: boolean;
  roadClosures: boolean;
  vehicles: boolean;
}

interface TrafficMapProps {
  filters: Filters;
}

export default function TrafficMap({ filters }: TrafficMapProps) {
  return (
    <div className="w-full h-full relative bg-muted/20">
      <MapWrapper filters={filters} />
    </div>
  );
}

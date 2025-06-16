"use client";

import MapWrapper from "./mapWrapper";
import { City } from "@/lib/cities";

interface Filters {
  accidents: boolean;
  roadClosures: boolean;
  vehicles: boolean;
  selectedCity: City;
}

interface TrafficMapProps {
  filters: Filters;
  mapStyle: string;
}

export default function TrafficMap({ filters, mapStyle }: TrafficMapProps) {
  return (
    <div className="w-full h-full relative bg-muted/20">
      <MapWrapper filters={filters} mapStyle={mapStyle} />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
import { getOverpassQuery } from "@/lib/getOverpassQuery";
import { FeatureCollection, Point } from "geojson";

interface Filters {
  accidents: boolean;
  roadClosures: boolean;
  vehicles: boolean;
}

interface MapWrapperProps {
  filters: {
    accidents: boolean;
    roadClosures: boolean;
    vehicles: boolean;
  };
}

export default function MapWrapper({ filters }: MapWrapperProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const fetchOverpassData = async (filters: Filters) => {
    try {
      const overpassQuery = getOverpassQuery(filters);

      const url = "https://overpass-api.de/api/interpreter";

      const response = await axios.post(
        url,
        new URLSearchParams({ data: overpassQuery }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const elements = response.data.elements;

      return elements.map((el: any) => ({
        coordinates: [el.lon, el.lat],
      }));
    } catch (error) {
      console.error("Error fetching Overpass data:", error);
      return [];
    }
  };

  useEffect(() => {
    // Init map once
    if (mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style:
        "https://api.maptiler.com/maps/darkmatter/style.json?key=sGxwSmiwQnfEYdHrtByj",
      center: [-58.3816, -34.6037],
      zoom: 12,
    });

    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const updateMapData = async () => {
      const features = await fetchOverpassData(filters);

      const source = map.getSource("accidents") as
        | maplibregl.GeoJSONSource
        | undefined;

      const geojsonData: FeatureCollection<Point> = {
        type: "FeatureCollection",
        features: features.map((feature: any) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: feature.coordinates,
          },
        })),
      };

      if (source) {
        // Update existing source
        source.setData(geojsonData);
      } else {
        // First time: add source + layer
        map.addSource("accidents", {
          type: "geojson",
          data: geojsonData,
        });

        map.addLayer({
          id: "accidents-heat",
          type: "heatmap",
          source: "accidents",
          paint: {
            "heatmap-weight": 1,
            "heatmap-intensity": 1,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(0, 0, 0, 0)",
              0.2,
              "green",
              0.4,
              "yellow",
              0.6,
              "orange",
              0.8,
              "red",
            ],
            "heatmap-radius": 20,
          },
        });
      }
    };

    updateMapData();
  }, [filters]);

  return (
    <div className="relative h-full w-full min-h-[500px]">
      <div
        ref={mapContainerRef}
        className="h-full w-full rounded-lg shadow-lg"
      />
      <div className="absolute bottom-2 left-2 text-xs text-gray-400">
        ©{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenStreetMap
        </a>{" "}
        contributors
      </div>
    </div>
  );
}

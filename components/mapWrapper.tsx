"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
import { getOverpassQuery } from "@/lib/getOverpassQuery";
import { FeatureCollection, Point } from "geojson";
import { City, cities } from "@/lib/cities";

interface Filters {
  accidents: boolean;
  roadClosures: boolean;
  vehicles: boolean;
  selectedCity: City;
}

interface MapWrapperProps {
  filters: Filters;
}

// Default city (Buenos Aires)
const defaultCity =
  cities.find((city) => city.id === "buenos-aires") || cities[0];

export default function MapWrapper({ filters }: MapWrapperProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const selectedCity = filters.selectedCity || defaultCity;

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

      return elements.map((el: { lon: number; lat: number }) => ({
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
      center: [selectedCity.coordinates.lng, selectedCity.coordinates.lat],
      zoom: 12,
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add scale control
    map.addControl(new maplibregl.ScaleControl(), "bottom-right");

    // Add city markers
    cities.forEach((city) => {
      const el = document.createElement("div");
      el.className = "city-marker";
      el.style.width = "10px";
      el.style.height = "10px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = "#ff4444";
      el.style.border = "2px solid white";
      el.style.cursor = "pointer";

      new maplibregl.Marker(el)
        .setLngLat([city.coordinates.lng, city.coordinates.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `
              <h3 style="color: red; font-size: 2em; font-weight: bold;">${city.name}</h3>
              <p style="color: red; font-size: 1.5em; font-weight: bold;">${city.country}</p>
            `
          )
        )
        .addTo(map);
    });
  }, []);

  // Update map center when selected city changes
  useEffect(() => {
    if (!mapRef.current || !selectedCity) return;

    mapRef.current.flyTo({
      center: [selectedCity.coordinates.lng, selectedCity.coordinates.lat],
      zoom: 12,
      essential: true,
    });
  }, [
    selectedCity.coordinates.lat,
    selectedCity.coordinates.lng,
    selectedCity,
  ]);

  useEffect(() => {
    if (!mapRef.current || !selectedCity) return;

    const map = mapRef.current;

    const updateMapData = async () => {
      const features = await fetchOverpassData({ ...filters, selectedCity });

      const source = map.getSource("accidents") as
        | maplibregl.GeoJSONSource
        | undefined;

      const geojsonData: FeatureCollection<Point> = {
        type: "FeatureCollection",
        features: features.map(
          (feature: { coordinates: [number, number] }) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: feature.coordinates,
            },
            properties: {
              city: selectedCity.name,
            },
          })
        ),
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
  }, [filters, selectedCity]);

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

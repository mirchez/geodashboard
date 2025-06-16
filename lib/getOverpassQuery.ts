// src/lib/getOverpassQuery.ts

import { City } from "./cities";

export const getOverpassQuery = (filters: {
  accidents: boolean;
  roadClosures: boolean;
  vehicles: boolean;
  selectedCity: City;
}) => {
  const queries = [];
  const lat = filters.selectedCity.coordinates.lat;
  const lng = filters.selectedCity.coordinates.lng;
  const radius = filters.selectedCity.radius || 5000; // Default radius of 5km

  if (filters.accidents) {
    // 🚥 Simulating "accidents":
    // - highway=traffic_signals → TRAFFIC LIGHTS → Always lots of results (good for heatmap)
    // - highway=speed_camera → SPEED CAMERAS → along main roads
    // ❗️ These are not real-time accidents, but work great as visual proxies for your demo.
    queries.push(`
        node["highway"="traffic_signals"](around:${radius},${lat},${lng});
        node["highway"="speed_camera"](around:${radius},${lat},${lng});
      `);
  }

  if (filters.vehicles) {
    // 🚗 Simulating "vehicles":
    // - amenity=parking → PARKING LOTS
    // ✅ Fairly common → in urban centers → works as a proxy for areas with high vehicle density.
    queries.push(`
        node["amenity"="parking"](around:${radius},${lat},${lng});
      `);
  }

  if (filters.roadClosures) {
    // 🚧 Simulating "road closures":
    // - barrier=* → Any type of BARRIER → for example:
    //   - barrier=gate
    //   - barrier=bollard (posts)
    //   - barrier=lift_gate (automatic gates)
    // ✅ Good to represent physical street closures or restrictions.
    queries.push(`
        node["barrier"](around:${radius},${lat},${lng});
      `);
  }

  return `
      [out:json];
      ${queries.join("\n")}
      out;
    `;
};

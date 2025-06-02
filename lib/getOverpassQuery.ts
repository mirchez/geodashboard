// src/lib/getOverpassQuery.ts

export const getOverpassQuery = (filters: {
  accidents: boolean;
  roadClosures: boolean;
  vehicles: boolean;
}) => {
  const queries = [];

  if (filters.accidents) {
    // 🚥 Simulating "accidents":
    // - highway=traffic_signals → TRAFFIC LIGHTS → Always lots of results (good for heatmap)
    // - highway=speed_camera → SPEED CAMERAS → along main roads
    // ❗️ These are not real-time accidents, but work great as visual proxies for your demo.
    queries.push(`
        node["highway"="traffic_signals"](around:5000,-34.6037,-58.3816);
        node["highway"="speed_camera"](around:5000,-34.6037,-58.3816);
      `);
  }

  if (filters.vehicles) {
    // 🚗 Simulating "vehicles":
    // - amenity=parking → PARKING LOTS
    // ✅ Fairly common → in urban centers → works as a proxy for areas with high vehicle density.
    queries.push(`
        node["amenity"="parking"](around:5000,-34.6037,-58.3816);
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
        node["barrier"](around:5000,-34.6037,-58.3816);
      `);
  }

  return `
      [out:json];
      ${queries.join("\n")}
      out;
    `;
};

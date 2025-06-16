export interface City {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
  radius?: number;
}

export const cities: City[] = [
  // Major World Cities
  {
    id: "new-york",
    name: "New York",
    coordinates: { lat: 40.7128, lng: -74.006 },
    country: "United States",
  },
  {
    id: "london",
    name: "London",
    coordinates: { lat: 51.5074, lng: -0.1278 },
    country: "United Kingdom",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    country: "Japan",
  },
  {
    id: "paris",
    name: "Paris",
    coordinates: { lat: 48.8566, lng: 2.3522 },
    country: "France",
  },
  {
    id: "sydney",
    name: "Sydney",
    coordinates: { lat: -33.8688, lng: 151.2093 },
    country: "Australia",
  },
  {
    id: "dubai",
    name: "Dubai",
    coordinates: { lat: 25.2048, lng: 55.2708 },
    country: "UAE",
  },
  {
    id: "singapore",
    name: "Singapore",
    coordinates: { lat: 1.3521, lng: 103.8198 },
    country: "Singapore",
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    coordinates: { lat: 22.3193, lng: 114.1694 },
    country: "China",
  },
  {
    id: "shanghai",
    name: "Shanghai",
    coordinates: { lat: 31.2304, lng: 121.4737 },
    country: "China",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    coordinates: { lat: 19.076, lng: 72.8777 },
    country: "India",
  },

  // Latin American Cities
  {
    id: "buenos-aires",
    name: "Buenos Aires",
    coordinates: { lat: -34.6037, lng: -58.3816 },
    country: "Argentina",
  },
  {
    id: "cordoba",
    name: "Córdoba",
    coordinates: { lat: -31.4201, lng: -64.1888 },
    country: "Argentina",
  },
  {
    id: "rosario",
    name: "Rosario",
    coordinates: { lat: -32.9468, lng: -60.6393 },
    country: "Argentina",
  },
  {
    id: "santiago",
    name: "Santiago",
    coordinates: { lat: -33.4489, lng: -70.6693 },
    country: "Chile",
  },
  {
    id: "valparaiso",
    name: "Valparaíso",
    coordinates: { lat: -33.0472, lng: -71.6127 },
    country: "Chile",
  },
  {
    id: "sao-paulo",
    name: "São Paulo",
    coordinates: { lat: -23.5505, lng: -46.6333 },
    country: "Brazil",
  },
  {
    id: "rio-de-janeiro",
    name: "Rio de Janeiro",
    coordinates: { lat: -22.9068, lng: -43.1729 },
    country: "Brazil",
  },
  {
    id: "mexico-city",
    name: "Ciudad de México",
    coordinates: { lat: 19.4326, lng: -99.1332 },
    country: "Mexico",
  },
  {
    id: "bogota",
    name: "Bogotá",
    coordinates: { lat: 4.711, lng: -74.0721 },
    country: "Colombia",
  },
  {
    id: "lima",
    name: "Lima",
    coordinates: { lat: -12.0464, lng: -77.0428 },
    country: "Peru",
  },

  // European Cities
  {
    id: "madrid",
    name: "Madrid",
    coordinates: { lat: 40.4168, lng: -3.7038 },
    country: "Spain",
  },
  {
    id: "rome",
    name: "Rome",
    coordinates: { lat: 41.9028, lng: 12.4964 },
    country: "Italy",
  },
  {
    id: "berlin",
    name: "Berlin",
    coordinates: { lat: 52.52, lng: 13.405 },
    country: "Germany",
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    coordinates: { lat: 52.3676, lng: 4.9041 },
    country: "Netherlands",
  },
  {
    id: "vienna",
    name: "Vienna",
    coordinates: { lat: 48.2082, lng: 16.3738 },
    country: "Austria",
  },

  // Asian Cities
  {
    id: "seoul",
    name: "Seoul",
    coordinates: { lat: 37.5665, lng: 126.978 },
    country: "South Korea",
  },
  {
    id: "bangkok",
    name: "Bangkok",
    coordinates: { lat: 13.7563, lng: 100.5018 },
    country: "Thailand",
  },
  {
    id: "manila",
    name: "Manila",
    coordinates: { lat: 14.5995, lng: 120.9842 },
    country: "Philippines",
  },
  {
    id: "jakarta",
    name: "Jakarta",
    coordinates: { lat: -6.2088, lng: 106.8456 },
    country: "Indonesia",
  },
  {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    coordinates: { lat: 3.139, lng: 101.6869 },
    country: "Malaysia",
  },

  // North American Cities
  {
    id: "los-angeles",
    name: "Los Angeles",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    country: "United States",
  },
  {
    id: "chicago",
    name: "Chicago",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    country: "United States",
  },
  {
    id: "toronto",
    name: "Toronto",
    coordinates: { lat: 43.6532, lng: -79.3832 },
    country: "Canada",
  },
  {
    id: "vancouver",
    name: "Vancouver",
    coordinates: { lat: 49.2827, lng: -123.1207 },
    country: "Canada",
  },
  {
    id: "montreal",
    name: "Montreal",
    coordinates: { lat: 45.5017, lng: -73.5673 },
    country: "Canada",
  },

  // African Cities
  {
    id: "cairo",
    name: "Cairo",
    coordinates: { lat: 30.0444, lng: 31.2357 },
    country: "Egypt",
  },
  {
    id: "johannesburg",
    name: "Johannesburg",
    coordinates: { lat: -26.2041, lng: 28.0473 },
    country: "South Africa",
  },
  {
    id: "nairobi",
    name: "Nairobi",
    coordinates: { lat: -1.2921, lng: 36.8219 },
    country: "Kenya",
  },
  {
    id: "lagos",
    name: "Lagos",
    coordinates: { lat: 6.5244, lng: 3.3792 },
    country: "Nigeria",
  },
  {
    id: "casablanca",
    name: "Casablanca",
    coordinates: { lat: 33.5731, lng: -7.5898 },
    country: "Morocco",
  },

  // Oceania Cities
  {
    id: "melbourne",
    name: "Melbourne",
    coordinates: { lat: -37.8136, lng: 144.9631 },
    country: "Australia",
  },
  {
    id: "auckland",
    name: "Auckland",
    coordinates: { lat: -36.8509, lng: 174.7645 },
    country: "New Zealand",
  },
  {
    id: "brisbane",
    name: "Brisbane",
    coordinates: { lat: -27.4698, lng: 153.0251 },
    country: "Australia",
  },
  {
    id: "perth",
    name: "Perth",
    coordinates: { lat: -31.9523, lng: 115.8613 },
    country: "Australia",
  },
  {
    id: "wellington",
    name: "Wellington",
    coordinates: { lat: -41.2866, lng: 174.7756 },
    country: "New Zealand",
  },
];

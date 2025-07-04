"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Menu } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { useMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import MapWrapper from "@/components/mapWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities, City } from "@/lib/cities";

const MAP_STYLES = [
  {
    value: `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${process.env.NEXT_PUBLIC_STADIA_API_KEY}`,
    label: "Alidade Smooth",
  },
  {
    value: `https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json?api_key=${process.env.NEXT_PUBLIC_STADIA_API_KEY}`,
    label: "Alidade Smooth Dark",
  },
  {
    value: `https://tiles.stadiamaps.com/styles/osm_bright.json?api_key=${process.env.NEXT_PUBLIC_STADIA_API_KEY}`,
    label: "OSM Bright",
  },
  {
    value: `https://tiles.stadiamaps.com/styles/alidade_satellite.json?api_key=${process.env.NEXT_PUBLIC_STADIA_API_KEY}`,
    label: "Alidade Satellite",
  },
  {
    value: `https://tiles.stadiamaps.com/styles/stamen_toner.json?api_key=${process.env.NEXT_PUBLIC_STADIA_API_KEY}`,
    label: "Stamen Toner",
  },
  {
    value: `https://tiles.stadiamaps.com/styles/stamen_terrain.json?api_key=${process.env.NEXT_PUBLIC_STADIA_API_KEY}`,
    label: "Stamen Terrain",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function TrafficDashboard() {
  const [filters, setFilters] = useState({
    accidents: true,
    roadClosures: true,
    vehicles: true,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);
  const [mapStyle, setMapStyle] = useState(MAP_STYLES[0].value);

  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const FilterContent = () => (
    <div className="mx-auto space-y-4 sm:space-y-10 p-4 sm:p-6">
      <motion.div variants={itemVariants}>
        <Label className="text-sm font-medium mb-3 sm:mb-4 block">
          Data Types
        </Label>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
            <Checkbox
              id="accidents"
              checked={filters.accidents}
              onCheckedChange={() => handleFilterChange("accidents")}
              className="h-4 w-4 sm:h-5 sm:w-5"
            />
            <Label htmlFor="accidents" className="flex-1 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base">Accidents</span>
                <Badge variant="destructive" className="text-xs">
                  High Priority
                </Badge>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
            <Checkbox
              id="roadClosures"
              checked={filters.roadClosures}
              onCheckedChange={() => handleFilterChange("roadClosures")}
              className="h-4 w-4 sm:h-5 sm:w-5"
            />
            <Label htmlFor="roadClosures" className="flex-1 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base">Road Closures</span>
                <Badge variant="secondary" className="text-xs">
                  Medium
                </Badge>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
            <Checkbox
              id="vehicles"
              checked={filters.vehicles}
              onCheckedChange={() => handleFilterChange("vehicles")}
              className="h-4 w-4 sm:h-5 sm:w-5"
            />
            <Label htmlFor="vehicles" className="flex-1 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base">Vehicles</span>
                <Badge variant="outline" className="text-xs">
                  Info
                </Badge>
              </div>
            </Label>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      className="w-full min-h-screen flex flex-col bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="p-3 sm:p-4 lg:p-6 flex justify-between items-center border-b border-border/50"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-2 lg:space-x-4 min-w-0 flex-1">
          {/* Mobile menu button */}
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="shrink-0">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-sm p-0">
                <SheetHeader className="p-4 sm:p-6 pb-2 sm:pb-4 border-b border-border/50">
                  <SheetTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-base sm:text-lg" aria-hidden="true">
                        Filters
                      </span>
                    </div>
                  </SheetTitle>
                  <SheetDescription>
                    Adjust the data filters and select a city to display on the
                    map.
                  </SheetDescription>
                </SheetHeader>
                <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
                  <FilterContent />
                  <div className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <motion.div variants={itemVariants}>
                      <Label className="text-sm font-medium mb-3 sm:mb-4 block">
                        Select City
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setSelectedCity(
                            cities.find((city) => city.id === value) ||
                              cities[0]
                          )
                        }
                        defaultValue={selectedCity.id}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder="Select a city"
                            className="text-foreground"
                          >
                            {cities.find((city) => city.id === selectedCity.id)
                              ?.name || "Select a city"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>
                  <div className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <motion.div variants={itemVariants}>
                      <Label className="text-sm font-medium mb-3 sm:mb-4 block">
                        Map Style
                      </Label>
                      <Select
                        onValueChange={setMapStyle}
                        defaultValue={mapStyle}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder="Select a map style"
                            className="text-foreground"
                          >
                            {MAP_STYLES.find(
                              (style) => style.value === mapStyle
                            )?.label || "Select a map style"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {MAP_STYLES.map((style) => (
                            <SelectItem key={style.value} value={style.value}>
                              {style.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}

          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-primary-foreground" />
            </div>
            <Link href="/">
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent truncate">
                  Traffic Situation
                </h1>
                <p className="text-xs lg:text-sm text-muted-foreground mt-1 hidden sm:block truncate">
                  Dynamic Live TrafficFlow
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 shrink-0">
          {/* <ThemeToggle /> */}
        </div>
      </motion.div>

      <div className="flex-1 p-3 sm:p-4 lg:p-6 gap-3 sm:gap-4 lg:gap-6 flex flex-col lg:flex-row">
        {/* Desktop Filters sidebar */}
        {!isMobile && (
          <motion.div className="w-full max-w-sm" variants={sidebarVariants}>
            <Card className="h-full shadow-lg border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center" aria-hidden="true">
                    Filters
                  </span>
                  <Badge variant="outline">{activeFiltersCount} active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <FilterContent />
                <div className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <Label className="text-sm font-medium mb-3 sm:mb-4 block">
                    Select City
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setSelectedCity(
                        cities.find((city) => city.id === value) || cities[0]
                      )
                    }
                    defaultValue={selectedCity.id}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Select a city"
                        className="text-foreground"
                      >
                        {cities.find((city) => city.id === selectedCity.id)
                          ?.name || "Select a city"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <Label className="text-sm font-medium mb-3 sm:mb-4 block">
                    Map Style
                  </Label>
                  <Select onValueChange={setMapStyle} defaultValue={mapStyle}>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Select a map style"
                        className="text-foreground"
                      >
                        {MAP_STYLES.find((style) => style.value === mapStyle)
                          ?.label || "Select a map style"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {MAP_STYLES.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Map area */}
        <motion.div
          className="flex-1 min-h-[50vh] sm:min-h-[60vh] lg:min-h-0"
          variants={itemVariants}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Card className="h-full shadow-lg border-border/50 overflow-hidden">
            <CardHeader className="pb-2 p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">
                  Live Traffic Map
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="text-xs hidden sm:inline-flex"
                  >
                    Just Updated
                  </Badge>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)]">
              <MapWrapper
                filters={{ ...filters, selectedCity }}
                mapStyle={mapStyle}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <motion.div
          className="border-t border-border/50 p-3 sm:p-4 bg-background/95 backdrop-blur-sm safe-area-inset-bottom"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex justify-around items-center max-w-md mx-auto">
            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2 px-3"
            >
              <MapPin className="h-4 w-4 mb-1" />
              <span className="text-xs">Map</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2 px-3"
            >
              <span className="text-xs">Analytics</span>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

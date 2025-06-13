"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Settings, BarChart3, MapPin, Menu } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TrafficMap from "@/components/traffic-map";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMobile } from "@/hooks/use-mobile";
import Link from "next/link";

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
  const [area, setArea] = useState("all");
  const [timeRange, setTimeRange] = useState("15min");
  const [filters, setFilters] = useState({
    accidents: true,
    roadClosures: true,
    vehicles: true,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();

  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const FilterContent = () => (
    <div className="mx-auto space-y-4 sm:space-y-10 p-4 sm:p-6">
      {/* <motion.div variants={itemVariants}>
        <Label
          htmlFor="area"
          className="text-sm font-medium mb-2 sm:mb-3 block"
        >
          Area Selection
        </Label>
        <Select value={area} onValueChange={setArea}>
          <SelectTrigger className="w-full h-10 sm:h-11">
            <SelectValue placeholder="Select area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Areas</SelectItem>
            <SelectItem value="downtown">Downtown</SelectItem>
            <SelectItem value="north">North District</SelectItem>
            <SelectItem value="south">South District</SelectItem>
            <SelectItem value="east">East District</SelectItem>
            <SelectItem value="west">West District</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <Separator />

      <motion.div variants={itemVariants}>
        <Label
          htmlFor="timeRange"
          className="text-sm font-medium mb-2 sm:mb-3 block"
        >
          Time Range
        </Label>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full h-10 sm:h-11">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5min">Last 5 minutes</SelectItem>
            <SelectItem value="15min">Last 15 minutes</SelectItem>
            <SelectItem value="30min">Last 30 minutes</SelectItem>
            <SelectItem value="1hour">Last hour</SelectItem>
            <SelectItem value="3hours">Last 3 hours</SelectItem>
            <SelectItem value="24hours">Last 24 hours</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <Separator /> */}

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

      <Separator />

      <motion.div className="pt-2 sm:pt-4" variants={itemVariants}>
        <Button className="w-full h-10 sm:h-11" variant="default">
          <BarChart3 className="h-4 w-4 mr-2" />
          <span className="text-sm sm:text-base">Generate Report</span>
        </Button>
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
                      <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      <span className="text-base sm:text-lg">Filters</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
                  <FilterContent />
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
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span className="hidden lg:inline">Analytics</span>
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden lg:inline">Settings</span>
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <span className="mr-2 hidden lg:inline">MORE</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <div className="flex-1 p-3 sm:p-4 lg:p-6 gap-3 sm:gap-4 lg:gap-6 flex flex-col lg:flex-row">
        {/* Desktop Filters sidebar */}
        {!isMobile && (
          <motion.div className="w-full max-w-sm" variants={sidebarVariants}>
            <Card className="h-full shadow-lg border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Filters
                  </span>
                  <Badge variant="outline">{activeFiltersCount} active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <FilterContent />
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
              <TrafficMap filters={filters} />
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
              <BarChart3 className="h-4 w-4 mb-1" />
              <span className="text-xs">Analytics</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2 px-3"
            >
              <Settings className="h-4 w-4 mb-1" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

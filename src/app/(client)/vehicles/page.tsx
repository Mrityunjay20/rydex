"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VehicleCard } from "@/components/vehicle-card";
import { vehicles } from "@/lib/mock-data";
import {
  VEHICLE_TYPES,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  LOCATIONS,
} from "@/lib/constants";

export default function VehiclesPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>("all");
  const [fuelType, setFuelType] = useState<string>("all");
  const [transmission, setTransmission] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilters = [type, fuelType, transmission].filter(
    (f) => f !== "all"
  ).length;

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.brand.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.location.toLowerCase().includes(q)
      );
    }

    if (type !== "all") {
      result = result.filter((v) => v.type === type);
    }
    if (fuelType !== "all") {
      result = result.filter((v) => v.fuelType === fuelType);
    }
    if (transmission !== "all") {
      result = result.filter((v) => v.transmission === transmission);
    }

    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "price_desc":
        result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }

    return result;
  }, [search, type, fuelType, transmission, sortBy]);

  const clearFilters = () => {
    setType("all");
    setFuelType("all");
    setTransmission("all");
    setSearch("");
    setSortBy("popular");
  };

  const FilterControls = () => (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Vehicle Type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {VEHICLE_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Fuel Type</label>
        <Select value={fuelType} onValueChange={setFuelType}>
          <SelectTrigger>
            <SelectValue placeholder="All Fuel Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fuel Types</SelectItem>
            {FUEL_TYPES.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Transmission</label>
        <Select value={transmission} onValueChange={setTransmission}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {TRANSMISSION_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {activeFilters > 0 && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
          <X className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Our Vehicles</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our fleet of {vehicles.length} well-maintained vehicles
          available across Delhi NCR
        </p>
      </div>

      {/* Search & Sort Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, brand, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile filter button */}
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" className="relative">
                <SlidersHorizontal className="h-4 w-4" />
                {activeFilters > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                    {activeFilters}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="pt-8">
                <h3 className="mb-4 text-lg font-semibold">Filters</h3>
                <FilterControls />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden w-[240px] shrink-0 lg:block">
          <div className="sticky top-24 rounded-lg border bg-card p-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Filters
            </h3>
            <FilterControls />
          </div>
        </aside>

        {/* Vehicle Grid */}
        <div className="flex-1">
          {activeFilters > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {type !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {type}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setType("all")}
                  />
                </Badge>
              )}
              {fuelType !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {fuelType}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFuelType("all")}
                  />
                </Badge>
              )}
              {transmission !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {transmission}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setTransmission("all")}
                  />
                </Badge>
              )}
            </div>
          )}

          {filteredVehicles.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                Showing {filteredVehicles.length} vehicle
                {filteredVehicles.length !== 1 ? "s" : ""}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold">No vehicles found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your filters or search query
              </p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

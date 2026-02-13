"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { vehicles as allVehicles } from "@/lib/mock-data";
import { VEHICLE_TYPES, FUEL_TYPES, TRANSMISSION_TYPES } from "@/lib/constants";

export default function AdminVehiclesPage() {
  const [search, setSearch] = useState("");
  const [vehicleList, setVehicleList] = useState(allVehicles);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = vehicleList.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase()) ||
      v.licensePlate.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAvailability = (id: string) => {
    setVehicleList((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, available: !v.available } : v
      )
    );
  };

  const deleteVehicle = (id: string) => {
    setVehicleList((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Inventory</h1>
          <p className="text-muted-foreground">
            Manage your fleet of {vehicleList.length} vehicles
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setDialogOpen(false);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Vehicle Name</Label>
                  <Input placeholder="e.g., Hyundai Creta" />
                </div>
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Input placeholder="e.g., Hyundai" />
                </div>
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Input placeholder="e.g., Creta SX(O)" />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input type="number" placeholder="2024" />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {VEHICLE_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fuel Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel" />
                    </SelectTrigger>
                    <SelectContent>
                      {FUEL_TYPES.map((f) => (
                        <SelectItem key={f.value} value={f.value}>
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Transmission</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSMISSION_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Seats</Label>
                  <Input type="number" placeholder="5" />
                </div>
                <div className="space-y-2">
                  <Label>Price per Hour (₹)</Label>
                  <Input type="number" placeholder="250" />
                </div>
                <div className="space-y-2">
                  <Label>Price per Day (₹)</Label>
                  <Input type="number" placeholder="3000" />
                </div>
                <div className="space-y-2">
                  <Label>License Plate</Label>
                  <Input placeholder="DL01XX1234" />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input placeholder="Connaught Place, Delhi" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Brief description of the vehicle..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input placeholder="https://..." />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Vehicle</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, brand, or plate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Vehicle Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((vehicle) => (
          <Card key={vehicle.id} className="border shadow-sm overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image
                src={vehicle.images[0]}
                alt={vehicle.name}
                fill
                className="object-cover"
              />
              <div className="absolute right-2 top-2">
                <Badge
                  className={
                    vehicle.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {vehicle.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{vehicle.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {vehicle.brand} &middot; {vehicle.licensePlate}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => toggleAvailability(vehicle.id)}
                    >
                      {vehicle.available ? (
                        <>
                          <ToggleLeft className="mr-2 h-4 w-4" />
                          Mark Unavailable
                        </>
                      ) : (
                        <>
                          <ToggleRight className="mr-2 h-4 w-4" />
                          Mark Available
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => deleteVehicle(vehicle.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-xs">
                  {vehicle.type}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {vehicle.fuelType}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {vehicle.transmission}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {vehicle.seats} Seats
                </Badge>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  ₹{vehicle.pricePerHour}/hr
                </span>
                <span className="font-bold">
                  ₹{vehicle.pricePerDay.toLocaleString("en-IN")}/day
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No vehicles found matching &quot;{search}&quot;
          </p>
        </div>
      )}
    </div>
  );
}

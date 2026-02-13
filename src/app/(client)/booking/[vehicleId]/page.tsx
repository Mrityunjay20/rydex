"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  Check,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { vehicles } from "@/lib/mock-data";
import { LOCATIONS, ADD_ONS } from "@/lib/constants";

export default function BookingPage({
  params,
}: {
  params: Promise<{ vehicleId: string }>;
}) {
  const { vehicleId } = use(params);
  const router = useRouter();
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("10:00");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Car className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
        <h1 className="text-2xl font-bold">Vehicle Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The vehicle you&apos;re trying to book doesn&apos;t exist.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/vehicles">Browse All Vehicles</Link>
        </Button>
      </div>
    );
  }

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const hours = Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60))
    );

    let total = 0;
    if (hours >= 24) {
      const days = Math.ceil(hours / 24);
      total = days * vehicle.pricePerDay;
    } else {
      total = hours * vehicle.pricePerHour;
    }

    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = ADD_ONS.find((a) => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);

    return total + addOnTotal;
  };

  const getDuration = () => {
    if (!startDate || !endDate) return "Select dates";
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const hours = Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60))
    );
    if (hours >= 24) {
      const days = Math.ceil(hours / 24);
      return `${days} day${days > 1 ? "s" : ""}`;
    }
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push(`/booking/confirmation?vehicle=${vehicle.id}&total=${calculateTotal()}`);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href={`/vehicles/${vehicle.id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vehicle
        </Link>
      </Button>

      <h1 className="mb-2 text-3xl font-bold">Book Your Ride</h1>
      <p className="mb-8 text-muted-foreground">
        Complete the form below to reserve your vehicle
      </p>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left - Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Summary */}
          <Card>
            <CardContent className="flex gap-4 p-4">
              <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={vehicle.images[0]}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{vehicle.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {vehicle.brand} {vehicle.model} &middot; {vehicle.year}
                </p>
                <div className="mt-1 flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {vehicle.type}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {vehicle.transmission}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Pickup Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    min={today}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Pickup Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Return Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    min={startDate || today}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Return Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
                Pickup & Drop Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Pickup Location</Label>
                  <Select
                    value={pickupLocation}
                    onValueChange={setPickupLocation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup point" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Drop Location</Label>
                  <Select value={dropLocation} onValueChange={setDropLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select drop point" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add-Ons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add-Ons (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ADD_ONS.map((addOn) => (
                <div
                  key={addOn.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={selectedAddOns.includes(addOn.id)}
                      onCheckedChange={() => toggleAddOn(addOn.id)}
                    />
                    <span className="text-sm font-medium">{addOn.label}</span>
                  </div>
                  <span className="text-sm font-semibold">
                    +₹{addOn.price}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right - Price Summary */}
        <div>
          <Card className="sticky top-24 border shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehicle</span>
                  <span className="font-medium">{vehicle.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{getDuration()}</span>
                </div>
                {pickupLocation && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pickup</span>
                    <span className="font-medium text-right max-w-[150px] truncate">
                      {pickupLocation}
                    </span>
                  </div>
                )}
                {selectedAddOns.length > 0 && (
                  <>
                    <Separator />
                    <p className="font-medium">Add-Ons:</p>
                    {selectedAddOns.map((id) => {
                      const addOn = ADD_ONS.find((a) => a.id === id);
                      return addOn ? (
                        <div key={id} className="flex justify-between">
                          <span className="text-muted-foreground">
                            {addOn.label}
                          </span>
                          <span>₹{addOn.price}</span>
                        </div>
                      ) : null;
                    })}
                  </>
                )}
              </div>

              <Separator />

              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹{calculateTotal().toLocaleString("en-IN")}
                </span>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={
                  !startDate ||
                  !endDate ||
                  !pickupLocation ||
                  !dropLocation ||
                  isSubmitting
                }
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </span>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Pay
                  </>
                )}
              </Button>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-green-600" />
                  Secure payment via Razorpay
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-green-600" />
                  Free cancellation up to 24hrs
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-green-600" />
                  Insurance included
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

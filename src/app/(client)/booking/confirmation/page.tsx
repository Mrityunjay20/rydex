"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { vehicles } from "@/lib/mock-data";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("vehicle");
  const total = searchParams.get("total");
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  const bookingId = `RX-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Your booking has been successfully placed. We&apos;ll send you a
        confirmation email shortly.
      </p>

      <Card className="mt-8 text-left">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Booking ID</span>
            <span className="font-mono font-semibold">{bookingId}</span>
          </div>
          <Separator />
          {vehicle && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Vehicle</span>
                <span className="font-medium">{vehicle.name}</span>
              </div>
              <Separator />
            </>
          )}
          {total && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-blue-600">
                  ₹{parseInt(total).toLocaleString("en-IN")}
                </span>
              </div>
              <Separator />
            </>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Payment Status
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
              <CheckCircle2 className="h-3 w-3" />
              Paid
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-3">
        <p className="text-sm text-muted-foreground">
          Track your booking timer and manage your rental from your account
          dashboard.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/booking/timer/demo">
              <Clock className="mr-2 h-4 w-4" />
              View Booking Timer
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/account/bookings">
              My Bookings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="h-20 w-20 mx-auto mb-6 animate-pulse rounded-full bg-muted" />
          <div className="h-8 w-64 mx-auto animate-pulse rounded bg-muted" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}

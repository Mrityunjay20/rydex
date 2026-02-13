"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  Car,
  MapPin,
  AlertTriangle,
  Phone,
  ArrowLeft,
  CalendarClock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { vehicles } from "@/lib/mock-data";

export default function BookingTimerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Demo: simulate a booking that started now and ends in 8 hours
  const vehicle = vehicles[1]; // Hyundai Creta for demo
  const now = new Date();
  const endTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const startTime = now;

  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 0,
    seconds: 0,
    total: 8 * 60 * 60 * 1000,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance <= 0) {
        setIsExpired(true);
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds, total: distance });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalDuration = endTime.getTime() - startTime.getTime();
  const elapsed = totalDuration - timeLeft.total;
  const progress = Math.min(100, (elapsed / totalDuration) * 100);

  const isWarning = timeLeft.hours === 0 && timeLeft.minutes <= 30;
  const isCritical = timeLeft.hours === 0 && timeLeft.minutes <= 15;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/account/bookings">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bookings
        </Link>
      </Button>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Booking Timer</h1>
        <p className="mt-2 text-muted-foreground">
          Track your remaining rental time
        </p>
      </div>

      {/* Timer Display */}
      <Card
        className={`mb-6 border-2 ${
          isCritical
            ? "border-red-500 bg-red-50"
            : isWarning
            ? "border-yellow-500 bg-yellow-50"
            : "border-blue-500 bg-blue-50"
        }`}
      >
        <CardContent className="py-8">
          {isExpired ? (
            <div className="text-center">
              <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-500" />
              <h2 className="text-2xl font-bold text-red-600">
                Booking Time Expired
              </h2>
              <p className="mt-2 text-muted-foreground">
                Please return the vehicle or extend your booking.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-4">
                {[
                  {
                    value: String(timeLeft.hours).padStart(2, "0"),
                    label: "Hours",
                  },
                  {
                    value: String(timeLeft.minutes).padStart(2, "0"),
                    label: "Minutes",
                  },
                  {
                    value: String(timeLeft.seconds).padStart(2, "0"),
                    label: "Seconds",
                  },
                ].map((unit, index) => (
                  <div key={unit.label} className="flex items-center gap-4">
                    <div className="text-center">
                      <div
                        className={`rounded-xl bg-background px-5 py-4 text-4xl font-bold tabular-nums shadow-sm sm:px-8 sm:text-6xl ${
                          isCritical
                            ? "text-red-600"
                            : isWarning
                            ? "text-yellow-600"
                            : "text-blue-600"
                        }`}
                      >
                        {unit.value}
                      </div>
                      <p className="mt-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {unit.label}
                      </p>
                    </div>
                    {index < 2 && (
                      <span className="text-3xl font-bold text-muted-foreground/50 sm:text-5xl">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-8 mx-auto max-w-md">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Trip Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-background overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isCritical
                        ? "bg-red-500"
                        : isWarning
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {(isWarning || isCritical) && (
                <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-yellow-700">
                  <AlertTriangle className="h-4 w-4" />
                  {isCritical
                    ? "Less than 15 minutes remaining!"
                    : "Less than 30 minutes remaining!"}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Car className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Vehicle</p>
              <p className="font-medium">{vehicle.name}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <CalendarClock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Rental Period</p>
              <p className="font-medium">
                {startTime.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                &mdash;{" "}
                {endTime.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">
                Pickup / Drop Location
              </p>
              <p className="font-medium">Connaught Place, Delhi</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              Active
            </Badge>
            <span className="text-sm text-muted-foreground">
              Booking ID: RX-{id.toUpperCase()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button className="flex-1" variant="outline">
          <CalendarClock className="mr-2 h-4 w-4" />
          Extend Booking
        </Button>
        <Button className="flex-1" variant="outline" asChild>
          <a href="tel:+911234567890">
            <Phone className="mr-2 h-4 w-4" />
            Call Support
          </a>
        </Button>
      </div>
    </div>
  );
}

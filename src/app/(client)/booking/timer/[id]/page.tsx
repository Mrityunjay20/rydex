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

export default function BookingTimerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [supportPhone, setSupportPhone] = useState("+911234567890");
  const [showExtendDialog, setShowExtendDialog] = useState(false);
  const [extensionHours, setExtensionHours] = useState(24);
  const [extending, setExtending] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBooking(data);
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/admin/settings");
        if (response.ok) {
          const data = await response.json();
          setSupportPhone(data.phone || "+911234567890");
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchBooking();
    fetchSettings();
  }, [id]);

  const endTime = booking ? new Date(booking.endDate) : new Date();
  const startTime = booking ? new Date(booking.startDate) : new Date();

  const handleExtendBooking = async () => {
    if (!booking) return;
    
    setExtending(true);
    try {
      const currentEndDate = new Date(booking.endDate);
      const newEndDate = new Date(currentEndDate);
      newEndDate.setHours(newEndDate.getHours() + extensionHours);

      // Step 1: Get extension details and amount
      const response = await fetch('/api/bookings/extend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          newEndDate: newEndDate.toISOString(),
        }),
      });

      const extensionData = await response.json();

      if (!response.ok) {
        alert(extensionData.error || 'Failed to extend booking');
        setExtending(false);
        return;
      }

      // Step 2: Create Razorpay order for extension payment
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: extensionData.additionalAmount,
          currency: 'INR',
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        alert('Failed to create payment order');
        setExtending(false);
        return;
      }

      // Step 3: Open Razorpay payment
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'RydeX',
        description: `Extend booking for ${extensionData.vehicleName}`,
        order_id: orderData.orderId,
        handler: async function (paymentResponse: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: paymentResponse.razorpay_order_id,
                razorpayPaymentId: paymentResponse.razorpay_payment_id,
                razorpaySignature: paymentResponse.razorpay_signature,
                bookingId: booking.id,
              }),
            });

            if (verifyResponse.ok) {
              // Confirm extension after payment verified
              const confirmResponse = await fetch('/api/bookings/extend/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  bookingId: booking.id,
                  newEndDate: extensionData.newEndDate,
                  additionalAmount: extensionData.additionalAmount,
                }),
              });

              if (confirmResponse.ok) {
                alert('Booking extended successfully!');
                // Refresh booking data
                const refreshResponse = await fetch(`/api/bookings/${id}`);
                if (refreshResponse.ok) {
                  const refreshedData = await refreshResponse.json();
                  setBooking(refreshedData);
                }
                setShowExtendDialog(false);
              } else {
                alert('Payment successful but extension failed. Please contact support.');
              }
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Error processing extension payment:', error);
            alert('Payment verification failed. Please contact support.');
          } finally {
            setExtending(false);
          }
        },
        prefill: {
          name: booking.userName || 'Customer',
          email: booking.userEmail || '',
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: function () {
            setExtending(false);
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error extending booking:', error);
      alert('Failed to extend booking. Please try again.');
      setExtending(false);
    }
  };

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  const [notStarted, setNotStarted] = useState(false);

  useEffect(() => {
    if (!booking) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const start = startTime.getTime();
      const end = endTime.getTime();

      // Check if rental hasn't started yet
      if (now < start) {
        setNotStarted(true);
        setIsExpired(false);
        return;
      }

      // Check if rental has ended
      if (now > end) {
        setIsExpired(true);
        setNotStarted(false);
        clearInterval(timer);
        return;
      }

      // Rental is active - calculate time remaining until end
      setNotStarted(false);
      const distance = end - now;

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds, total: distance });
    }, 1000);

    return () => clearInterval(timer);
  }, [booking, endTime, startTime]);

  const totalDuration = endTime.getTime() - startTime.getTime();
  const elapsed = totalDuration - timeLeft.total;
  const progress = Math.min(100, (elapsed / totalDuration) * 100);

  const isWarning = timeLeft.hours === 0 && timeLeft.minutes <= 30;
  const isCritical = timeLeft.hours === 0 && timeLeft.minutes <= 15;

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-sm text-muted-foreground">Loading booking details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <Car className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
        <h1 className="text-2xl font-bold">Booking Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The booking you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/account/bookings">View My Bookings</Link>
        </Button>
      </div>
    );
  }

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
          notStarted
            ? "border-gray-500 bg-gray-50"
            : isCritical
            ? "border-red-500 bg-red-50"
            : isWarning
            ? "border-yellow-500 bg-yellow-50"
            : "border-blue-500 bg-blue-50"
        }`}
      >
        <CardContent className="py-8">
          {notStarted ? (
            <div className="text-center">
              <Clock className="mx-auto mb-4 h-16 w-16 text-gray-500" />
              <h2 className="text-2xl font-bold text-gray-700">
                Rental Not Started Yet
              </h2>
              <p className="mt-2 text-muted-foreground">
                Your rental period begins on {startTime.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ) : isExpired ? (
            <div className="text-center">
              <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-500" />
              <h2 className="text-2xl font-bold text-red-600">
                Rental Period Ended
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
              <p className="font-medium">{booking.vehicle?.name || 'Vehicle'}</p>
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
              <p className="font-medium">{booking.pickupLocation} → {booking.dropLocation}</p>
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
      <div className="flex justify-center gap-3">
        {(booking?.status === 'CONFIRMED' || booking?.status === 'ACTIVE') && (
          <Button onClick={() => setShowExtendDialog(true)}>
            <CalendarClock className="mr-2 h-4 w-4" />
            Extend Booking
          </Button>
        )}
        <Button variant="outline" asChild>
          <a href={`tel:${supportPhone}`}>
            <Phone className="mr-2 h-4 w-4" />
            Call Support
          </a>
        </Button>
      </div>

      {/* Extend Booking Dialog */}
      {showExtendDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Extend Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Current End Date</label>
                <p className="text-sm text-muted-foreground">
                  {endTime.toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Extend by (hours)</label>
                <input
                  type="number"
                  min="1"
                  max="720"
                  step="1"
                  value={extensionHours}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 1 && value <= 720) {
                      setExtensionHours(value);
                    }
                  }}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {extensionHours >= 24 ? `${Math.floor(extensionHours / 24)} day${Math.floor(extensionHours / 24) > 1 ? 's' : ''} ${extensionHours % 24 > 0 ? `${extensionHours % 24} hour${extensionHours % 24 > 1 ? 's' : ''}` : ''}` : `${extensionHours} hour${extensionHours > 1 ? 's' : ''}`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleExtendBooking}
                  disabled={extending}
                  className="flex-1"
                >
                  {extending ? 'Extending...' : 'Confirm Extension'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowExtendDialog(false)}
                  disabled={extending}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

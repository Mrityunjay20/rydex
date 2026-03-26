"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CreditCard } from "lucide-react";

export default function RetryPaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

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

    fetchBooking();
  }, [id]);

  const handlePayment = async () => {
    if (!booking) return;

    setProcessing(true);
    try {
      // Create Razorpay order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: booking.totalAmount,
          currency: "INR",
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order");
      }

      // Initialize Razorpay
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "RydeX",
        description: `Payment for Booking ${booking.id}`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                bookingId: booking.id,
              }),
            });

            if (verifyResponse.ok) {
              router.push(
                `/booking/confirmation?vehicle=${booking.vehicleId}&total=${booking.totalAmount}&bookingId=${booking.id}`
              );
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please contact support.");
          } finally {
            setProcessing(false);
          }
        },
        prefill: {
          name: booking.userName || "Customer",
          email: booking.userEmail || "",
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate payment. Please try again.");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Booking Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The booking you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  // Check if payment window has expired (10 minutes)
  const createdAt = new Date(booking.createdAt);
  const now = new Date();
  const tenMinutesAfterCreation = new Date(createdAt.getTime() + (10 * 60 * 1000));
  const isExpired = now > tenMinutesAfterCreation;

  if (booking.paymentStatus !== "PENDING") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Payment Already Completed</h1>
        <p className="mt-2 text-muted-foreground">
          This booking has already been paid for.
        </p>
        <Button className="mt-6" onClick={() => router.push("/account/bookings")}>
          View My Bookings
        </Button>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-red-600 mb-4" />
        <h1 className="text-2xl font-bold">Payment Window Expired</h1>
        <p className="mt-2 text-muted-foreground">
          The payment window for this booking has expired. Bookings must be paid within 10 minutes of creation.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Please create a new booking to continue.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Button onClick={() => router.push("/vehicles")}>
            Browse Vehicles
          </Button>
          <Button variant="outline" onClick={() => router.push("/account/bookings")}>
            View My Bookings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            Payment Pending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              Your booking was created but payment was not completed. Please complete the payment to confirm your booking.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking ID:</span>
              <span className="font-medium">{booking.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vehicle:</span>
              <span className="font-medium">{booking.vehicle?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Start Date:</span>
              <span className="font-medium">
                {new Date(booking.startDate).toLocaleString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">End Date:</span>
              <span className="font-medium">
                {new Date(booking.endDate).toLocaleString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-lg font-bold text-primary">
                ₹{booking.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            disabled={processing}
            className="w-full"
            size="lg"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {processing ? "Processing..." : "Complete Payment"}
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/account/bookings")}
            className="w-full"
          >
            Back to My Bookings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

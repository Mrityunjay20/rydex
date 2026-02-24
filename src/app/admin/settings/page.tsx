"use client";

import { useState } from "react";
import { Save, Building, IndianRupee, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your business configuration
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Business Info */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building className="h-5 w-5 text-blue-600" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input defaultValue="RydeX" />
              </div>
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input defaultValue="hello@rydex.in" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input defaultValue="+91 12345 67890" />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp Number</Label>
                <Input defaultValue="+91 12345 67890" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Business Address</Label>
              <Textarea defaultValue="Connaught Place, New Delhi, 110001" rows={2} />
            </div>
          </CardContent>
        </Card>

        {/* Pricing Rules */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <IndianRupee className="h-5 w-5 text-blue-600" />
              Pricing Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Minimum Rental Hours</Label>
                <Input type="number" defaultValue="4" />
              </div>
              <div className="space-y-2">
                <Label>Security Deposit (₹)</Label>
                <Input type="number" defaultValue="5000" />
              </div>
              <div className="space-y-2">
                <Label>Late Return Penalty (%)</Label>
                <Input type="number" defaultValue="150" />
              </div>
              <div className="space-y-2">
                <Label>Cancellation Fee (%)</Label>
                <Input type="number" defaultValue="25" />
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Weekend Surge Pricing</p>
                  <p className="text-xs text-muted-foreground">
                    Apply 20% surge on Sat–Sun
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Holiday Pricing</p>
                  <p className="text-xs text-muted-foreground">
                    Apply 30% surge on public holidays
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Auto-approve Bookings</p>
                  <p className="text-xs text-muted-foreground">
                    Automatically confirm verified customer bookings
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Locations */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
              Pickup & Drop Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Connaught Place, Delhi",
              "Aerocity, Delhi",
              "Gurugram, Haryana",
              "Noida, UP",
              "Dwarka, Delhi",
              "Karol Bagh, Delhi",
              "Rajouri Garden, Delhi",
              "Greater Noida, UP",
              "Faridabad, Haryana",
              "Ghaziabad, UP",
            ].map((location) => (
              <div
                key={location}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{location}</span>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-2">
              + Add New Location
            </Button>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              Operating Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">24/7 Operations</p>
                <p className="text-xs text-muted-foreground">
                  Allow bookings and pickups at any time
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Grace Period (minutes)</Label>
                <Input type="number" defaultValue="60" />
                <p className="text-xs text-muted-foreground">
                  Time allowed after booking ends before late charges
                </p>
              </div>
              <div className="space-y-2">
                <Label>Minimum Advance Booking (hours)</Label>
                <Input type="number" defaultValue="2" />
                <p className="text-xs text-muted-foreground">
                  How far in advance a booking must be made
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                title: "Email notifications for new bookings",
                desc: "Receive email when a customer makes a booking",
                checked: true,
              },
              {
                title: "SMS alerts for booking status changes",
                desc: "Send SMS to customers on status updates",
                checked: true,
              },
              {
                title: "WhatsApp booking reminders",
                desc: "Send pickup reminders via WhatsApp",
                checked: false,
              },
              {
                title: "Timer expiry alerts",
                desc: "Notify at 1hr, 30min, 15min before rental ends",
                checked: true,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked={item.checked} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

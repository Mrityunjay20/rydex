"use client";

import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>({
    businessName: "RydeX",
    contactEmail: "hello@rydex.in",
    phone: "+91 12345 67890",
    whatsapp: "+91 12345 67890",
    address: "Connaught Place, New Delhi, 110001",
    heroTagline: "Choose from 150+ well-maintained cars. Self-drive rentals starting at just ₹120/hour. Book in minutes, drive in style.",
    minRentalHours: 4,
    securityDeposit: 5000,
    lateReturnPenalty: 150,
    cancellationFee: 25,
    weekendSurge: true,
    holidayPricing: true,
    autoApproveBookings: false,
    is24x7: true,
    gracePeriodMinutes: 60,
    minAdvanceBookingHours: 2,
    emailNotifications: true,
    smsAlerts: true,
    whatsappReminders: false,
    timerExpiryAlerts: true,
    locations: [],
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        alert("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
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
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
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
                <Input value={settings.businessName} onChange={(e) => updateSetting('businessName', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input value={settings.contactEmail} onChange={(e) => updateSetting('contactEmail', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input value={settings.phone} onChange={(e) => updateSetting('phone', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp Number</Label>
                <Input value={settings.whatsapp} onChange={(e) => updateSetting('whatsapp', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Business Address</Label>
              <Textarea value={settings.address} onChange={(e) => updateSetting('address', e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Homepage Hero Tagline</Label>
              <Textarea 
                value={settings.heroTagline} 
                onChange={(e) => updateSetting('heroTagline', e.target.value)} 
                rows={3}
                placeholder="e.g., Choose from 150+ well-maintained cars. Self-drive rentals starting at just ₹120/hour."
              />
              <p className="text-xs text-muted-foreground">This text appears on the homepage hero section below the main title</p>
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
                <Input type="number" value={settings.minRentalHours} onChange={(e) => updateSetting('minRentalHours', parseInt(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Security Deposit (₹)</Label>
                <Input type="number" value={settings.securityDeposit} onChange={(e) => updateSetting('securityDeposit', parseInt(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Late Return Penalty (%)</Label>
                <Input type="number" value={settings.lateReturnPenalty} onChange={(e) => updateSetting('lateReturnPenalty', parseInt(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Cancellation Fee (%)</Label>
                <Input type="number" value={settings.cancellationFee} onChange={(e) => updateSetting('cancellationFee', parseInt(e.target.value))} />
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
                <Switch checked={settings.weekendSurge} onCheckedChange={(checked) => updateSetting('weekendSurge', checked)} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Holiday Pricing</p>
                  <p className="text-xs text-muted-foreground">
                    Apply 30% surge on public holidays
                  </p>
                </div>
                <Switch checked={settings.holidayPricing} onCheckedChange={(checked) => updateSetting('holidayPricing', checked)} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Auto-approve Bookings</p>
                  <p className="text-xs text-muted-foreground">
                    Automatically confirm verified customer bookings
                  </p>
                </div>
                <Switch checked={settings.autoApproveBookings} onCheckedChange={(checked) => updateSetting('autoApproveBookings', checked)} />
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
            {(settings.locations || []).map((location: string) => (
              <div
                key={location}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{location}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newLocations = settings.locations.filter((l: string) => l !== location);
                    updateSetting('locations', newLocations);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input
                id="newLocation"
                placeholder="Enter new location..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.currentTarget;
                    const value = input.value.trim();
                    if (value && !settings.locations?.includes(value)) {
                      updateSetting('locations', [...(settings.locations || []), value]);
                      input.value = '';
                    }
                  }
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.getElementById('newLocation') as HTMLInputElement;
                  const value = input?.value.trim();
                  if (value && !settings.locations?.includes(value)) {
                    updateSetting('locations', [...(settings.locations || []), value]);
                    input.value = '';
                  }
                }}
              >
                Add
              </Button>
            </div>
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
              <Switch checked={settings.is24x7} onCheckedChange={(checked) => updateSetting('is24x7', checked)} />
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Grace Period (minutes)</Label>
                <Input type="number" value={settings.gracePeriodMinutes} onChange={(e) => updateSetting('gracePeriodMinutes', parseInt(e.target.value))} />
                <p className="text-xs text-muted-foreground">
                  Time allowed after booking ends before late charges
                </p>
              </div>
              <div className="space-y-2">
                <Label>Minimum Advance Booking (hours)</Label>
                <Input type="number" value={settings.minAdvanceBookingHours} onChange={(e) => updateSetting('minAdvanceBookingHours', parseInt(e.target.value))} />
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

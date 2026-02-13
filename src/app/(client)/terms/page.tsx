import { Separator } from "@/components/ui/separator";

export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight mb-2">
        Terms & Conditions
      </h1>
      <p className="text-muted-foreground mb-8">
        Last updated: January 2025
      </p>

      <div className="prose prose-sm max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold mb-3">1. Eligibility</h2>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>To rent a vehicle from RyderX, you must:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Be at least 21 years of age</li>
              <li>Hold a valid Indian driving license (or International Driving Permit for foreign nationals)</li>
              <li>Provide a valid government-issued photo ID (Aadhaar Card, Passport, etc.)</li>
              <li>Have a valid credit/debit card or UPI account for payment and security deposit</li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-bold mb-3">2. Booking & Payment</h2>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>All bookings must be made through our website or authorized channels. Payment is required at the time of booking. A refundable security deposit will be held and released within 48 hours of vehicle return, subject to inspection.</p>
            <p>Pricing is calculated based on the rental duration — hourly rates for rentals under 24 hours, and daily rates for longer periods. Add-ons are charged separately.</p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-bold mb-3">3. Cancellation Policy</h2>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Free cancellation:</strong> Up to 24 hours before the scheduled pickup time — full refund</li>
              <li><strong>Late cancellation:</strong> Within 24 hours of pickup — 25% cancellation fee</li>
              <li><strong>No-show:</strong> Full rental amount will be charged</li>
            </ul>
            <p>Refunds are processed within 5–7 business days to the original payment method.</p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-bold mb-3">4. Vehicle Usage</h2>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>The rented vehicle must be used in accordance with the following:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Only the registered renter (and approved additional drivers) may operate the vehicle</li>
              <li>The vehicle must not be used for racing, off-roading, or any illegal activities</li>
              <li>Smoking in the vehicle is strictly prohibited (cleaning fee of ₹2,000 applies)</li>
              <li>Pets are not allowed without prior approval</li>
              <li>The vehicle must be returned with the same fuel level as provided</li>
              <li>Any traffic violations or fines incurred during the rental period are the renter&apos;s responsibility</li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-bold mb-3">5. Insurance & Liability</h2>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>All vehicles come with basic comprehensive insurance. In case of an accident or damage:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Report the incident immediately to RyderX support and local authorities</li>
              <li>A deductible of ₹5,000–₹25,000 (varies by vehicle) may apply for damage claims</li>
              <li>The Premium Insurance add-on reduces your deductible to zero</li>
              <li>Damage due to negligence, DUI, or unauthorized use is not covered by insurance</li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-bold mb-3">6. Late Returns</h2>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>Vehicles must be returned by the agreed-upon time. Late returns are charged as follows:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Up to 1 hour late: No additional charge (grace period)</li>
              <li>1–3 hours late: Charged at 1.5x the hourly rate</li>
              <li>3+ hours late: Charged at 2x the hourly rate</li>
            </ul>
            <p>If you need more time, use the &quot;Extend Booking&quot; feature in the app or contact support.</p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-bold mb-3">7. Privacy Policy</h2>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>RyderX collects and processes personal information necessary for providing our services, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name, email, phone number, and driving license details</li>
              <li>Payment information (processed securely via Razorpay)</li>
              <li>Vehicle location data during the rental period (for safety purposes)</li>
            </ul>
            <p>We do not sell or share your personal data with third parties except as required by law or to provide our services. Your data is stored securely and retained only as long as necessary.</p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-bold mb-3">8. Contact</h2>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p>For any questions about these terms, contact us at:</p>
            <p className="mt-2">
              <strong>Email:</strong> legal@ryderx.in<br />
              <strong>Phone:</strong> +91 12345 67890<br />
              <strong>Address:</strong> Connaught Place, New Delhi, 110001
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

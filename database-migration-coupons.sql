-- Migration: Add Coupon System
-- Run this in your Supabase SQL Editor

-- 1. Create Coupon table
CREATE TABLE IF NOT EXISTS "Coupon" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  "discountPercent" INTEGER NOT NULL CHECK ("discountPercent" >= 1 AND "discountPercent" <= 100),
  "isActive" BOOLEAN DEFAULT true,
  "expiryDate" TIMESTAMP,
  "maxUses" INTEGER,
  "usedCount" INTEGER DEFAULT 0,
  description TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- 2. Add coupon-related columns to Booking table
ALTER TABLE "Booking" 
ADD COLUMN IF NOT EXISTS "couponCode" TEXT,
ADD COLUMN IF NOT EXISTS "discountAmount" DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS "originalAmount" DECIMAL(10,2);

-- 3. Create index on coupon code for faster lookups
CREATE INDEX IF NOT EXISTS idx_coupon_code ON "Coupon"(code);

-- 4. Create index on booking coupon code
CREATE INDEX IF NOT EXISTS idx_booking_coupon ON "Booking"("couponCode");

-- 5. Insert sample coupons (optional - remove if not needed)
INSERT INTO "Coupon" (code, "discountPercent", "isActive", description)
VALUES 
  ('WELCOME10', 10, true, 'Welcome discount for new users'),
  ('SAVE20', 20, true, '20% off on all bookings')
ON CONFLICT (code) DO NOTHING;

-- Migration complete!
-- You can now use the coupon system in your application.

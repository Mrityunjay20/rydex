-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add default UUID generation for Booking table
ALTER TABLE "Booking" 
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- Add default UUID generation for Payment table
ALTER TABLE "Payment" 
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

-- Add default UUID generation for other tables if needed
ALTER TABLE "User" 
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

ALTER TABLE "Vehicle" 
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

ALTER TABLE "Review" 
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

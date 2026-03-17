-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add default UUID generation for all tables
ALTER TABLE "Booking" 
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

ALTER TABLE "Payment" 
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

ALTER TABLE "User" 
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

ALTER TABLE "Vehicle" 
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

ALTER TABLE "Review" 
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

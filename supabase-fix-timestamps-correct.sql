-- Add default timestamps for tables that have both createdAt and updatedAt
ALTER TABLE "Booking" 
ALTER COLUMN "updatedAt" SET DEFAULT NOW();

ALTER TABLE "Booking" 
ALTER COLUMN "createdAt" SET DEFAULT NOW();

ALTER TABLE "Vehicle" 
ALTER COLUMN "updatedAt" SET DEFAULT NOW();

ALTER TABLE "Vehicle" 
ALTER COLUMN "createdAt" SET DEFAULT NOW();

ALTER TABLE "User" 
ALTER COLUMN "updatedAt" SET DEFAULT NOW();

ALTER TABLE "User" 
ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- Payment and Review only have createdAt (no updatedAt)
ALTER TABLE "Payment" 
ALTER COLUMN "createdAt" SET DEFAULT NOW();

ALTER TABLE "Review" 
ALTER COLUMN "createdAt" SET DEFAULT NOW();

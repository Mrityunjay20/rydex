-- Add default timestamp for updatedAt column
ALTER TABLE "Booking" 
ALTER COLUMN "updatedAt" SET DEFAULT NOW();

-- Also ensure createdAt has a default
ALTER TABLE "Booking" 
ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- Add userEmail and userName columns to Booking table
ALTER TABLE "Booking" 
ADD COLUMN IF NOT EXISTS "userEmail" TEXT,
ADD COLUMN IF NOT EXISTS "userName" TEXT;

-- Create index on userEmail for faster filtering
CREATE INDEX IF NOT EXISTS "Booking_userEmail_idx" ON "Booking"("userEmail");

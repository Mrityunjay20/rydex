-- Make userId nullable to allow guest bookings
ALTER TABLE "Booking" 
ALTER COLUMN "userId" DROP NOT NULL;

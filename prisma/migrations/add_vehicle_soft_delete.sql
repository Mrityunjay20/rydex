-- Add isDeleted column to Vehicle table for soft delete functionality
ALTER TABLE "Vehicle" ADD COLUMN "isDeleted" BOOLEAN NOT NULL DEFAULT false;

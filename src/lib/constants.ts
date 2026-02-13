export const SITE_NAME = "RyderX";
export const SITE_DESCRIPTION =
  "Premium car rental service in Delhi NCR. Choose from our wide range of vehicles for self-drive rentals at affordable prices.";
export const SITE_URL = "https://ryderx.vercel.app";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
] as const;

export const VEHICLE_TYPES = [
  { value: "SUV", label: "SUV" },
  { value: "SEDAN", label: "Sedan" },
  { value: "HATCHBACK", label: "Hatchback" },
  { value: "LUXURY", label: "Luxury" },
  { value: "MUV", label: "MUV" },
] as const;

export const FUEL_TYPES = [
  { value: "PETROL", label: "Petrol" },
  { value: "DIESEL", label: "Diesel" },
  { value: "ELECTRIC", label: "Electric" },
  { value: "HYBRID", label: "Hybrid" },
] as const;

export const TRANSMISSION_TYPES = [
  { value: "MANUAL", label: "Manual" },
  { value: "AUTOMATIC", label: "Automatic" },
] as const;

export const BOOKING_STATUSES = [
  { value: "PENDING", label: "Pending", color: "bg-yellow-500" },
  { value: "CONFIRMED", label: "Confirmed", color: "bg-blue-500" },
  { value: "ACTIVE", label: "Active", color: "bg-green-500" },
  { value: "COMPLETED", label: "Completed", color: "bg-gray-500" },
  { value: "CANCELLED", label: "Cancelled", color: "bg-red-500" },
] as const;

export const LOCATIONS = [
  "Connaught Place, Delhi",
  "Aerocity, Delhi",
  "Gurugram, Haryana",
  "Noida, UP",
  "Dwarka, Delhi",
  "Karol Bagh, Delhi",
  "Rajouri Garden, Delhi",
  "Greater Noida, UP",
  "Faridabad, Haryana",
  "Ghaziabad, UP",
] as const;

export const ADD_ONS = [
  { id: "gps", label: "GPS Navigation", price: 200 },
  { id: "child_seat", label: "Child Seat", price: 300 },
  { id: "insurance", label: "Premium Insurance", price: 500 },
  { id: "fuel_package", label: "Full Fuel Package", price: 800 },
] as const;

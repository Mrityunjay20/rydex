export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  type: "SUV" | "SEDAN" | "HATCHBACK" | "LUXURY" | "MUV";
  fuelType: "PETROL" | "DIESEL" | "ELECTRIC" | "HYBRID";
  transmission: "MANUAL" | "AUTOMATIC";
  seats: number;
  pricePerHour: number;
  pricePerDay: number;
  images: string[];
  description: string;
  features: string[];
  available: boolean;
  location: string;
  licensePlate: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "CUSTOMER" | "ADMIN";
  avatarUrl?: string;
  dlNumber?: string;
  dlExpiry?: string;
  dlImageUrl?: string;
  verified: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropLocation: string;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "REFUNDED" | "FAILED";
  addOns: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  vehicle?: Vehicle;
  payment?: Payment;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: "PENDING" | "PAID" | "REFUNDED" | "FAILED";
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  vehicleId: string;
  bookingId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: User;
}

export interface VehicleFilters {
  type?: string;
  fuelType?: string;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  search?: string;
  location?: string;
  sortBy?: "price_asc" | "price_desc" | "newest" | "popular";
}

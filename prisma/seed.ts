import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new (PrismaClient as any)();

const vehicles = [
  {
    name: "Hyundai Creta",
    brand: "Hyundai",
    model: "Creta SX(O)",
    year: 2024,
    type: "SUV" as const,
    fuelType: "PETROL" as const,
    transmission: "AUTOMATIC" as const,
    seats: 5,
    pricePerHour: 250,
    pricePerDay: 3000,
    images: [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
    ],
    description:
      "The Hyundai Creta SX(O) is a feature-packed compact SUV perfect for city drives and weekend getaways. Comes with panoramic sunroof, ventilated seats, and ADAS.",
    features: [
      "Panoramic Sunroof",
      "Ventilated Seats",
      "ADAS Level 2",
      "10.25\" Touchscreen",
      "Wireless CarPlay",
      "360° Camera",
      "Cruise Control",
      "LED Headlamps",
    ],
    location: "Gurugram, Haryana",
    licensePlate: "DL01AB1234",
  },
  {
    name: "Toyota Fortuner",
    brand: "Toyota",
    model: "Fortuner Legender",
    year: 2024,
    type: "SUV" as const,
    fuelType: "DIESEL" as const,
    transmission: "AUTOMATIC" as const,
    seats: 7,
    pricePerHour: 450,
    pricePerDay: 5500,
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    ],
    description:
      "The Toyota Fortuner Legender is a premium full-size SUV with powerful diesel performance. Ideal for long highway drives and family trips.",
    features: [
      "4x4 Drive",
      "Leather Seats",
      "JBL Audio System",
      "Connected Car Tech",
      "Adaptive Cruise",
      "Power Tailgate",
      "Ambient Lighting",
      "Wireless Charging",
    ],
    location: "Aerocity, Delhi",
    licensePlate: "DL02CD5678",
  },
  {
    name: "Honda City",
    brand: "Honda",
    model: "City ZX CVT",
    year: 2024,
    type: "SEDAN" as const,
    fuelType: "PETROL" as const,
    transmission: "AUTOMATIC" as const,
    seats: 5,
    pricePerHour: 200,
    pricePerDay: 2400,
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0220?w=800&q=80",
    ],
    description:
      "The Honda City ZX CVT offers a refined driving experience with class-leading fuel efficiency. Perfect for business trips and daily commutes.",
    features: [
      "Lane Watch Camera",
      "Honda Connect",
      "8\" Touchscreen",
      "6 Airbags",
      "LED DRLs",
      "Keyless Entry",
      "Auto AC",
      "Rear Camera",
    ],
    location: "Connaught Place, Delhi",
    licensePlate: "DL03EF9012",
  },
  {
    name: "Swift Dzire",
    brand: "Maruti Suzuki",
    model: "Dzire ZXi+",
    year: 2024,
    type: "SEDAN" as const,
    fuelType: "PETROL" as const,
    transmission: "AUTOMATIC" as const,
    seats: 5,
    pricePerHour: 120,
    pricePerDay: 1800,
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    ],
    description:
      "The Maruti Dzire ZXi+ is India's best-selling sedan. Fuel efficient, comfortable, and packed with features for the price-conscious traveler.",
    features: [
      "SmartPlay Infotainment",
      "Auto Gear Shift",
      "Push Button Start",
      "Auto AC",
      "ABS + EBD",
      "Rear Parking Sensors",
      "Steering Controls",
      "USB Charging",
    ],
    location: "Noida, UP",
    licensePlate: "UP16GH3456",
  },
  {
    name: "Mercedes-Benz E-Class",
    brand: "Mercedes-Benz",
    model: "E 200 Exclusive",
    year: 2024,
    type: "LUXURY" as const,
    fuelType: "PETROL" as const,
    transmission: "AUTOMATIC" as const,
    seats: 5,
    pricePerHour: 800,
    pricePerDay: 9500,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
    ],
    description:
      "The Mercedes-Benz E-Class is the epitome of luxury motoring. Chauffeur-grade comfort with cutting-edge technology for special occasions and VIP travel.",
    features: [
      "Burmester Sound",
      "MBUX System",
      "Massage Seats",
      "Air Suspension",
      "360° Camera",
      "Ambient Lighting",
      "Wireless Charging",
      "Digital Key",
    ],
    location: "Aerocity, Delhi",
    licensePlate: "DL01LX7890",
  },
  {
    name: "Maruti Baleno",
    brand: "Maruti Suzuki",
    model: "Baleno Alpha",
    year: 2024,
    type: "HATCHBACK" as const,
    fuelType: "PETROL" as const,
    transmission: "MANUAL" as const,
    seats: 5,
    pricePerHour: 100,
    pricePerDay: 1200,
    images: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80",
    ],
    description:
      "The Maruti Baleno Alpha is a stylish premium hatchback. Best in class mileage with a spacious cabin, ideal for city commutes and short trips.",
    features: [
      "9\" SmartPlay Pro+",
      "Head-Up Display",
      "360° View Camera",
      "6 Airbags",
      "Hill Hold",
      "LED Projector Lamps",
      "Auto Headlamps",
      "Cruise Control",
    ],
    location: "Dwarka, Delhi",
    licensePlate: "DL04IJ5678",
  },
  {
    name: "Tata Nexon EV",
    brand: "Tata",
    model: "Nexon EV Max LR",
    year: 2024,
    type: "SUV" as const,
    fuelType: "ELECTRIC" as const,
    transmission: "AUTOMATIC" as const,
    seats: 5,
    pricePerHour: 280,
    pricePerDay: 3200,
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    ],
    description:
      "The Tata Nexon EV Max offers 437 km range on a single charge. Zero emissions, fast charging, and loaded with tech for the eco-conscious driver.",
    features: [
      "437 km Range",
      "Fast Charging",
      "Connected Car",
      "Ventilated Seats",
      "Air Purifier",
      "Wireless CarPlay",
      "Electric Sunroof",
      "Regen Braking",
    ],
    location: "Greater Noida, UP",
    licensePlate: "UP16KL9012",
  },
  {
    name: "Toyota Innova Crysta",
    brand: "Toyota",
    model: "Innova Crysta VX",
    year: 2024,
    type: "MUV" as const,
    fuelType: "DIESEL" as const,
    transmission: "AUTOMATIC" as const,
    seats: 7,
    pricePerHour: 350,
    pricePerDay: 4000,
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
    ],
    description:
      "The Toyota Innova Crysta is the undisputed king of MPVs in India. Spacious 7-seater with premium comfort for family travel and group trips.",
    features: [
      "Captain Seats",
      "Roof-mounted AC",
      "Smart Entry",
      "7\" Touchscreen",
      "Vehicle Stability",
      "Parking Sensors",
      "Leather Upholstery",
      "Ambient Lighting",
    ],
    location: "Karol Bagh, Delhi",
    licensePlate: "DL05MN3456",
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      name: "RydeX Admin",
      email: "admin@rydex.in",
      phone: "+91 12345 67890",
      password: "admin123",
      role: "ADMIN",
      verified: true,
    },
  });
  console.log(`Created admin: ${admin.email}`);

  // Create demo customer
  const customer = await prisma.user.create({
    data: {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 98765 43210",
      password: "customer123",
      role: "CUSTOMER",
      dlNumber: "DL-1234567890",
      verified: true,
    },
  });
  console.log(`Created customer: ${customer.email}`);

  // Create vehicles
  for (const vehicle of vehicles) {
    const created = await prisma.vehicle.create({ data: vehicle });
    console.log(`Created vehicle: ${created.name}`);
  }

  console.log("\nSeeding complete!");
  console.log(`  - 2 users (admin + customer)`);
  console.log(`  - ${vehicles.length} vehicles`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

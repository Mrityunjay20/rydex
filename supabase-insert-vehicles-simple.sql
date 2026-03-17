-- Delete existing vehicles first, then insert fresh data
DELETE FROM "Vehicle";

-- Insert all vehicles
INSERT INTO "Vehicle" (id, name, brand, model, year, type, "fuelType", transmission, seats, "pricePerHour", "pricePerDay", images, description, features, available, location, "licensePlate", "createdAt", "updatedAt")
VALUES 
('v1', 'Swift Dzire', 'Maruti Suzuki', 'Dzire VXi', 2024, 'SEDAN', 'PETROL', 'MANUAL', 5, 150, 1800, 
 ARRAY['https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&q=80'],
 'The Maruti Suzuki Dzire is a compact sedan perfect for city commutes.',
 ARRAY['AC', 'Power Steering', 'Bluetooth'],
 true, 'Connaught Place, Delhi', 'DL01AB1234', NOW(), NOW()),

('v2', 'Hyundai Creta', 'Hyundai', 'Creta SX(O)', 2024, 'SUV', 'DIESEL', 'AUTOMATIC', 5, 250, 3000,
 ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
 'The Hyundai Creta is a premium compact SUV.',
 ARRAY['Sunroof', 'Ventilated Seats', '360 Camera'],
 true, 'Gurugram, Haryana', 'HR26DK5678', NOW(), NOW()),

('v3', 'Toyota Fortuner', 'Toyota', 'Fortuner 4x4 AT', 2023, 'SUV', 'DIESEL', 'AUTOMATIC', 7, 450, 5500,
 ARRAY['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80'],
 'The Toyota Fortuner is a full-size SUV.',
 ARRAY['4x4 Drive', 'Leather Seats', 'Touchscreen'],
 true, 'Aerocity, Delhi', 'DL03CJ9012', NOW(), NOW()),

('v4', 'Honda City', 'Honda', 'City ZX CVT', 2024, 'SEDAN', 'PETROL', 'AUTOMATIC', 5, 200, 2400,
 ARRAY['https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80'],
 'The Honda City is a premium sedan.',
 ARRAY['Honda SENSING', 'Sunroof', 'LED Headlamps'],
 true, 'Noida, UP', 'UP16EF3456', NOW(), NOW()),

('v5', 'Maruti Baleno', 'Maruti Suzuki', 'Baleno Alpha', 2024, 'HATCHBACK', 'PETROL', 'MANUAL', 5, 120, 1400,
 ARRAY['https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80'],
 'The Baleno is a feature-packed premium hatchback.',
 ARRAY['Heads-Up Display', '360 Camera', '6 Airbags'],
 true, 'Dwarka, Delhi', 'DL08GH7890', NOW(), NOW()),

('v6', 'Mercedes-Benz E-Class', 'Mercedes-Benz', 'E 200 Expression', 2023, 'LUXURY', 'PETROL', 'AUTOMATIC', 5, 800, 9500,
 ARRAY['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80'],
 'The Mercedes-Benz E-Class is luxury and sophistication.',
 ARRAY['MBUX', 'Burmester Sound', 'Massage Seats'],
 true, 'Aerocity, Delhi', 'DL01CD2345', NOW(), NOW()),

('v7', 'Toyota Innova Crysta', 'Toyota', 'Innova Crysta GX', 2024, 'MUV', 'DIESEL', 'MANUAL', 7, 300, 3500,
 ARRAY['https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=80'],
 'The Innova Crysta is India''s favourite MPV.',
 ARRAY['Captain Seats', 'Rear AC', 'Touchscreen'],
 true, 'Karol Bagh, Delhi', 'DL05IJ6789', NOW(), NOW()),

('v8', 'Tata Nexon EV', 'Tata', 'Nexon EV Max LR', 2024, 'SUV', 'ELECTRIC', 'AUTOMATIC', 5, 220, 2600,
 ARRAY['https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80'],
 'Go green with the Tata Nexon EV Max.',
 ARRAY['437km Range', 'Fast Charging', 'Sunroof'],
 true, 'Greater Noida, UP', 'UP16KL0123', NOW(), NOW());

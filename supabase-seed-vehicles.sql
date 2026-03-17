-- Insert vehicles from mock data into the database
INSERT INTO "Vehicle" (id, name, brand, model, year, type, "fuelType", transmission, seats, "pricePerHour", "pricePerDay", images, description, features, available, location, "licensePlate", "createdAt", "updatedAt")
VALUES 
('v1', 'Swift Dzire', 'Maruti Suzuki', 'Dzire VXi', 2024, 'SEDAN', 'PETROL', 'MANUAL', 5, 150, 1800, 
 ARRAY['https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&q=80', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'],
 'The Maruti Suzuki Dzire is a compact sedan perfect for city commutes and short trips around Delhi NCR. Fuel-efficient and comfortable.',
 ARRAY['AC', 'Power Steering', 'Bluetooth', 'USB Charging', 'Airbags'],
 true, 'Connaught Place, Delhi', 'DL01AB1234', NOW(), NOW()),

('v2', 'Hyundai Creta', 'Hyundai', 'Creta SX(O)', 2024, 'SUV', 'DIESEL', 'AUTOMATIC', 5, 250, 3000,
 ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80'],
 'The Hyundai Creta is a premium compact SUV with top-notch features, sunroof, and a powerful diesel engine. Ideal for highway drives and weekend getaways.',
 ARRAY['Panoramic Sunroof', 'Ventilated Seats', '360 Camera', 'Wireless Charging', 'ADAS', 'Cruise Control'],
 true, 'Gurugram, Haryana', 'HR26DK5678', NOW(), NOW()),

('v3', 'Toyota Fortuner', 'Toyota', 'Fortuner 4x4 AT', 2023, 'SUV', 'DIESEL', 'AUTOMATIC', 7, 450, 5500,
 ARRAY['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'],
 'The Toyota Fortuner is a full-size SUV built for commanding road presence and off-road capability. Perfect for group travel and long journeys.',
 ARRAY['4x4 Drive', 'Leather Seats', 'Touchscreen Infotainment', 'Rear AC', 'Hill Assist', '6 Airbags'],
 true, 'Aerocity, Delhi', 'DL03CJ9012', NOW(), NOW()),

('v4', 'Honda City', 'Honda', 'City ZX CVT', 2024, 'SEDAN', 'PETROL', 'AUTOMATIC', 5, 200, 2400,
 ARRAY['https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80'],
 'The Honda City is a premium sedan with a refined CVT gearbox, Honda SENSING safety suite, and best-in-class boot space.',
 ARRAY['Honda SENSING', 'Lane Keep Assist', 'Sunroof', 'Wireless CarPlay', 'LED Headlamps'],
 true, 'Noida, UP', 'UP16EF3456', NOW(), NOW()),

('v5', 'Maruti Baleno', 'Maruti Suzuki', 'Baleno Alpha', 2024, 'HATCHBACK', 'PETROL', 'MANUAL', 5, 120, 1400,
 ARRAY['https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80', 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80'],
 'The Baleno is a feature-packed premium hatchback. Great mileage, spacious interiors, and perfect for navigating Delhi traffic.',
 ARRAY['Heads-Up Display', '360 View Camera', 'Smartplay Pro+', '6 Airbags', 'Auto AC'],
 true, 'Dwarka, Delhi', 'DL08GH7890', NOW(), NOW()),

('v6', 'Mercedes-Benz E-Class', 'Mercedes-Benz', 'E 200 Expression', 2023, 'LUXURY', 'PETROL', 'AUTOMATIC', 5, 800, 9500,
 ARRAY['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80', 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80'],
 'The Mercedes-Benz E-Class is the epitome of luxury and sophistication. Perfect for business travel, weddings, and premium experiences.',
 ARRAY['MBUX Infotainment', 'Burmester Sound', 'Ambient Lighting', 'Massage Seats', 'Air Suspension', '9G-Tronic'],
 true, 'Aerocity, Delhi', 'DL01CD2345', NOW(), NOW()),

('v7', 'Toyota Innova Crysta', 'Toyota', 'Innova Crysta GX', 2024, 'MUV', 'DIESEL', 'MANUAL', 7, 300, 3500,
 ARRAY['https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=80', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80'],
 'The Innova Crysta is India''s favourite MPV — spacious, reliable, and comfortable for family trips and group travel.',
 ARRAY['Captain Seats', 'Rear AC', 'Touchscreen', 'Cruise Control', '7 Airbags', 'Roof Rails'],
 true, 'Karol Bagh, Delhi', 'DL05IJ6789', NOW(), NOW()),

('v8', 'Tata Nexon EV', 'Tata', 'Nexon EV Max LR', 2024, 'SUV', 'ELECTRIC', 'AUTOMATIC', 5, 220, 2600,
 ARRAY['https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80'],
 'Go green with the Tata Nexon EV Max. With 437km range and fast charging, it''s the perfect electric SUV for eco-conscious drivers.',
 ARRAY['437km Range', 'Fast Charging', 'Connected Car Tech', 'Ventilated Seats', 'Sunroof', '6 Airbags'],
 true, 'Greater Noida, UP', 'UP16KL0123', NOW(), NOW())

ON CONFLICT (id) DO NOTHING;

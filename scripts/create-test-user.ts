import { prisma } from "../src/lib/prisma";

async function createTestUser() {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: "temp_user_id" },
    });

    if (existingUser) {
      console.log("Test user already exists");
      return;
    }

    const user = await prisma.user.create({
      data: {
        id: "temp_user_id",
        name: "Test User",
        email: "test@rydex.com",
        password: "hashed_password_placeholder",
        role: "CUSTOMER",
        verified: true,
      },
    });

    console.log("Test user created successfully:", user);
  } catch (error) {
    console.error("Error creating test user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();

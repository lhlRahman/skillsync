import { PrismaClient } from "@prisma/client";

export default async function createUser(user) {
  const prisma = new PrismaClient();
  user = user.user;
  try {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type ?? 1,
        clerkId: user.clerkId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log("User created:", newUser);

    return newUser;
  } catch (error) {
    console.log("Error occurred while creating user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

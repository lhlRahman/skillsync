import { PrismaClient } from "@prisma/client";

export default async function createUser(user) {
  const prisma = new PrismaClient();
  if (!user) {
    throw new Error("User data is required");
  }
  if (!user.email) {
    throw new Error("Email is required");
  }
  if (!user.firstName) {
    throw new Error("First name is required");
  }
  if (!user.lastName) {
    throw new Error("Last name is required");
  }
  if (!user.type) {
    throw new Error("User type is required");
  }
  if (user.type !== 1 && user.type !== 2) {
    throw new Error("Invalid user type");
  }
  if (user.type === 1 && !user.bio) {
    throw new Error("Bio is required");
  }
  try {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
        bio: user.bio,
        clerkId: user.clerkId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return newUser;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

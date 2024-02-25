import { PrismaClient } from "@prisma/client";

export default async function createUser(user) {
  const prisma = new PrismaClient();
    console.log(user)
  try {
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        type: user.type,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        hoursCompleted: user.hoursCompleted,
        postedJobs: user.postedJobs,
        appliedJobs: user.appliedJobs
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

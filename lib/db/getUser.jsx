import { PrismaClient } from "@prisma/client";

export default async function getUser(id) {
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    return newEvent;
  } catch (error) {
    console.log("Error occurred while creating event:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
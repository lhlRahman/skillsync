import { PrismaClient } from "@prisma/client";

export default async function getUserByID(id) {
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.log("Error occurred while fetching user", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

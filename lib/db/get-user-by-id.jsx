import { PrismaClient } from "@prisma/client";

export default async function getUserById(id) {
  const prisma = new PrismaClient();

  if (!id) throw new Error("Invalid user id");

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

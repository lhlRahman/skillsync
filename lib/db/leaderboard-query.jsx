import { PrismaClient } from "@prisma/client";

export default async function getUsers() {
  const prisma = new PrismaClient();

  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

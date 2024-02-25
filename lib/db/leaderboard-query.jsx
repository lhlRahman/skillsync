import { PrismaClient } from "@prisma/client";

export default async function getUsers() {
  const prisma = new PrismaClient();
  console.log("hit db")

  try {
    const users = await prisma.user.findMany();

    console.log("Users fetched:\n", users);
    return users;

  } catch (error) {
    console.log("Error occurred while fetching users", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

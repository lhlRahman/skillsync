import { PrismaClient } from "@prisma/client";

export default async function getUserById(id) {
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
    });

    console.log("Job fetched:\n", user);
    return user;

  } catch (error) {
    console.log("Error occurred while fetching jobs", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

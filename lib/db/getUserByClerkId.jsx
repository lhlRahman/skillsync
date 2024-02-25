
import { PrismaClient } from "@prisma/client";

export default async function GetUserByClerkId(clerkId) {
  const prisma = new PrismaClient();

  try {
    const job = await prisma.user.findUnique({
        where: {
            clerkId: clerkId,
        },
    });

    console.log("user fetched:\n", user);
    return user;

  } catch (error) {
    console.log("Error occurred while fetching jobs", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

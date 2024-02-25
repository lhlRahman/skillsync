import { PrismaClient } from "@prisma/client";

export default async function getJobById(id) {
  const prisma = new PrismaClient();

  try {
    const job = await prisma.job.findUnique({
        where: {
          id: id,
        },
    });

    return job;

  } catch (error) {
    console.log("Error occurred while fetching jobs", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

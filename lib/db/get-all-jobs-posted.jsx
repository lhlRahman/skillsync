
import { PrismaClient } from "@prisma/client";

export default async function getAllJobsPosted(id) {
  const prisma = new PrismaClient();

  try {
    const job = await prisma.job.findMany({
        where: {
          id: id,
        },
    });

    console.log("Job fetched:\n", job);
    return job;

  } catch (error) {
    console.log("Error occurred while fetching jobs", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

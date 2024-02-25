import { PrismaClient } from "@prisma/client";

export default async function getJobs(userId) {
  const prisma = new PrismaClient();

  try {
    const jobs = await prisma.job.findMany({
      where: {
        posterId: userId,
      }
    });
//rerank cohere
    console.log("Jobs fetched:\n", jobs);
    return jobs;

  } catch (error) {
    console.log("Error occurred while fetching jobs", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
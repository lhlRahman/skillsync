import { PrismaClient } from "@prisma/client";

export default async function getAllJobsAppliedTo(id) {
  const prisma = new PrismaClient();

  try {
    const job = await prisma.application.findMany({
        where: {
        applicantId: id,
        },
    });

    const alljobs = [];
    for (let i = 0; i < job.length; i++) {
        const jobData = await prisma.job.findFirst({
            where: {
                id: job[i].jobId,
            },
            });
        alljobs.push(jobData);
    }
    return alljobs;

  } catch (error) {
    console.log("Error occurred while fetching jobs", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
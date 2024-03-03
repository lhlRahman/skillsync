import { PrismaClient } from "@prisma/client";

export default async function getAllJobsAppliedTo(id) {
  const prisma = new PrismaClient();

  if (!id) {
    throw new Error("No id provided");
  }

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
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

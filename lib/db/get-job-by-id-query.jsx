import { PrismaClient } from "@prisma/client";

export default async function getJobById(id) {
  const prisma = new PrismaClient();

  if (!id) throw new Error("Invalid job id");

  try {
    let job = await prisma.job.findUnique({
      where: {
        id: id,
      },
    });

    let applications = await prisma.application.findMany({
      where: {
        jobId: id,
      },
    });
    for (let i = 0; i < applications.length; i++) {
      applications[i].user = await prisma.user.findUnique({
        where: {
          id: applications[i].applicantId,
        },
      });
    }

    job.applications = applications;

    return job;
  } catch (error) {
    console.log("Error occurred while fetching jobs", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

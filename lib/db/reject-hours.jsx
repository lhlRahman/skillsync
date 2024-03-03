import { PrismaClient } from "@prisma/client";

export default async function rejectHours(id) {
  const prisma = new PrismaClient();

  if (!id) throw new Error("Invalid application id");

  try {
    const application = await prisma.application.update({
      where: {
        id: id,
      },
      data: {
        status: "rejected",
      },
    });

    // remove application id from job's acceptedApplicants array and update job
    const job = await prisma.job.findUnique({
      where: {
        id: application.jobId,
      },
    });

    const updatedJob = await prisma.job.update({
      where: {
        id: application.jobId,
      },
      data: {
        acceptedApplicants: {
          set: job.acceptedApplicants.filter(
            (applicant) => applicant !== application.id
          ),
        },
      },
    });

    return application;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

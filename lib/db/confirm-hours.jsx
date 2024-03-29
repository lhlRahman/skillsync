import { PrismaClient } from "@prisma/client";

export default async function confirmHours(id) {
  const prisma = new PrismaClient();

  if (!id) throw new Error("Invalid application id");

  try {
    const application = await prisma.application.update({
      where: {
        id: id,
      },
      data: {
        status: "confirmed",
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

    // updade and add job's hours to the user's hours
    const user = await prisma.user.update({
      where: {
        id: application.applicantId,
      },
      data: {
        hoursCompleted: {
          increment: updatedJob.requiredHours,
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

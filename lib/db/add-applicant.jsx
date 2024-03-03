import { PrismaClient } from "@prisma/client";

export default async function AddApplicant(applicant, job) {
  const prisma = new PrismaClient();

  if (!applicant || !job) {
    throw new Error("Applicant or job not found");
  }

  if (!applicant.id || !job.id) {
    throw new Error("Applicant or job not found");
  }

  if (!applicant.email) {
    throw new Error("Applicant email not found");
  }

  if (!applicant.note) {
    throw new Error("Applicant note not found");
  }

  if (!job.location) {
    throw new Error("Job location not found");
  }

  try {
    // check application already exist in the database for the same job, error will be thrown
    const application = await prisma.application.findFirst({
      where: {
        jobId: job.id,
        applicantId: applicant.id,
      },
    });

    if (application) {
      throw new Error("Application already exists");
    }

    const users = await prisma.application.create({
      data: {
        jobId: job.id,
        applicantId: applicant.id,
        location: job.location,
        email: applicant.email,
        note: applicant.note,
        status: "applied",
      },
    });

    return users;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

import { PrismaClient } from "@prisma/client";

export default async function AddApplicant(applicant, jobid) {
  const prisma = new PrismaClient();

  if (!applicant || !jobid) {
    throw new Error("Applicant or job not found");
  }

  if (!applicant.id || !jobid) {
    throw new Error("Applicant or job not found");
  }

  if (!applicant.email) {
    throw new Error("Applicant email not found");
  }

  if (!applicant.note) {
    throw new Error("Applicant note not found");
  }

  try {
    // find job with given id
    const job = await prisma.job.findFirst({
      where: {
        id: jobid,
      },
    });

    if (!job) {
      throw new Error("Job not found");
    }

    if (!job.acceptedApplicants) {
      throw new Error("Job acceptedApplicants not found");
    }

    if (job.completed) {
      throw new Error("Job is already completed");
    }

    if (job.acceptedApplicants.length >= job.neededApplicants) {
      throw new Error("Job is already filled");
    }

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

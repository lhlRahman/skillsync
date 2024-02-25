import { PrismaClient } from "@prisma/client";

export default async function createJob(job, posterId) {
  const prisma = new PrismaClient();

  try {
    const newJob = await prisma.job.create({
      data: {
        title: job.title ?? "", 
        description: job.description ?? "",
        location: job.location ?? "",
        imageUrl: job.imageUrl ?? "",
        startDate: job.startDate ?? "",
        endDate: job.endDate ?? "",
        acceptedApplicants: job.acceptedApplicants ?? "", 
        neededApplicants: job.neededApplicants ?? "",
        requiredHours: job.requiredHours ?? "",
        posterId: posterId ?? "",
      },
    });

    console.log("Job created:", newJob);
    return newJob;
  } catch (error) {
    console.log("Error occurred while creating job:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

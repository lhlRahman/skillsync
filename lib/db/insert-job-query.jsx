import { PrismaClient } from "@prisma/client";

export default async function createJob(job, posterId) {
  const prisma = new PrismaClient();

  try {
    const newJob = await prisma.job.create({
      data: {
        title: job.title ?? "",
        description: job.description ?? "",
        location: job.location ?? "",
        imageUrl:
          job.imageUrl ??
          "https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png",
        startDate: job.startDate ?? "",
        endDate: job.endDate ?? "",
        acceptedApplicants: job.acceptedApplicants ?? [],
        neededApplicants: parseInt(job.neededApplicants) ?? "",
        requiredHours: parseInt(job.requiredHours) ?? "",
        posterId: parseInt(posterId) ?? 0,
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

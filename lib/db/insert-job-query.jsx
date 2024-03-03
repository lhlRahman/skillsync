import { PrismaClient } from "@prisma/client";

export default async function createJob(job, posterId) {
  const prisma = new PrismaClient();

  if (!job || !posterId) {
    throw new Error("Job or poster not found");
  }

  if (!job.title) {
    throw new Error("Job title not found");
  }

  if (!job.description) {
    throw new Error("Job description not found");
  }

  if (!job.location) {
    throw new Error("Job location not found");
  }

  if (!job.startDate) {
    throw new Error("Job startDate not found");
  }

  if (!job.endDate) {
    throw new Error("Job endDate not found");
  }

  if (!job.neededApplicants) {
    throw new Error("Job needed applicants not found");
  }

  if (!job.requiredHours) {
    throw new Error("Job required hours not found");
  }

  try {
    const newJob = await prisma.job.create({
      data: {
        title: job.title,
        description: job.description,
        location: job.location,
        imageUrl:
          job.imageUrl ??
          "https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png",
        startDate: job.startDate,
        endDate: job.endDate,
        acceptedApplicants: [],
        neededApplicants: parseInt(job.neededApplicants),
        requiredHours: parseInt(job.requiredHours),
        posterId: parseInt(posterId),
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

import { PrismaClient } from "@prisma/client";

export default async function completeJob(id) {
  const prisma = new PrismaClient();

  if (!id) {
    throw new Error("Job not found");
  }

  try {
    const updatedJob = await prisma.job.update({
      where: {
        id: id,
      },
      data: {
        completed: true,
      },
    });

    return updatedJob;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

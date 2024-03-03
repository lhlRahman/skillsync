import { PrismaClient } from "@prisma/client";

export default async function getAllJobsPosted(id) {
  const prisma = new PrismaClient();
  if (!id) {
    return [];
  }

  try {
    const job = await prisma.job.findMany({
      where: {
        posterId: id,
      },
    });

    return job;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

import { PrismaClient } from "@prisma/client";

export default async function getJobs() {
  const prisma = new PrismaClient();

  try {
    const jobs = await prisma.job.findMany();
    return jobs;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

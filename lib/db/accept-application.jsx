import { PrismaClient } from "@prisma/client";

export default async function acceptedApplication(id) {
  const prisma = new PrismaClient();

  if (!id) throw new Error("Invalid application id");

  try {
    const users = await prisma.application.update({
      where: {
        id: id,
      },
      data: {
        status: "accepted",
      },
    });
    const updatedApplication = await prisma.job.update({
      where: {
        id: users.jobId,
      },
      data: {
        acceptedApplicants: {
          push: users.id,
        },
      },
    });

    return users;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

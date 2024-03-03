import { PrismaClient } from "@prisma/client";

export default async function confirmHours(id) {
  const prisma = new PrismaClient();

  try {
    const users = await prisma.application.update({
      where: {
        id: id,
      },
      data: {
        status: "confirmed",
      },
    });

    const updatedApplication = await prisma.job.update({
      where: {
        id: users.id,
      },
      data: {
        acceptedApplicants: {
          disconnect: {
            id: users.id,
          },
        },
      },
    });

    console.log("Users fetched:\n", users);
    console.log("Updated Application:\n", updatedApplication);
    return users;
  } catch (error) {
    console.log("Error occurred while fetching users", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

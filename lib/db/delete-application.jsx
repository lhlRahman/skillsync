import { PrismaClient } from "@prisma/client";

export default async function deleteApplication(id) {
  const prisma = new PrismaClient();

  if (!id) throw new Error("Invalid application id");

  try {
    const deletedApplication = await prisma.application.delete({
      where: {
        id: id,
      },
    });

    console.log("Application deleted:", deletedApplication);
    return deletedApplication;
  } catch (error) {
    console.log("Error occurred while creating event:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

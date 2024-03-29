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

    return deletedApplication;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

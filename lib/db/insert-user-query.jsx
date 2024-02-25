import { PrismaClient } from "@prisma/client";

export default async function createUser(user) {
  const prisma = new PrismaClient();
  console.log(user);
  //this is where null occurs
  try {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        firstName: user.firstname,
        lastName: user.lastname,
        type: user.type ?? 1,
        clerkId: user.clerkId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log("User created:", newUser);

    return newUser;
  } catch (error) {
    console.log("Error occurred while creating user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

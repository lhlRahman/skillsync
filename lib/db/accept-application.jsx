import { PrismaClient } from "@prisma/client";

export default async function acceptedApplication(id) {
  const prisma = new PrismaClient();
  console.log("hit db")

  /*
  model Application {
  id        Int      @id @default(autoincrement())
  jobId     Int
  applicantId Int
  location  String
  email     String
  note      String
  job       Job      @relation(fields: [jobId], references: [id], onDelete: Cascade)
  applicant User     @relation(name: "Applicant", fields: [applicantId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  status    String   @db.VarChar(255) // e.g., "applied", "accepted", "rejected"
}
  */

  try {
    const users = await prisma.application.update({
        where: {
            id: id,
        },
        data: {
            status: "accepted",
        },
    })

    const updatedApplication = await prisma.job.update({
        where: {
            id: users.id,
        },
        data: {
            acceptedApplicants: {
                connect: {
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

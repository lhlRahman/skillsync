import { PrismaClient } from "@prisma/client";

export default async function AddApplicant(applicant, job) {
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
    const users = await prisma.application.create(
        {
            data: {
                jobId: job.id,
                applicantId: applicant.id,
                location: job.location,
                email: applicant.email,
                note: applicant.note,
                status: "applied",
              }
        }
    );

    console.log("Users fetched:\n", users);
    return users;

  } catch (error) {
    console.log("Error occurred while fetching users", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

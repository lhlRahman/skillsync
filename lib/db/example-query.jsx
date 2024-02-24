import { PrismaClient } from '@prisma/client';

export default async function createEvent(day, event) {
  const prisma = new PrismaClient();

  try {
    const newEvent = await prisma.event.create({
      data: {
        dayId: day.id,
        timeStart: event.timeStart ?? "",
        location: event.location ?? "",
        timeEnd: event.timeEnd ?? "",
        notes: event.notes ?? "",
        description: event.description ?? ""
      }
    })
    
    console.log("Event created:", newEvent);
    return newEvent;
  } catch (error) {
    console.log("Error occurred while creating event:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
import { NextResponse } from "next/server";
import completeJob from "@/lib/db/complete-job";

// POST /api/days/new
export async function POST(req) {
  if (req.method === "POST") {
    const { id } = await req.json();
    try {
      const updatedJob = await completeJob(id);

      return NextResponse.json({ status: 201, data: updatedJob });
    } catch (error) {
      return NextResponse.json({ status: 500, message: error.message });
    }
  } else {
    return NextResponse.json(
      { status: 405 },
      { message: "Method not allowed" }
    );
  }
}

import { NextResponse } from "next/server";
import rejectHours from "@/lib/db/reject-hours";

// POST /api/days/new
export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { id } = await req.json();
      const deleted = await rejectHours(id);

      return NextResponse.json({ status: 201, data: deleted });
    } catch (error) {
      return NextResponse.json({
        status: 500,
        message: error.message,
      });
    }
  } else {
    return NextResponse.json({ status: 405, message: "Method not allowed" });
  }
}

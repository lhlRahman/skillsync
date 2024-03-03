import { NextResponse } from "next/server";
import deleteApplication from "@/lib/db/delete-application";

// POST /api/days/new
// Required fields in body: { Day object } - I think?
export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { id } = await req.json();
      const deleted = await deleteApplication(id);

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

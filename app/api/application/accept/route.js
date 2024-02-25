import { NextResponse } from "next/server";
import acceptedApplication from "@/lib/db/accept-application";

// POST /api/days/new
// Required fields in body: { Day object } - I think?
export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { id } = await req.json();
      const accepted = await acceptedApplication(id);

      return NextResponse.json({ status: 201, data: accepted });
    } catch (error) {
      return NextResponse.json(
        { status: 500 },
        { message: `${error}: Internal server error` }
      );
    }
  } else {
    return NextResponse.json(
      { status: 405 },
      { message: "Method not allowed" }
    );
  }
}

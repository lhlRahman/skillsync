import { NextResponse } from "next/server";
import getAllJobsPosted from "@/lib/db/get-all-jobs-posted";
export const dynamic = 'force-dynamic';

// POST /api/days/new
export async function POST(req) {
  if (req.method === "POST") {
    const { id } = await req.json();
    try {
      const alljobs = await getAllJobsPosted(id);

      return NextResponse.json({ status: 201, data: alljobs });
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

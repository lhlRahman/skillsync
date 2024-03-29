// eampel

import createJob from "@/lib/db/insert-job-query";
import { NextResponse } from "next/server";

// POST /api/days/new
// Required fields in body: { Day object } - I think?
export async function POST(req) {
  if (req.method === "POST") {
    const { job, posterId } = await req.json();

    try {
      const newJob = await createJob(job, posterId);

      return NextResponse.json({ status: 201, data: newJob });
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

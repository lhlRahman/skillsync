import { NextResponse } from 'next/server';
import getJobs from '@/lib/db/get-jobs-query';

// POST /api/days/new
// Required fields in body: { Day object } - I think?
export async function POST(req) {
  if (req.method === "POST") {
    try {

      const { posterId } = req.json()

      console.log("hit api")
     // create them off the start date
      const jobs = await getJobs(posterId);

      return NextResponse.json({ status: 201, data: jobs });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}
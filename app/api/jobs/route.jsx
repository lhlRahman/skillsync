import { NextResponse } from 'next/server';
import getJobs from '@/lib/db/get-jobs-query';


export async function GET(req) {
  if (req.method === "GET") {
    try {

      console.log("hit api")

      const jobs = await getJobs();

      
      return NextResponse.json({ status: 201, data: jobs });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}
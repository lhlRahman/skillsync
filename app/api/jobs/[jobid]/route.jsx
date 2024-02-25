import { NextResponse } from 'next/server';
import getJobById from '@/lib/db/get-job-by-id-query';

export async function GET(req) {
    const jobId = req.nextUrl.pathname.split("/api/jobs/")[1];
    if (req.method === "GET") {
        try {
            const jobs = await getJobById(parseInt(jobId)); // query db with id`

            return NextResponse.json({ status: 201, data: jobs });
        } catch (error) {
            return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error` });
        }
    } else {
        return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
    }
}


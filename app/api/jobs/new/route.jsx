// eampel

import createJob from '@/lib/db/insert-job-query';
import { NextResponse } from 'next/server';

// POST /api/days/new
// Required fields in body: { Day object } - I think?
export async function POST(req) {
    if (req.method === "POST") {
        console.log(req)
        const { job } = await req.json();
        console.log(job)
        try {
            const newJob = await createJob(job);

            return NextResponse.json({ status: 201, data: newJob });
        } catch (error) {
            return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error` });
        }
    } else {
        return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
    }
}
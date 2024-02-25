import { NextResponse } from 'next/server';
import AddApplicant from '@/lib/db/add-applicant';
// POST /api/days/new
// Required fields in body: { Day object } - I think?
export async function POST(req) {
    if (req.method === "POST") {
        const {applicant, job } = await req.json();
        try {
            const newJob = await AddApplicant(applicant, job);


            return NextResponse.json({ status: 201, data: newJob });
        } catch (error) {
            return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error` });
        }
    } else {
        return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
    }
}
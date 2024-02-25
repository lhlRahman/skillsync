import { NextResponse } from 'next/server';
import confirmHours from '@/lib/db/confirm-hours';

// POST /api/days/new
// Required fields in body: { Day object } - I think?
export async function POST(req) {
  if (req.method === "POST") {
    try {
        const {id} = await req.json();
        const confirmed = await confirmHours(id);

      return NextResponse.json({ status: 201, data: confirmed });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}
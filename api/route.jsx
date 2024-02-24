// eampel

import createAllDays from '@/lib/createAllDays';
import { NextResponse } from 'next/server';

// POST /api/days/new
// Required fields in body: { Day object } - I think?
export async function POST(req) {
  if (req.method === "POST") {
    const {trip} = await req.json();
    try {
     // create them off the start date
      const newDays = await createAllDays(trip);

      return NextResponse.json({ status: 201, data: newDays });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}
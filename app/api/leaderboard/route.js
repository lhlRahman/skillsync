import { NextResponse } from "next/server";
import getUsers from "@/lib/db/leaderboard-query";

// POST /api/days/new
export async function GET(req) {
  if (req.method === "GET") {
    try {
      const top10 = await getUsers();

      return NextResponse.json({ status: 201, data: top10 });
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

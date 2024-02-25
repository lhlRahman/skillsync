import { NextResponse } from "next/server";
import getUserByID from "@/lib/db/get-profile-query";

export async function GET(req) {
  if (req.method === "GET") {
    try {
      const user = await getUserByID(req.query.id);
      return NextResponse.json({ status: 201, data: user });
    } catch (error) {
      return NextResponse.json(
        { status: 500 },
        { message: `${error}: Internal server error` }
      );
    }
  }
}

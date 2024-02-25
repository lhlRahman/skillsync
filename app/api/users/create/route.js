import { NextResponse } from "next/server";
import createUser from "@/lib/db/insert-user-query";

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const user = req.json();
      const createduser = createUser(123);

      return NextResponse.json({ status: 201, data: createduser });
    } catch (error) {
      return NextResponse.json(
        { status: 500 },
        { message: `${error}: Internal server error` }
      );
    }
  }
}

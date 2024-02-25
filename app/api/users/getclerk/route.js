import { NextResponse } from "next/server";
import GetUserByClerkId from "@/lib/db/getUserByClerkId";
import { auth } from "@clerk/nextjs";

export async function GET(req) {
  if (req.method === "GET") {
    try {
    const { userId } = auth();
    console.log("userId:\n", userId);
      const user = await GetUserByClerkId(userId);
      console.log("user fetched:\n", user);
      return NextResponse.json({ status: 201, data: user });
    } catch (error) {
      return NextResponse.json(
        { status: 500 },
        { message: `${error}: Internal server error` }
      );
    }
  }
}

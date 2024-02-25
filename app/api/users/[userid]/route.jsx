import { NextResponse } from 'next/server';
import getUserById from '@/lib/db/get-user-by-id';

export async function GET(req) {
    const userId = req.nextUrl.pathname.split("/api/users/")[1];
    if (req.method === "GET") {
        try {
            console.log("hit api")
            const user = await getUserById(parseInt(userId)); // query db with id`
            console.log("odkf;lkd;kd;flkg;lfk");
            return NextResponse.json({ status: 201, data: user });
        } catch (error) {
            return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error` });
        }
    } else {
        return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
    }
}


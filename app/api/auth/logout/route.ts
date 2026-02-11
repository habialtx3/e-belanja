import { destroySession } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await destroySession()
        return NextResponse.redirect(
            new URL('/sign-in',"http://localhost:3000")
        )
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 401 })
    }
}
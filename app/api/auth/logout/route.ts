import { destroySession } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await destroySession()
        return NextResponse.json({ message: "Logout success" })
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 401 })
    }
}
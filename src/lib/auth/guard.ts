import { NextResponse } from "next/server"
import { getSession } from "./session"

export async function authGuard() {
    const session = await getSession()

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    return session.user
}

export async function requireAdmin() {
    const user = await authGuard()

    if (user instanceof NextResponse) return user

    if (user.role !== "superadmin") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    return user
}
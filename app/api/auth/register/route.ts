import { register } from "@/lib/auth/register"
import { NextResponse } from "next/server"

export async function POST(req : Request) {
    try {
        const body = await req.json()
        const user = await register(body)

        return NextResponse.json({ message: "Account created successfully", user },{ status: 201 })
    } catch (error : any) {
        return NextResponse.json({ message: error.message || "Register Failed"},{ status: 400 })
    }
}
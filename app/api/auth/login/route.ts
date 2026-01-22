import { login } from "@/lib/auth/login"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
    try {
        const body = await req.json()
        const user = await login(body.email,body.password)
        return NextResponse.json({message : "Login success", user})

    } catch (error : any) {
        return NextResponse.json({message : error.message || "Invalid Credentials"},{status:401})
    }
}
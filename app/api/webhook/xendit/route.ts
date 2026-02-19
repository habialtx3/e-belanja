import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log(body);

        const externalId = body.external_id
        const status = body.status

        if (!externalId) {
            return NextResponse.json(
                { error: "No external_id provided" },
                { status: 400 }
            )
        }

        const order = await prisma.order.findUnique({
            where: { code: externalId },
        })

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            )
        }

        if (status === "PAID") {
            await prisma.order.update({
                where: { code: externalId },
                data: { status: "success" },
            })
        }

        if (status === "EXPIRED") {
            await prisma.order.update({
                where: { code: externalId },
                data: { status: "failed" },
            })
        }

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error("WEBHOOK ERROR:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

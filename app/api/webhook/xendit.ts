import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const { externalId, status } = body

    if (status === 'PAID') {
        await prisma.order.update({
            where: { code: externalId },
            data: { status: "success" }
        })
    }

    if (status === 'EXPIRED') {
        await prisma.order.update({
            where: { code: externalId },
            data: { status: 'failed' }
        })
    }
}
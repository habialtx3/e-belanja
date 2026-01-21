import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const products = await prisma.product.findMany(
        {
            include: {
                brand: true,
                category: true,
                location: true,
            }
        }
    )

    if (products.length === 0) return NextResponse.json({ message: "No Product Yet" }, { status: 400 })
}
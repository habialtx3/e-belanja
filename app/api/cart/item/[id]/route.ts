import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getSession()

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const itemId = Number(params.id)
        const { quantity } = await req.json()


        if (quantity <= 0) {
            return NextResponse.json(
                { message: "Quantity must be greater than 0" },
                { status: 400 }
            )
        }

        const item = await prisma.orderProduct.findUnique({
            where: { id: itemId },
            include: {
                order: true,
                product: true
            }
        })

        if (!item || item.order.user_id !== session.user.id) {
            return NextResponse.json({ message: "Item not found" }, { status: 404 })
        }

        await prisma.orderProduct.update({
            where: { id: itemId },
            data: {
                quantity,
                subtotal: BigInt(quantity) * item.product.price
            }
        })

        return NextResponse.json({ message: "Cart Update" })

    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 })

    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getSession()

    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const itemId = Number(params.id)

    const item = await prisma.orderProduct.findUnique({
        where: { id: itemId },
        include: {
            order: true,
            product: true
        }
    })

    if (!item || item.order.user_id !== session.user.id) {
        return NextResponse.json({ message: "Item not found" }, { status: 404 })
    }

    await prisma.orderProduct.delete({
        where: { id: itemId }
    })
}
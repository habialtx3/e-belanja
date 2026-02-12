import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getSession()

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const cart = await prisma.order.findFirst({
            where: {
                user_id: session.user.id,
                status: 'pending'
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })

        return NextResponse.json(cart)
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getSession()

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { productId } = await req.json()

        const product = await prisma.product.findUnique({
            where: { id: productId }
        })

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 })
        }

        let cart = await prisma.order.findFirst({
            where: {
                user_id: session.user.id,
                status: 'pending'
            }
        })

        if (!cart) {
            cart = await prisma.order.create({
                data: {
                    code: crypto.randomUUID(),
                    user_id: session.user.id,
                    total: BigInt(0),
                    status: 'pending'
                }
            })
        }

        const existingItem = await prisma.orderProduct.findFirst({
            where: {
                order_id: cart.id,
                product_id: productId
            }
        })

        if (existingItem) {
            await prisma.orderProduct.update({
                where: { id: existingItem.id },
                data: {
                    quantity: existingItem.quantity + 1,
                    subtotal: BigInt(existingItem.quantity + 1) * product.price
                }
            })
        } else {
            await prisma.orderProduct.create({
                data: {
                    order_id: cart.id,
                    product_id: productId,
                    quantity: 1,
                    subtotal: product.price
                }
            })
        }

        return NextResponse.json({ message: "Added to cart" })
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
}


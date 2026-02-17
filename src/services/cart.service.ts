'use server'
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function getCart(userId: number) {
    if (!userId) {
        redirect('/sign-in')
    }

    return await prisma.order.findMany({
        where: {
            user_id: userId,
            status: 'pending'
        },
        include: {
            products: {
                include: {
                    product: {
                        include: {
                            brand: true,
                            category: true
                        }
                    }
                }
            }
        }
    })
}

export async function addToCart(itemId: number, userId: number) {
    if (!userId) {
        redirect('/sign-in')
    }

    const product = await prisma.product.findUnique({
        where: { id: itemId }
    })

    if (!product) {
        throw new Error("Product not found")
    }

    let cart = await prisma.order.findFirst({
        where: {
            user_id: userId,
            status: 'pending'
        }
    })

    if (!cart) {
        cart = await prisma.order.create({
            data: {
                code: crypto.randomUUID(),
                user_id: userId,
                total: BigInt(0),
                status: 'pending'
            }
        })
    }

    const existItem = await prisma.orderProduct.findFirst({
        where: {
            order_id: cart.id,
            product_id: product.id,
        }
    })

    if (existItem) {
        await prisma.orderProduct.update({
            where: { id: existItem.id },
            data: {
                quantity: {increment : 1},
                subtotal: {increment : product.price}
            }
        })
    } else {
        await prisma.orderProduct.create({
            data: {
                product_id: product.id,
                order_id: cart.id,
                quantity: 1,
                subtotal: product.price
            }
        })
    }

    await prisma.order.update({
        where: { id: cart.id },
        data : {
            total : {
                increment : product.price
            }
        }
    })
}

export async function deleteCart(itemId: number) {
    try {
        await prisma.orderProduct.delete({
            where: { id: itemId }
        })
    } catch (error) {
        console.error(error)
        alert('Failed deleting item')
    }



}
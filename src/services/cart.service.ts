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

export async function deleteCart(itemId: number) {

    try {
        await prisma.orderProduct.delete({
            where: { id: itemId}
        })
    } catch (error) {
        console.error(error)
        alert('Failed deleting item')
    }

    

}